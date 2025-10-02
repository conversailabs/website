import { Pool, QueryResult } from 'pg';

// Create PostgreSQL connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL not found in environment variables. Please add it to .env.local'
      );
    }

    pool = new Pool({
      connectionString,
      max: 20, // Maximum connections in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    console.log('🐘 PostgreSQL connection pool created');
  }

  return pool;
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool();
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Types for form data
export interface ContactSubmission {
  id?: number;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  company_size?: 'small' | 'medium' | 'large';
  message?: string;
  industry?: string;
  source_page: string;
  form_type: 'contact_modal' | 'contact_form' | 'demo_request' | 'pricing_inquiry';
  interest_level?: 'high' | 'medium' | 'low';
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  notes?: string;
  status?: 'new' | 'contacted' | 'converted' | 'closed';
  created_at?: Date;
  updated_at?: Date;
}

// Insert new contact submission
export async function insertContact(
  data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>
): Promise<number> {
  const pool = getPool();

  const query = `
    INSERT INTO contact_submissions (
      name, email, phone, company, company_size, message, industry,
      source_page, form_type, interest_level,
      utm_source, utm_campaign, utm_medium, notes, status
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10,
      $11, $12, $13, $14, $15
    )
    RETURNING id
  `;

  const values = [
    data.name || null,
    data.email,
    data.phone || null,
    data.company || null,
    data.company_size || null,
    data.message || null,
    data.industry || null,
    data.source_page,
    data.form_type,
    data.interest_level || 'medium',
    data.utm_source || null,
    data.utm_campaign || null,
    data.utm_medium || null,
    data.notes || null,
    data.status || 'new'
  ];

  try {
    const result: QueryResult = await pool.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error inserting contact:', error);
    throw error;
  }
}

// Get all contacts with pagination
export async function getAllContacts(
  limit: number = 100,
  offset: number = 0
): Promise<ContactSubmission[]> {
  const pool = getPool();

  const query = `
    SELECT * FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  try {
    const result: QueryResult = await pool.query(query, [limit, offset]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}

// Get contact by ID
export async function getContactById(id: number): Promise<ContactSubmission | null> {
  const pool = getPool();

  const query = 'SELECT * FROM contact_submissions WHERE id = $1';

  try {
    const result: QueryResult = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
}

// Update contact status
export async function updateContactStatus(
  id: number,
  status: ContactSubmission['status']
): Promise<boolean> {
  const pool = getPool();

  const query = `
    UPDATE contact_submissions
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `;

  try {
    const result: QueryResult = await pool.query(query, [status, id]);
    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
}

// Get total count of contacts
export async function getContactsCount(): Promise<number> {
  const pool = getPool();

  const query = 'SELECT COUNT(*) as count FROM contact_submissions';

  try {
    const result: QueryResult = await pool.query(query);
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Error counting contacts:', error);
    throw error;
  }
}

// Search contacts by email
export async function searchContactsByEmail(email: string): Promise<ContactSubmission[]> {
  const pool = getPool();

  const query = `
    SELECT * FROM contact_submissions
    WHERE email ILIKE $1
    ORDER BY created_at DESC
  `;

  try {
    const result: QueryResult = await pool.query(query, [`%${email}%`]);
    return result.rows;
  } catch (error) {
    console.error('Error searching contacts:', error);
    throw error;
  }
}

// Get contacts by status
export async function getContactsByStatus(
  status: ContactSubmission['status']
): Promise<ContactSubmission[]> {
  const pool = getPool();

  const query = `
    SELECT * FROM contact_submissions
    WHERE status = $1
    ORDER BY created_at DESC
  `;

  try {
    const result: QueryResult = await pool.query(query, [status]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching contacts by status:', error);
    throw error;
  }
}

// Export to CSV format
export async function exportContactsToCSV(): Promise<string> {
  const contacts = await getAllContacts(10000, 0); // Get all (max 10k)

  if (contacts.length === 0) {
    return '';
  }

  // CSV headers
  const headers = Object.keys(contacts[0]).join(',');

  // CSV rows
  const rows = contacts.map(contact => {
    return Object.values(contact).map(val => {
      if (val === null || val === undefined) return '';

      const strVal = String(val);
      // Escape commas and quotes
      if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
        return `"${strVal.replace(/"/g, '""')}"`;
      }
      return strVal;
    }).join(',');
  });

  return [headers, ...rows].join('\n');
}

// Get analytics data
export async function getAnalytics() {
  const pool = getPool();

  try {
    // Total submissions
    const totalQuery = 'SELECT COUNT(*) as total FROM contact_submissions';
    const totalResult = await pool.query(totalQuery);

    // By status
    const statusQuery = `
      SELECT status, COUNT(*) as count
      FROM contact_submissions
      GROUP BY status
      ORDER BY count DESC
    `;
    const statusResult = await pool.query(statusQuery);

    // By form type
    const formTypeQuery = `
      SELECT form_type, COUNT(*) as count
      FROM contact_submissions
      GROUP BY form_type
      ORDER BY count DESC
    `;
    const formTypeResult = await pool.query(formTypeQuery);

    // Recent submissions (last 7 days)
    const recentQuery = `
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM contact_submissions
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `;
    const recentResult = await pool.query(recentQuery);

    return {
      total: parseInt(totalResult.rows[0].total),
      byStatus: statusResult.rows,
      byFormType: formTypeResult.rows,
      recent: recentResult.rows
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

// Close connection pool (call on app shutdown)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('🐘 PostgreSQL connection pool closed');
  }
}
