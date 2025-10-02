import { NextRequest, NextResponse } from 'next/server';
import { insertContact } from '@/lib/db';

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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Insert into PostgreSQL database
    const contactId = await insertContact({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      company_size: data.companySize as 'small' | 'medium' | 'large' | undefined,
      message: data.message,
      source_page: data.source || 'contact_page',
      form_type: 'contact_form',
      interest_level: 'medium',
      utm_source: data.utm_source,
      utm_campaign: data.utm_campaign,
      utm_medium: data.utm_medium
    });

    console.log('✅ Contact saved to PostgreSQL with ID:', contactId);

    // TODO: Send email notifications here (optional)
    // await sendEmailNotification(data);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us. We will get back to you within 24 hours.',
        contactId
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