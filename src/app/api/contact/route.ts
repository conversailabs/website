import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  companySize?: string;
  message: string;
  source?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
}

export async function POST(req: NextRequest) {
  try {
    const data: ContactFormData = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
    }

    // Get backend API credentials from environment (server-side only)
    const backendUrl = process.env.BACKEND_API_URL;
    const apiKey = process.env.CONTACT_API_KEY;

    if (!backendUrl || !apiKey) {
      console.error('Backend API not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Forward request to backend API
    const response = await fetch(`${backendUrl}/api/v1/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        company_size: data.companySize,
        message: data.message,
        source_page: data.source || 'contact_page',
        form_type: 'contact_form',
        interest_level: 'medium',
        utm_source: data.utm_source,
        utm_campaign: data.utm_campaign,
        utm_medium: data.utm_medium,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us. We will get back to you within 24 hours.',
        contactId: result.contact_id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
