import { getAttribution, clearAttribution } from '@/lib/utm';

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  monthlySpend: string;
  businessDetails: string;
  honeypot?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
}

type SignupApiResponse =
  | {
      success: true;
      data: unknown;
      message?: string;
    }
  | {
      success: false;
      error?: {
        code?: string;
        message?: string;
      };
    };

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  // Bots often fill hidden fields. Do not send their request to the API.
  if (data.honeypot) {
    return {
      success: true,
      message: 'Submission received.',
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 15_000);

  try {
    const attribution = getAttribution();

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        countryCode: '+91',
        monthlyAdSpend: data.monthlySpend,
        productsSold: data.businessDetails.trim(),
        route: window.location.pathname,
        timezone:
          Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
        ...attribution,
      }),
      signal: controller.signal,
    });

    const result = (await response.json()) as SignupApiResponse;

    if (response.ok && result.success) {
      clearAttribution();
      return {
        success: true,
        message: result.message || 'Your details were submitted successfully.',
      };
    }

    return {
      success: false,
      message:
        !result.success && result.error?.message
          ? result.error.message
          : 'Unable to submit your details. Please try again.',
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return {
        success: false,
        message: 'The request took too long. Please try again.',
      };
    }

    return {
      success: false,
      message: 'Unable to connect to the server. Please try again.',
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}
