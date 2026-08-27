import { NextRequest, NextResponse } from 'next/server';
import { sendLeadToUpstream, LeadPayload } from '@/lib/api/leads';

const MAX_PAYLOAD_BYTES = 10 * 1024; // 10 KB

export async function POST(req: NextRequest) {
  try {
    // 1. Content-Type inspection
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // 2. Read stream body to enforce exact 10 KB limit (independent of Content-Length header)
    if (!req.body) {
      return NextResponse.json(
        { success: false, error: 'Empty request body' },
        { status: 400 }
      );
    }

    const reader = req.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        totalBytes += value.length;
        if (totalBytes > MAX_PAYLOAD_BYTES) {
          return NextResponse.json(
            { success: false, error: 'Payload size exceeds limit' },
            { status: 413 }
          );
        }
        chunks.push(value);
      }
    }

    const bodyBuffer = Buffer.concat(chunks);
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(bodyBuffer.toString('utf-8'));
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload' },
        { status: 400 }
      );
    }

    // 3. Honeypot check (hidden field 'website')
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // 4. Character length caps
    const fullNameRaw = typeof body.fullName === 'string' ? body.fullName : '';
    const phoneRaw = typeof body.phone === 'string' ? body.phone : '';
    const emailRaw = typeof body.email === 'string' ? body.email : '';
    const monthlySpendRaw = typeof body.monthlySpend === 'string' ? body.monthlySpend : 'Not spending on ads yet';
    const sellingDetailRaw = typeof body.sellingDetail === 'string' ? body.sellingDetail : '';

    if (
      fullNameRaw.length > 100 ||
      phoneRaw.length > 30 ||
      emailRaw.length > 254 ||
      monthlySpendRaw.length > 100 ||
      sellingDetailRaw.length > 2000
    ) {
      return NextResponse.json(
        { success: false, error: 'Field value exceeds maximum length' },
        { status: 400 }
      );
    }

    // 5. Server-side validation
    const fullName = fullNameRaw.trim();
    if (!fullName || /\d/.test(fullName) || fullName.length <= 3) {
      return NextResponse.json(
        { success: false, error: 'Invalid full name' },
        { status: 400 }
      );
    }

    const rawDigits = phoneRaw.replace(/\D/g, '');
    let normalizedPhoneDigits = rawDigits;
    if (rawDigits.length === 12 && rawDigits.startsWith('91')) {
      normalizedPhoneDigits = rawDigits.slice(2);
    }

    if (!phoneRaw.trim() || /[a-zA-Z@]/.test(phoneRaw) || normalizedPhoneDigits.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const email = emailRaw.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 6. Whitelisted payload construction
    const payload: LeadPayload = {
      submittedAt: new Date().toISOString(),
      fullName,
      phone: phoneRaw.trim(),
      email,
      monthlySpend: monthlySpendRaw.trim(),
      sellingDetail: sellingDetailRaw.trim(),
    };

    // 7. Environmental check & Upstream dispatch
    const sheetUrl = process.env.LEADS_SHEET_URL;
    if (!sheetUrl || sheetUrl === 'PLACEHOLDER') {
      // In preview mode without LEADS_SHEET_URL set, log safe status (no PII) and return success
      return NextResponse.json({
        success: true,
        message: 'Lead received successfully (Pending LEADS_SHEET_URL configuration)',
      });
    }

    const ok = await sendLeadToUpstream(payload);

    if (!ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to process lead request' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}
