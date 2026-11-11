import { NextRequest, NextResponse } from 'next/server';
import {
  getMarketingConfig,
  updateMarketingConfig,
  addHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '@/lib/data/marketingService';

export async function GET() {
  try {
    const config = await getMarketingConfig();
    return NextResponse.json({ success: true, config });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, slideId, slideData, ...updates } = body;

    if (action === 'update_slide' && slideId) {
      const updatedSlide = await updateHeroSlide(slideId, slideData);
      return NextResponse.json({ success: true, slide: updatedSlide });
    }

    if (action === 'add_slide' && slideData) {
      const newSlide = await addHeroSlide(slideData);
      return NextResponse.json({ success: true, slide: newSlide });
    }

    if (action === 'delete_slide' && slideId) {
      const deleted = await deleteHeroSlide(slideId);
      return NextResponse.json({ success: deleted });
    }

    const updatedConfig = await updateMarketingConfig(updates);
    return NextResponse.json({ success: true, config: updatedConfig });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to update settings' },
      { status: 500 }
    );
  }
}

