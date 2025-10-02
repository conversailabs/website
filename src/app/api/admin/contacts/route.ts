import { NextRequest, NextResponse } from 'next/server';
import { getAllContacts, getContactsCount, exportContactsToCSV, getAnalytics } from '@/lib/db';

// Simple authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

function checkAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return false;
  }
  return true;
}

export async function GET(req: NextRequest) {
  // Check authentication
  if (!checkAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    const analytics = searchParams.get('analytics') === 'true';

    // Return analytics
    if (analytics) {
      const data = await getAnalytics();
      return NextResponse.json({
        success: true,
        analytics: data
      });
    }

    // Export as CSV
    if (format === 'csv') {
      const csv = await exportContactsToCSV();
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="contacts.csv"'
        }
      });
    }

    // Return JSON with pagination
    const contacts = await getAllContacts(limit, offset);
    const total = await getContactsCount();

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error in admin contacts API:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch contacts',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
