import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, type LeadData } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { message: 'Database service is not configured. Lead submission is currently unavailable.' },
        { status: 503 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Extract UTM parameters from headers or body
    const utm_source = body.utm_source || request.nextUrl.searchParams.get('utm_source')
    const utm_campaign = body.utm_campaign || request.nextUrl.searchParams.get('utm_campaign')
    const utm_medium = body.utm_medium || request.nextUrl.searchParams.get('utm_medium')

    // Prepare lead data
    const leadData: Partial<LeadData> = {
      email: body.email,
      name: body.name,
      phone: body.phone,
      company: body.company,
      industry: body.industry,
      business_size: body.business_size,
      current_crm: body.current_crm,
      monthly_leads: body.monthly_leads ? parseInt(body.monthly_leads) : undefined,
      voice_minutes_needed: body.voice_minutes_needed ? parseInt(body.voice_minutes_needed) : undefined,
      whatsapp_messages_needed: body.whatsapp_messages_needed ? parseInt(body.whatsapp_messages_needed) : undefined,
      source_page: body.source_page,
      form_type: body.form_type,
      interest_level: body.interest_level || 'medium',
      utm_source,
      utm_campaign,
      utm_medium,
      notes: body.notes
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('conversailabs_queries')
      .insert([leadData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save lead data' },
        { status: 500 }
      )
    }

    // Send success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Lead captured successfully',
        leadId: data[0]?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}