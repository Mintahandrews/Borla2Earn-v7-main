import { prisma } from "@/lib/db";
import { hash } from 'bcryptjs';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, location } = await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        location,
        emailVerified: new Date(),
      },
    });

    // Don't send password hash back
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'User registered successfully',
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
