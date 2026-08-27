'use client';

import React, { useState, useRef } from 'react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  monthlySpend: string;
  sellingDetail: string;
  website: string; // Honeypot field
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    monthlySpend: 'Not spending on ads yet',
    sellingDetail: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const validateForm = (data: FormData): FormErrors => {
    const errs: FormErrors = {};

    // 1. Full Name Validation: no digits allowed, MUST BE MORE THAN 3 CHARACTERS (> 3)
    const name = data.fullName.trim();
    if (!name) {
      errs.fullName = 'Full name is required';
    } else if (/\d/.test(name)) {
      errs.fullName = 'Full name cannot contain numbers';
    } else if (name.length <= 3) {
      errs.fullName = 'Full name must be more than 3 characters';
    }

    // 2. Phone Validation: Supports optional +91, spaces, hyphens; extracts & validates 10-digit mobile number
    const phone = data.phone.trim();
    const rawDigits = phone.replace(/\D/g, '');
    let normalizedDigits = rawDigits;
    if (rawDigits.length === 12 && rawDigits.startsWith('91')) {
      normalizedDigits = rawDigits.slice(2);
    }

    if (!phone) {
      errs.phone = 'Phone number is required';
    } else if (/[a-zA-Z@]/.test(phone)) {
      errs.phone = 'Phone cannot contain letters or email format';
    } else if (normalizedDigits.length !== 10) {
      errs.phone = 'Phone number must be a valid 10-digit mobile number';
    }

    // 3. Email Validation
    const email = data.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    let value = e.target.value;

    // Keystroke filtering
    if (name === 'fullName') {
      // Block numeric digits in full name
      value = value.replace(/[0-9]/g, '');
    } else if (name === 'phone') {
      // Allow +, digits, spaces, hyphens for optional +91 and formatting
      value = value.replace(/[^0-9+\s-]/g, '');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitError(null);
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      if (formErrors.fullName && fullNameRef.current) {
        fullNameRef.current.focus();
      } else if (formErrors.phone && phoneRef.current) {
        phoneRef.current.focus();
      } else if (formErrors.email && emailRef.current) {
        emailRef.current.focus();
      }
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.error || 'Unable to submit request. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
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
              Tell us about your business. If we&apos;re a fit, you&apos;ll hear from us within one business day — no auto-reply, no sales script.
            </p>
            <a href="mailto:ralshadigitalai@gmail.com" className="contact-detail">
              ralshadigitalai@gmail.com
            </a>
            <a href="tel:+910000000000" className="contact-detail">
              +91 00000 00000
            </a>
          </div>

          {submitted ? (
            <div className="contact-form">
              <div className="form-thankyou">
                <div className="thankyou-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Thank you for reaching out!</h3>
                <p>
                  We have received your details and will get back to you within one business day.
                </p>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Visually Hidden Honeypot Field */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="fwebsite">Website</label>
                <input
                  id="fwebsite"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="fname">Full name *</label>
                  <input
                    id="fname"
                    name="fullName"
                    type="text"
                    ref={fullNameRef}
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'has-error' : ''}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'err-fname' : undefined}
                    required
                  />
                  {errors.fullName && (
                    <span id="err-fname" className="field-error" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="fphone">Phone *</label>
                  <input
                    id="fphone"
                    name="phone"
                    type="tel"
                    ref={phoneRef}
                    placeholder="Your number (e.g. +91 98765 43210)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'has-error' : ''}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'err-fphone' : undefined}
                    required
                  />
                  {errors.phone && (
                    <span id="err-fphone" className="field-error" role="alert">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="field" style={{ marginBottom: '16px' }}>
                <label htmlFor="femail">Email *</label>
                <input
                  id="femail"
                  name="email"
                  type="email"
                  ref={emailRef}
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'has-error' : ''}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-femail' : undefined}
                  required
                />
                {errors.email && (
                  <span id="err-femail" className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="field" style={{ marginBottom: '16px' }}>
                <label htmlFor="fspend">Current monthly ad spend</label>
                <select
                  id="fspend"
                  name="monthlySpend"
                  value={formData.monthlySpend}
                  onChange={handleChange}
                >
                  <option value="Not spending on ads yet">Not spending on ads yet</option>
                  <option value="Under ₹1,50,000 / month">Under ₹1,50,000 / month</option>
                  <option value="₹1,50,000 – ₹8,00,000 / month">₹1,50,000 – ₹8,00,000 / month</option>
                  <option value="₹8,00,000+ / month">₹8,00,000+ / month</option>
                </select>
              </div>
              <div className="field" style={{ marginBottom: '20px' }}>
                <label htmlFor="fabout">What do you sell?</label>
                <textarea
                  id="fabout"
                  name="sellingDetail"
                  placeholder="A line or two about your business"
                  value={formData.sellingDetail}
                  onChange={handleChange}
                />
              </div>
              {submitError && (
                <div style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>
                  {submitError}
                </div>
              )}
              <button
                className="btn btn-primary btn-block"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send it over'}
              </button>
              <p className="form-note">We reply to every single submission. No spam, ever.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
