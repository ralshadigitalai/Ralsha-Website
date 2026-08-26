import React, { useState } from 'react';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  monthlySpend: string;
  sellingDetail: string;
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
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateForm = (data: FormData): FormErrors => {
    const errs: FormErrors = {};

    // 1. Full Name Validation: no digits allowed, minimum 2 characters
    const name = data.fullName.trim();
    if (!name) {
      errs.fullName = 'Full name is required';
    } else if (/\d/.test(name)) {
      errs.fullName = 'Full name cannot contain numbers';
    } else if (!/^[a-zA-Z\s'.\-]{2,60}$/.test(name)) {
      errs.fullName = 'Please enter a valid name (letters only)';
    }

    // 2. Phone Validation: no alphabetic/email characters, 7-15 digits
    const phone = data.phone.trim();
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone) {
      errs.phone = 'Phone number is required';
    } else if (/[a-zA-Z@]/.test(phone)) {
      errs.phone = 'Phone cannot contain letters or email format';
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errs.phone = 'Please enter a valid phone number (7 to 15 digits)';
    }

    // 3. Email Validation: valid email format required
    const email = data.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address (e.g. name@company.com)';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setSubmitting(true);
    const sheetUrl = import.meta.env.VITE_LEADS_SHEET_URL;

    try {
      if (sheetUrl && sheetUrl !== 'PLACEHOLDER') {
        await fetch(sheetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(formData),
        });
      }
    } catch (err) {
      console.error('Failed to submit leads to Google Sheet:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="contact-panel reveal">
          <div className="contact-info">
            <span className="eyebrow">Let's talk</span>
            <h2>
              Ready to put <span className="accent">AI behind your growth?</span>
            </h2>
            <p>
              Tell us about your business. If we're a fit, you'll hear from us within one business day — no auto-reply, no sales script.
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
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fname">Full name</label>
                  <input
                    id="fname"
                    name="fullName"
                    type="text"
                    placeholder="Your name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={errors.fullName ? 'has-error' : ''}
                    required
                  />
                  {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                </div>
                <div className="field">
                  <label htmlFor="fphone">Phone</label>
                  <input
                    id="fphone"
                    name="phone"
                    type="tel"
                    placeholder="Your number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'has-error' : ''}
                    required
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
              <div className="field" style={{ marginBottom: '16px' }}>
                <label htmlFor="femail">Email</label>
                <input
                  id="femail"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'has-error' : ''}
                  required
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
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
                  <option value="Under $2,000 / month">Under $2,000 / month</option>
                  <option value="$2,000 – $10,000 / month">$2,000 – $10,000 / month</option>
                  <option value="$10,000+ / month">$10,000+ / month</option>
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
