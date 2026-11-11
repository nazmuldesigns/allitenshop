import { NextRequest, NextResponse } from 'next/server';
import { getBooks } from '@/lib/data/storeService';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';

    if (!q.trim()) {
      return NextResponse.json({ books: [] });
    }

    const { books } = await getBooks({ search: q, limit: 6 });
    return NextResponse.json({ books });
  } catch (error: unknown) {
    return NextResponse.json(
      { books: [], error: error instanceof Error ? error.message : 'Search error' },
      { status: 500 }
    );
  }
}

