export interface LeadPayload {
  submittedAt: string;
  fullName: string;
  phone: string;
  email: string;
  monthlySpend: string;
  sellingDetail: string;
}

export async function sendLeadToUpstream(payload: LeadPayload): Promise<boolean> {
  const sheetUrl = process.env.LEADS_SHEET_URL;

  if (!sheetUrl || sheetUrl === 'PLACEHOLDER') {
    // Upstream webhook URL is not configured on the server
    return false;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
