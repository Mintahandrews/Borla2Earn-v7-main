import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        tokens: true,
        walletAddress: true,
        createdAt: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, image, walletAddress } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        ...(name && { name }),
        ...(image && { image }),
        ...(walletAddress !== undefined && { walletAddress }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        tokens: true,
        walletAddress: true,
        createdAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
