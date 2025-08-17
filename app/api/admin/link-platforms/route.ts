import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const platforms = await prisma.linkPlatform.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: platforms }, { status: 200 });
  } catch (error) {
    console.error('API Error fetching link platforms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch link platforms' },
      { status: 500 }
    );
  }
}