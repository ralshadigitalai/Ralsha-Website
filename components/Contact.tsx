'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { submitContactForm } from '@/lib/api/contact';

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  monthlySpend: string;
  businessDetails: string;
  website: string; // Honeypot
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  monthlySpend?: string;
  businessDetails?: string;
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    monthlySpend: '',
    businessDetails: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field refs to focus the first invalid field
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const monthlySpendRef = useRef<HTMLSelectElement>(null);
  const businessDetailsRef = useRef<HTMLTextAreaElement>(null);

  // Validation functions
  const validateField = (name: keyof FormState, value: string): string | undefined => {
    const trimmed = value.trim();

    if (name === 'fullName') {
      if (!trimmed) return 'Full name is required.';
      if (trimmed.length < 2) return 'Full name must contain at least 2 characters.';
      if (trimmed.length > 100) return 'Full name must not exceed 100 characters.';
      if (!/^[a-zA-Z\s'.-]+$/.test(trimmed)) {
        return 'Full name contains invalid characters.';
      }
    }

    if (name === 'phone') {
      if (!trimmed) return 'Phone number is required.';
      // Strip spaces, dashes, brackets, +91, 0
      let cleanPhone = trimmed.replace(/[\s()\-]/g, '');
      if (cleanPhone.startsWith('+91')) cleanPhone = cleanPhone.slice(3);
      else if (cleanPhone.startsWith('91') && cleanPhone.length === 12) cleanPhone = cleanPhone.slice(2);
      else if (cleanPhone.startsWith('0') && cleanPhone.length === 11) cleanPhone = cleanPhone.slice(1);

      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        return 'Please enter a valid 10-digit Indian mobile number starting with 6-9.';
      }

      // Check repeated digits
      if (/^(\d)\1{9}$/.test(cleanPhone)) {
        return 'Please enter a valid mobile number.';
      }
    }

    if (name === 'email') {
      if (!trimmed) return 'Email address is required.';
      if (trimmed.length > 254) return 'Email address is too long.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address.';
      }
    }

    if (name === 'monthlySpend') {
      if (!value) return 'Please select your current monthly ad spend.';
    }

    if (name === 'businessDetails') {
      if (!trimmed) return 'Business details are required.';
      if (trimmed.length < 5) return 'Please provide a brief description (at least 5 characters).';
      if (trimmed.length > 2000) return 'Description must not exceed 2000 characters.';
    }

    return undefined;
  };

  const validateAll = (): FormErrors => {
    const newErrors: FormErrors = {};
    const nameErr = validateField('fullName', formState.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validateField('phone', formState.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const emailErr = validateField('email', formState.email);
    if (emailErr) newErrors.email = emailErr;

    const spendErr = validateField('monthlySpend', formState.monthlySpend);
    if (spendErr) newErrors.monthlySpend = spendErr;

    const detailsErr = validateField('businessDetails', formState.businessDetails);
    if (detailsErr) newErrors.businessDetails = detailsErr;

    return newErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Dynamic error clearing
    if (errors[name as keyof FormErrors]) {
      const err = validateField(name as keyof FormState, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid field
      if (validationErrors.fullName && fullNameRef.current) {
        fullNameRef.current.focus();
      } else if (validationErrors.phone && phoneRef.current) {
        phoneRef.current.focus();
      } else if (validationErrors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (validationErrors.monthlySpend && monthlySpendRef.current) {
        monthlySpendRef.current.focus();
      } else if (validationErrors.businessDetails && businessDetailsRef.current) {
        businessDetailsRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitContactForm(formState);
      setStatusMessage(response.message);
    } catch {
      setStatusMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-panel reveal">
          <div className="contact-info">
            <span className="eyebrow">Let&apos;s talk</span>
            <h2>
              Ready to put <span className="accent">AI behind your growth?</span>
            </h2>
            <p>
              Tell us about your business. If we&apos;re a fit, you&apos;ll hear
              from us within one business day — no auto-reply, no sales script.
            </p>
            <a
              href="mailto:ralshadigitalai@gmail.com"
              className="contact-detail"
            >
              ralshadigitalai@gmail.com
            </a>
            <a href="tel:+910000000000" className="contact-detail">
              +91 00000 00000
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot Field */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="fwebsite">Website</label>
              <input
                id="fwebsite"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={formState.website}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="fname">Full name *</label>
                <input
                  id="fname"
                  ref={fullNameRef}
                  type="text"
                  name="fullName"
                  placeholder="Your name"
                  value={formState.fullName}
                  onChange={handleChange}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'err-fname' : undefined}
                  maxLength={100}
                  required
                />
                {errors.fullName && (
                  <span id="err-fname" className="error-text">
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="field">
                <label htmlFor="fphone">Phone *</label>
                <input
                  id="fphone"
                  ref={phoneRef}
                  type="tel"
                  name="phone"
                  placeholder="Your number"
                  value={formState.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'err-fphone' : undefined}
                  maxLength={20}
                  required
                />
                {errors.phone && (
                  <span id="err-fphone" className="error-text">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="field" style={{ marginBottom: '16px' }}>
              <label htmlFor="femail">Email *</label>
              <input
                id="femail"
                ref={emailRef}
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formState.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-femail' : undefined}
                maxLength={254}
                required
              />
              {errors.email && (
                <span id="err-femail" className="error-text">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="field" style={{ marginBottom: '16px' }}>
              <label htmlFor="fspend">Current monthly ad spend *</label>
              <select
                id="fspend"
                ref={monthlySpendRef}
                name="monthlySpend"
                value={formState.monthlySpend}
                onChange={handleChange}
                aria-invalid={!!errors.monthlySpend}
                aria-describedby={errors.monthlySpend ? 'err-fspend' : undefined}
                required
              >
                <option value="" disabled>
                  Select monthly ad spend
                </option>
                <option value="Not spending on ads yet">
                  Not spending on ads yet
                </option>
                <option value="Under ₹1,50,000 / month">
                  Under ₹1,50,000 / month
                </option>
                <option value="₹1,50,000 – ₹8,00,000 / month">
                  ₹1,50,000 – ₹8,00,000 / month
                </option>
                <option value="₹8,00,000+ / month">₹8,00,000+ / month</option>
              </select>
              {errors.monthlySpend && (
                <span id="err-fspend" className="error-text">
                  {errors.monthlySpend}
                </span>
              )}
            </div>

            <div className="field" style={{ marginBottom: '20px' }}>
              <label htmlFor="fabout">What do you sell? *</label>
              <textarea
                id="fabout"
                ref={businessDetailsRef}
                name="businessDetails"
                placeholder="A line or two about your business"
                value={formState.businessDetails}
                onChange={handleChange}
                aria-invalid={!!errors.businessDetails}
                aria-describedby={
                  errors.businessDetails ? 'err-fabout' : undefined
                }
                maxLength={2000}
                required
              />
              {errors.businessDetails && (
                <span id="err-fabout" className="error-text">
                  {errors.businessDetails}
                </span>
              )}
            </div>

            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Validating...' : 'Send it over'}
            </button>

            {statusMessage && (
              <div className="form-status-box info" role="status">
                {statusMessage}
              </div>
            )}

            <p className="form-note">
              We reply to every single submission. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
