import { NextRequest, NextResponse } from 'next/server';
import { importBooksFromCsv } from '@/lib/data/storeService';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let rows: Record<string, string>[] = [];

    if (contentType.includes('application/json')) {
      const body = await req.json();
      if (Array.isArray(body.rows)) {
        rows = body.rows;
      } else if (typeof body.csv === 'string') {
        rows = parseSimpleCsv(body.csv);
      }
    } else {
      const text = await req.text();
      rows = parseSimpleCsv(text);
    }

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'No valid rows found in CSV' }, { status: 400 });
    }

    const result = await importBooksFromCsv(rows);
    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Import failed' },
      { status: 500 }
    );
  }
}

function parseSimpleCsv(text: string): Record<string, string>[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim().toLowerCase());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    // Basic comma splitter respecting quotes
    const values = lines[i].split(',').map((v) => v.replace(/^"|"$/g, '').trim());
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    rows.push(obj);
  }

  return rows;
}

