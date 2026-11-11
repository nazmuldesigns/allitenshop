import { NextRequest, NextResponse } from 'next/server';
import { addBook, deleteBook, updateBook } from '@/lib/data/storeService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const created = await addBook(body);
    return NextResponse.json({ success: true, book: created });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Create book failed' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, message: 'Book ID required' }, { status: 400 });
    }
    const updated = await updateBook(id, updates);
    return NextResponse.json({ success: true, book: updated });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Update book failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, message: 'Book ID required' }, { status: 400 });
    }
    const ok = await deleteBook(id);
    return NextResponse.json({ success: ok });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 }
    );
  }
}

