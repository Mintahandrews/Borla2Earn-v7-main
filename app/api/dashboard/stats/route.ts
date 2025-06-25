import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        submissions: {
          orderBy: { createdAt: 'desc' },
          take: 5, // Get only the 5 most recent submissions
        },
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Calculate total waste recycled (in kg)
    const totalWasteRecycled = user.submissions
      .filter(sub => sub.status === 'VERIFIED')
      .reduce((sum, sub) => sum + sub.quantity, 0);

    // Calculate total tokens (assuming 1 token per kg for now)
    const totalTokens = Math.floor(totalWasteRecycled * 10); // Example: 10 tokens per kg

    // Get user rank (simplified - would need a more complex query for real ranking)
    const allUsers = await prisma.user.findMany({
      select: { id: true, submissions: true },
    });

    const usersWithScores = allUsers.map(u => ({
      id: u.id,
      score: u.submissions
        .filter(sub => sub.status === 'VERIFIED')
        .reduce((sum, sub) => sum + sub.quantity, 0),
    }));

    // Sort by score descending
    usersWithScores.sort((a, b) => b.score - a.score);
    
    const userRank = usersWithScores.findIndex(u => u.id === user.id) + 1;

    // Get recent submissions
    const recentSubmissions = user.submissions.map(sub => ({
      id: sub.id,
      date: sub.createdAt.toISOString(),
      wasteType: sub.wasteType,
      quantity: sub.quantity,
      unit: 'kg',
      status: sub.status,
      tokensAwarded: Math.floor(sub.quantity * 10), // 10 tokens per kg
      location: sub.location || 'N/A',
    }));

    return NextResponse.json({
      totalTokens,
      totalWasteRecycled,
      monthlyGoal: 100, // Default monthly goal in kg
      currentRank: userRank || 0,
      submissions: recentSubmissions,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
