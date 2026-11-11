import { NextRequest, NextResponse } from 'next/server';
import { addAuthor, addCategory, addPublisher } from '@/lib/data/storeService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    if (type === 'author') {
      const author = await addAuthor(data);
      return NextResponse.json({ success: true, item: author });
    }

    if (type === 'publisher') {
      const publisher = await addPublisher(data);
      return NextResponse.json({ success: true, item: publisher });
    }

    // Default: category
    const category = await addCategory(data);
    return NextResponse.json({ success: true, item: category });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Creation failed' },
      { status: 500 }
    );
  }
}

