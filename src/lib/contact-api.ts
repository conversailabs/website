/**
 * Contact Form API Client
 *
 * Handles communication with FastAPI backend for contact form submissions.
 * Provides secure, type-safe contact form submission functionality.
 */

export interface ContactFormData {
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

export interface ContactSubmissionResponse {
  success: boolean;
  contact_id: number;
  message: string;
}

export interface ContactSubmissionError {
  success: false;
  error: string;
  details?: string;
}

/**
 * Submit contact form to FastAPI backend
 *
 * @param data Contact form data
 * @returns Promise with submission response
 * @throws Error if submission fails
 */
export async function submitContact(
  data: ContactFormData
): Promise<ContactSubmissionResponse> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_CONTACT_API_KEY;

  if (!backendUrl) {
    throw new Error('Backend API URL not configured. Please set NEXT_PUBLIC_BACKEND_API_URL environment variable.');
  }

  if (!apiKey) {
    throw new Error('Contact API key not configured. Please set NEXT_PUBLIC_CONTACT_API_KEY environment variable.');
  }

  try {
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
      const errorData: ContactSubmissionError = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result: ContactSubmissionResponse = await response.json();
    return result;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Contact form submission error:', error.message);
      throw error;
    }
    throw new Error('An unexpected error occurred while submitting the contact form');
  }
}
