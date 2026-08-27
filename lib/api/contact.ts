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

/**
 * Isolated contact form API submission handler.
 * Note: No production backend endpoint is currently configured.
 * This handler isolates future API integration (endpoint, payload, headers).
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  // If honeypot is filled, discard silently
  if (data.honeypot) {
    return {
      success: true,
      message: 'Submission received.',
    };
  }

  // Production API endpoint is not yet provided.
  return {
    success: false,
    message:
      'Production lead submission is currently unavailable as no backend API endpoint has been configured yet.',
  };
}
