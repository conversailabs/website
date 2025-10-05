# 🗄️ Database Setup Guide - PostgreSQL with pgAdmin

## 🎯 Your Current Setup

**✅ What You Already Have:**
- PostgreSQL 17 installed and running
- pgAdmin 4 working
- Database: `voiceai` (already created)
- Existing table: `agents` (5 agents with name, status, prompt columns)
- Connection: `localhost:5432`

**🚀 What We'll Build:**
- Add `contact_submissions` table to your `voiceai` database
- Connect your website forms to save data to PostgreSQL
- View/export form submissions through pgAdmin and admin API
- Keep your existing `agents` table untouched

---

## Table of Contents
1. [Overview](#overview)
2. [Quick Start Guide](#quick-start-guide)
3. [Step 1: Create Contact Table](#step-1-create-contact-table)
4. [Step 2: Environment Configuration](#step-2-environment-configuration)
5. [Step 3: Install Packages](#step-3-install-packages)
6. [Step 4: Code Integration](#step-4-code-integration)
7. [Step 5: Testing](#step-5-testing)
8. [Viewing Your Data](#viewing-your-data)
9. [Troubleshooting](#troubleshooting)
10. [Production Deployment](#production-deployment)

---

## Overview

### What is Database Integration?

Currently, your website has forms but **data is not being saved**:
- ❌ ContactModal form → Only console.log (data lost after refresh)
- ❌ Contact API → Only validation (no storage)

**After PostgreSQL integration:**
- ✅ All form submissions saved permanently in your `voiceai` PostgreSQL database
- ✅ Professional database (used by enterprises)
- ✅ Scalable to millions of records
- ✅ Full control over data
- ✅ Lead tracking and analytics
- ✅ Export to Excel/CSV
- ✅ Easy to backup
- ✅ Works alongside your existing `agents` table

---

### Forms That Need Database Integration

1. **ContactModal** (`src/components/forms/ContactModal.tsx`)
   - Fields: Name, Company, Phone, Email
   - Used in: Industry pages, Hero sections

2. **Contact API** (`src/app/api/contact/route.ts`)
   - Fields: Name, Email, Phone, Company, CompanySize, Message
   - Used in: Contact page

---

## Quick Start Guide

**Total Time:** ~15 minutes

1. ✅ **PostgreSQL running** (already done - service is active)
2. ⏭️ **Create table** in pgAdmin (5 min)
3. ⏭️ **Update .env.local** (2 min)
4. ⏭️ **Install packages** (2 min)
5. ⏭️ **Add code files** (provided below)
6. ⏭️ **Test** (3 min)

---

## Step 1: Create Contact Table

**✅ Your database `voiceai` already exists, we'll just add a new table to it.**

### Open Query Tool in pgAdmin

1. **Open pgAdmin 4**
2. **Expand** `Servers (1)` → `PostgreSQL 17` → `Databases (2)`
3. **Right-click on `voiceai`** database
4. **Select `Query Tool`** (or press `Alt+Shift+Q`)

You should see a SQL editor window open.

---

### Create contact_submissions Table

**Copy-paste this complete SQL** into the Query Tool:

```sql
-- ============================================
-- ConversAI Labs Contact Submissions Table
-- ============================================

-- Create table for storing all form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    -- Primary Key
    id SERIAL PRIMARY KEY,

    -- Contact Information (Required)
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),

    -- Additional Information (Optional)
    company_size VARCHAR(20) CHECK (company_size IN ('small', 'medium', 'large')),
    message TEXT,
    industry VARCHAR(100),

    -- Form Metadata
    source_page VARCHAR(255) NOT NULL,
    form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('contact_modal', 'contact_form', 'demo_request', 'pricing_inquiry')),
    interest_level VARCHAR(20) DEFAULT 'medium' CHECK (interest_level IN ('high', 'medium', 'low')),

    -- Marketing Tracking (UTM Parameters)
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_medium VARCHAR(100),

    -- Additional Notes
    notes TEXT,

    -- Status Tracking
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),

    -- Timestamps (Automatic)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes for Fast Queries
-- ============================================

-- Index on email for faster searches
CREATE INDEX IF NOT EXISTS idx_contact_email
    ON contact_submissions(email);

-- Index on created_at for sorting by date
CREATE INDEX IF NOT EXISTS idx_contact_created_at
    ON contact_submissions(created_at DESC);

-- Index on form_type for filtering
CREATE INDEX IF NOT EXISTS idx_contact_form_type
    ON contact_submissions(form_type);

-- Index on status for lead management
CREATE INDEX IF NOT EXISTS idx_contact_status
    ON contact_submissions(status);

-- Index on source_page for analytics
CREATE INDEX IF NOT EXISTS idx_contact_source
    ON contact_submissions(source_page);

-- ============================================
-- Auto-update updated_at Timestamp
-- ============================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_contact_submissions_updated_at ON contact_submissions;
CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Comments for Documentation
-- ============================================

COMMENT ON TABLE contact_submissions IS 'Stores all form submissions from website';
COMMENT ON COLUMN contact_submissions.id IS 'Auto-incrementing primary key';
COMMENT ON COLUMN contact_submissions.email IS 'User email (required field)';
COMMENT ON COLUMN contact_submissions.source_page IS 'Page where form was submitted';
COMMENT ON COLUMN contact_submissions.form_type IS 'Type of form (contact_modal, contact_form, etc)';
COMMENT ON COLUMN contact_submissions.status IS 'Lead status (new, contacted, converted, closed)';

-- ============================================
-- Grant Permissions (if needed)
-- ============================================

-- Grant all privileges to postgres user
GRANT ALL PRIVILEGES ON TABLE contact_submissions TO postgres;
GRANT USAGE, SELECT ON SEQUENCE contact_submissions_id_seq TO postgres;

-- ============================================
-- Success Message
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Table "contact_submissions" created successfully!';
    RAISE NOTICE '✅ All indexes created';
    RAISE NOTICE '✅ Triggers configured';
    RAISE NOTICE '🎉 Database ready to use!';
END $$;
```

4. **Click Execute** (▶ button or press `F5`)
5. **Check Output** (bottom panel - Messages tab):
   ```
   ✅ Table "contact_submissions" created successfully!
   ✅ All indexes created
   ✅ Triggers configured
   🎉 Database ready to use!
   ```

---

### Verify Table Created

**In pgAdmin:**

1. **Refresh** the database: Right-click `voiceai` → **Refresh**
2. **Expand** `voiceai` → `Schemas` → `public` → `Tables (32)`
3. You should now see:
   - `agents` (your existing table - 5 rows ✅)
   - `contact_submissions` (new table - 0 rows ✅)
4. **Right-click** `contact_submissions` → **View/Edit Data** → **All Rows**
5. Should see empty table with all columns (id, name, email, phone, company, etc.)

**✅ Database table ready!**

---

## Step 2: Environment Configuration

### Your Connection Details

Based on your setup:

```
Host: localhost
Port: 5432
Username: postgres
Password: [your_postgres_password]
Database: voiceai
```

**Connection String Format:**
```
postgresql://username:password@host:port/database
```

**Your Connection String:**
```
postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/voiceai
```

⚠️ **Important:** Replace `YOUR_PASSWORD_HERE` with your actual PostgreSQL password (the one you use to login to pgAdmin).

---

### Update .env.local

**File**: `.env.local` (in project root)

**Current Content**:
```env
# Retell AI Configuration
RETELL_API_KEY=key_b3d2671c06f85c6c0e8b0f0b33f5

# Global Phone Number (optional - for voice calls)
GLOBAL_PHONE_NUMBER=+1234567890
```

**Add PostgreSQL Configuration** (at the end):

```env
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/voiceai

# Admin Password for API access
ADMIN_PASSWORD=your_secure_admin_password_here
```

**⚠️ IMPORTANT**: Replace `YOUR_PASSWORD` with your actual PostgreSQL password!

**Final .env.local should look like:**
```env
# Retell AI Configuration
RETELL_API_KEY=key_b3d2671c06f85c6c0e8b0f0b33f5

# Global Phone Number (optional - for voice calls)
GLOBAL_PHONE_NUMBER=+1234567890

# PostgreSQL Database Configuration
DATABASE_URL=postgresql://postgres:mypassword123@localhost:5432/voiceai

# Admin Password for API access (for /api/admin/contacts endpoint)
ADMIN_PASSWORD=ChangeMeToSecurePassword123
```

---

## Step 3: Install Packages

### Install PostgreSQL Client

Open terminal in your project folder and run:

```bash
npm install pg
npm install --save-dev @types/pg
```

**What is pg?**
- Official PostgreSQL client for Node.js
- Battle-tested and reliable
- Used by millions of applications
- Allows your Next.js app to connect to PostgreSQL

---

## Step 4: Code Integration

### File 1: Create Database Utility

**Create file:** `src/lib/db.ts`

This file will be created in the next step with all database functions.

### File 2: Create Test Endpoint

**Create file:** `src/app/api/test-db/route.ts`

This endpoint tests if your database connection works.

### File 3: Update Contact API

**Update file:** `src/app/api/contact/route.ts`

This will save form submissions to PostgreSQL.

### File 4: Update Contact Modal

**Update file:** `src/components/forms/ContactModal.tsx`

This will connect the form to your API.

### File 5: Create Admin API (Optional)

**Create file:** `src/app/api/admin/contacts/route.ts`

This allows you to view and export all contact submissions.

---

### Restart Dev Server

After updating `.env.local`:

```bash
# Stop server (Ctrl+C in terminal)
# Then restart
npm run dev
```

Environment variables only load on server start.

---

## Step 5: Testing

### Test 1: Database Connection

After installing packages and adding code:

```bash
# Start dev server
npm run dev

# Visit test endpoint in browser:
http://localhost:3000/api/test-db
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connected successfully! ✅"
}
```

---

### Test 2: Submit Contact Form

1. **Open website**: http://localhost:3000
2. **Navigate to** contact page or any industry page
3. **Fill out form**:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Company: Test Company
4. **Click Submit**
5. **Check terminal** - should see:
   ```
   ✅ Contact saved to PostgreSQL with ID: 1
   ```

---

### Test 3: Verify in pgAdmin

1. **Open pgAdmin 4**
2. **Expand** `voiceai` → `Schemas` → `public` → `Tables`
3. **Right-click** `contact_submissions` → **View/Edit Data** → **All Rows**
4. **You should see your test submission!** ✅
   - id: 1
   - name: "Test User"
   - email: "test@example.com"
   - created_at: [timestamp]

---

## Viewing Your Data

### Option 1: pgAdmin (Visual Interface)

**View All Contacts:**
1. Right-click `contact_submissions` table
2. **View/Edit Data** → **All Rows**
3. See all submissions in a nice table view

**Filter/Sort:**
- Click column headers to sort
- Use Filter icon to search
- Export using File → Export

**Run Custom Queries:**
1. Right-click `voiceai` database → **Query Tool**
2. Examples:

```sql
-- View recent submissions
SELECT * FROM contact_submissions
ORDER BY created_at DESC
LIMIT 10;

-- Count by status
SELECT status, COUNT(*) as total
FROM contact_submissions
GROUP BY status;

-- Search by email
SELECT * FROM contact_submissions
WHERE email LIKE '%@gmail.com';
```

---

### Option 2: Admin API (Programmatic Access)

**View all contacts:**
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
  http://localhost:3000/api/admin/contacts
```

**Export to CSV:**
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
  "http://localhost:3000/api/admin/contacts?format=csv" \
  -o contacts.csv
```

**Get analytics:**
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
  "http://localhost:3000/api/admin/contacts?analytics=true"
```

---

### Option 3: Build Admin Dashboard (Future)

You can build a React admin dashboard at `/admin` to:
- View all contacts in a table
- Filter by date, status, form type
- Export to CSV/Excel
- Update contact status
- View analytics charts

---

## CODE FILES

### File 1: src/lib/db.ts (Database Utility)

```typescript
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
```

---

### File 2: src/app/api/test-db/route.ts (Test Connection Endpoint)

```typescript
import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    const isConnected = await testConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'Database connected successfully! ✅'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
```

---

### File 3: src/app/api/contact/route.ts (Update Contact API)

**Replace entire file contents with:**

```typescript
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
```

---

### File 4: src/components/forms/ContactModal.tsx (Update Form Component)

**Note:** I'll update this file for you in the next step with proper database integration.

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newErrors = {
    name: '',
    company: '',
    phone: '',
    email: ''
  };

  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }
  if (!formData.company.trim()) {
    newErrors.company = 'Company name is required';
  }
  if (!formData.phone.trim()) {
    newErrors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    newErrors.phone = 'Please enter a valid 10-digit phone number';
  }
  if (!formData.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }

  setErrors(newErrors);

  if (!Object.values(newErrors).some(error => error)) {
    // Form is valid, submit to API
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: industry ? `Interested in ${industry}` : 'Contact modal submission',
          source: industry ? `industries/${industry}` : 'contact_modal',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Form submitted successfully:', result);

        // Success feedback
        alert('Thank you! We will contact you soon.');

        // Reset form and close modal
        setFormData({ name: '', company: '', phone: '', email: '' });
        onClose();
      } else {
        console.error('❌ API error:', result);
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Unable to submit. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }
};
```

---

### File 5: src/app/api/admin/contacts/route.ts (Admin API - Optional)

```typescript
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
```

---

## QUICK CHECKLIST

After completing all steps above, verify:

- [ ] PostgreSQL 17 running (already ✅)
- [ ] `voiceai` database exists (already ✅)
- [ ] `contact_submissions` table created in pgAdmin
- [ ] `.env.local` updated with `DATABASE_URL` and `ADMIN_PASSWORD`
- [ ] `npm install pg @types/pg` completed
- [ ] `src/lib/db.ts` file created
- [ ] `src/app/api/test-db/route.ts` file created
- [ ] `src/app/api/contact/route.ts` file updated
- [ ] `src/components/forms/ContactModal.tsx` file updated
- [ ] `src/app/api/admin/contacts/route.ts` file created (optional)
- [ ] Dev server restarted
- [ ] `/api/test-db` endpoint returns success
- [ ] Test form submission successful
- [ ] Data visible in pgAdmin

---

## Troubleshooting

### Common Issues

#### Error 1: Test Database Connection

```bash
# Start dev server
npm run dev

# Visit test endpoint in browser or use curl:
curl http://localhost:3000/api/test-db
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connected successfully! ✅"
}
```

**If Error:**
- Check PostgreSQL is running
- Check DATABASE_URL in `.env.local`
- Check password is correct
- Check port 5432 is not blocked

---

### Step 2: Test Form Submission

1. **Open website**: http://localhost:3000
2. **Navigate to contact page** or **industry page**
3. **Fill form**:
   - Name: Test User
   - Email: test@example.com
   - Phone: 1234567890
   - Company: Test Company
   - Message: Test message
4. **Click Submit**
5. **Check terminal logs**:
   ```
   ✅ Contact saved to PostgreSQL with ID: 1
   ```

---

### Step 3: Verify Data in pgAdmin

**In pgAdmin:**

1. **Expand** `conversailabs_db` → `Schemas` → `public` → `Tables`
2. **Right-click** `contact_submissions` → **View/Edit Data** → **All Rows**
3. **Should see your test submission** ✅

**Columns to check:**
- ✅ id = 1
- ✅ name = "Test User"
- ✅ email = "test@example.com"
- ✅ created_at has timestamp
- ✅ status = "new"

---

### Step 4: Test Admin API

```bash
# Get all contacts (replace with your ADMIN_PASSWORD)
curl -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
  http://localhost:3000/api/admin/contacts
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Test User",
      "email": "test@example.com",
      "phone": "1234567890",
      "company": "Test Company",
      "message": "Test message",
      "status": "new",
      "created_at": "2025-10-01T12:34:56.789Z"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 100,
    "offset": 0,
    "hasMore": false
  }
}
```

---

### Step 5: Export to CSV

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
  "http://localhost:3000/api/admin/contacts?format=csv" \
  -o contacts.csv
```

Opens in Excel/Google Sheets ✅

---

### Step 6: View Analytics

```bash
curl -H "Authorization: Bearer YOUR_ADMIN_PASSWORD" \
  "http://localhost:3000/api/admin/contacts?analytics=true"
```

**Response:**
```json
{
  "success": true,
  "analytics": {
    "total": 15,
    "byStatus": [
      { "status": "new", "count": "10" },
      { "status": "contacted", "count": "5" }
    ],
    "byFormType": [
      { "form_type": "contact_form", "count": "8" },
      { "form_type": "contact_modal", "count": "7" }
    ],
    "recent": [
      { "date": "2025-10-01", "count": "5" },
      { "date": "2025-09-30", "count": "10" }
    ]
  }
}
```

---

## Troubleshooting

### Error 1: "Cannot find module 'pg'"

**Cause**: Package not installed

**Fix**:
```bash
npm install pg
npm install --save-dev @types/pg
```

---

### Error 2: "DATABASE_URL not found in environment variables"

**Cause**: `.env.local` missing or DATABASE_URL not set

**Fix**:
1. Check `.env.local` exists in project root
2. Add: `DATABASE_URL=postgresql://postgres:password@localhost:5432/conversailabs_db`
3. Restart dev server: `npm run dev`

---

### Error 3: "connection refused" or "ECONNREFUSED"

**Cause**: PostgreSQL not running

**Fix**:

**Windows:**
1. Press `Win + R` → `services.msc`
2. Find "postgresql-x64-xx"
3. Right-click → Start

**Mac:**
```bash
brew services start postgresql
```

**Linux:**
```bash
sudo systemctl start postgresql
```

---

### Error 4: "password authentication failed for user postgres"

**Cause**: Wrong password in DATABASE_URL

**Fix**:
1. Find correct password:
   - Check where you saved it during PostgreSQL installation
   - Or reset password in pgAdmin
2. Update DATABASE_URL in `.env.local`
3. Restart dev server

**Reset Password in pgAdmin:**
1. Right-click server → Properties
2. Go to Connection tab
3. Set new password
4. Update `.env.local`

---

### Error 5: "database conversailabs_db does not exist"

**Cause**: Database not created

**Fix**:
1. Open pgAdmin
2. Right-click "Databases" → Create → Database
3. Name: `conversailabs_db`
4. Click Save
5. Run table creation SQL (Step 2 of Database Creation)

---

### Error 6: "relation contact_submissions does not exist"

**Cause**: Table not created

**Fix**:
1. Open pgAdmin
2. Right-click `conversailabs_db` → Query Tool
3. Copy-paste table creation SQL from **Step 2** above
4. Click Execute (F5)

---

### Error 7: Port 5432 already in use

**Cause**: Another PostgreSQL instance running

**Fix**:
```bash
# Check what's using port 5432
# Windows:
netstat -ano | findstr :5432

# Mac/Linux:
lsof -i :5432
```

Either:
- Stop other PostgreSQL instance
- Or change port in pgAdmin and DATABASE_URL

---

## Useful SQL Queries (Run in pgAdmin)

### View all submissions
```sql
SELECT * FROM contact_submissions
ORDER BY created_at DESC
LIMIT 10;
```

### Count total submissions
```sql
SELECT COUNT(*) FROM contact_submissions;
```

### Search by email
```sql
SELECT * FROM contact_submissions
WHERE email LIKE '%@example.com';
```

### Get submissions from today
```sql
SELECT * FROM contact_submissions
WHERE created_at >= CURRENT_DATE;
```

### Count by status
```sql
SELECT status, COUNT(*) as count
FROM contact_submissions
GROUP BY status;
```

### Delete test data
```sql
DELETE FROM contact_submissions
WHERE email = 'test@example.com';
```

### Update status
```sql
UPDATE contact_submissions
SET status = 'contacted'
WHERE id = 1;
```

---

## Production Deployment

### Option 1: Vercel with Vercel Postgres

**Steps:**
1. Go to Vercel project → Storage → Create Database
2. Select Postgres (free tier: 256MB)
3. Copy connection string
4. Add to Vercel environment variables:
   - `DATABASE_URL` = connection string
   - `ADMIN_PASSWORD` = your password
5. Deploy

**Cost**: Free tier (256MB, 60 hours compute/month)

---

### Option 2: Railway.app with PostgreSQL

**Steps:**
1. Sign up at railway.app
2. Create new project from GitHub
3. Add PostgreSQL database (Plugin)
4. Copy DATABASE_URL from variables
5. Add to environment variables
6. Deploy

**Cost**: $5/month credit (enough for small apps)

---

### Option 3: Your Own Server with PostgreSQL

**Steps:**
1. Already have PostgreSQL on your server ✅
2. Create production database
3. Update DATABASE_URL to point to production
4. Deploy Next.js app
5. Done!

**Cost**: Whatever your current hosting costs

---

## Backup Strategy

### Manual Backup (pgAdmin)

1. **Right-click** `conversailabs_db`
2. **Backup...**
3. **Format**: Custom
4. **Filename**: `backup_2025_10_01.backup`
5. **Click Backup**

---

### Automated Backup Script

**File**: `scripts/backup-db.sh` (Create new folder + file)

```bash
#!/bin/bash

# Configuration
DB_NAME="conversailabs_db"
DB_USER="postgres"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${DATE}.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
PGPASSWORD="your_password" pg_dump -U $DB_USER -h localhost $DB_NAME > $BACKUP_FILE

echo "✅ Backup created: $BACKUP_FILE"

# Keep only last 30 backups
ls -t $BACKUP_DIR/*.sql | tail -n +31 | xargs -r rm

echo "✅ Old backups cleaned"
```

**Make executable:**
```bash
chmod +x scripts/backup-db.sh
```

**Run daily (cron):**
```bash
# Add to crontab
0 2 * * * /path/to/project/scripts/backup-db.sh
```

---

## Quick Reference

### Connection Details
```
Host: localhost
Port: 5432
Database: conversailabs_db
Username: postgres
Password: [your_password]
```

### DATABASE_URL Format
```
postgresql://postgres:password@localhost:5432/conversailabs_db
```

### API Endpoints
```
POST /api/contact              - Submit contact form
GET  /api/test-db              - Test database connection
GET  /api/admin/contacts       - View all contacts (auth required)
GET  /api/admin/contacts?format=csv  - Export CSV
GET  /api/admin/contacts?analytics=true - Get analytics
```

### pgAdmin Quick Actions
- **View Data**: Right-click table → View/Edit Data → All Rows
- **Run Query**: Right-click database → Query Tool
- **Backup**: Right-click database → Backup...
- **Restore**: Right-click database → Restore...

---

## Summary Checklist

Setup complete when:

- [ ] PostgreSQL installed and running
- [ ] pgAdmin working
- [ ] Database `conversailabs_db` created
- [ ] Table `contact_submissions` created with SQL script
- [ ] `pg` package installed (`npm install pg`)
- [ ] `src/lib/db.ts` file created
- [ ] DATABASE_URL added to `.env.local`
- [ ] Connection test passes (`/api/test-db`)
- [ ] `/api/contact` route updated
- [ ] `ContactModal.tsx` updated
- [ ] Test form submission successful
- [ ] Data visible in pgAdmin
- [ ] Admin API works (optional)
- [ ] Backup strategy planned

**Status**: Ready for production! ✅

---

## Support & Resources

### Documentation
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **pg (node-postgres)**: https://node-postgres.com/
- **pgAdmin Docs**: https://www.pgadmin.org/docs/

### Video Tutorials
- "PostgreSQL Tutorial" on YouTube
- "pgAdmin Tutorial" on YouTube
- "Next.js + PostgreSQL" tutorials

### Community Help
- **Stack Overflow**: Tag with `postgresql` and `next.js`
- **PostgreSQL Discord**: https://discord.gg/postgresql

---

**Last Updated**: 2025-10-01
**Version**: 3.0 - PostgreSQL Edition
**Database**: PostgreSQL with pgAdmin

---

This guide is specifically for users with **PostgreSQL and pgAdmin already installed**. Perfect for production-ready applications! 🐘🚀
