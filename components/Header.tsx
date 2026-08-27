'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Scroll handler for transparent -> blurred opaque background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMobileOpen]);

  // Handle Escape key and focus trapping in mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMobileOpen) return;

      if (e.key === 'Escape') {
        closeMobileMenu();
      }

      if (e.key === 'Tab' && mobileNavRef.current) {
        const focusables = mobileNavRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileOpen]);

  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      closeMobileMenu();
    } else {
      setIsMobileOpen(true);
      // Focus first link in mobile menu after open
      setTimeout(() => {
        const firstLink = mobileNavRef.current?.querySelector<HTMLElement>('a');
        firstLink?.focus();
      }, 50);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    // Restore focus to toggle button
    menuBtnRef.current?.focus();
  };

  return (
    <>
      <header id="siteHeader" className={isScrolled ? 'scrolled' : ''}>
        <div className="wrap">
          <nav>
            <Link href="#top" className="brand" onClick={closeMobileMenu}>
              <Image
                src="/assets/logo.png"
                alt="Ralsha logo"
                width={38}
                height={38}
                priority
              />
              <b>RALSHA</b>
            </Link>

            <div className="nav-links">
              <Link href="#services">Services</Link>
              <Link href="#process">Process</Link>
              <Link href="#who">Who it&apos;s for</Link>
              <Link href="#contact">Contact</Link>
            </div>

            <div className="nav-right">
              <a href="mailto:ralshadigitalai@gmail.com" className="nav-email">
                ralshadigitalai@gmail.com
              </a>
              <Link href="#contact" className="btn btn-primary">
                Book a strategy call
              </Link>
            </div>

            <button
              ref={menuBtnRef}
              className="menu-btn"
              aria-label="Menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-nav-drawer"
              onClick={toggleMobileMenu}
            >
              {isMobileOpen ? '✕' : '☰'}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        ref={mobileNavRef}
        className={`mobile-nav-overlay ${isMobileOpen ? 'open' : ''}`}
        aria-hidden={!isMobileOpen}
      >
        <div className="mobile-nav-links">
          <Link href="#services" onClick={closeMobileMenu}>
            Services
          </Link>
          <Link href="#process" onClick={closeMobileMenu}>
            Process
          </Link>
          <Link href="#who" onClick={closeMobileMenu}>
            Who it&apos;s for
          </Link>
          <Link href="#contact" onClick={closeMobileMenu}>
            Contact
          </Link>
        </div>

        <div className="mobile-nav-footer">
          <a
            href="mailto:ralshadigitalai@gmail.com"
            className="btn btn-ghost btn-block"
            onClick={closeMobileMenu}
          >
            ralshadigitalai@gmail.com
          </a>
          <Link
            href="#contact"
            className="btn btn-primary btn-block"
            onClick={closeMobileMenu}
          >
            Book a strategy call
          </Link>
        </div>
      </div>
    </>
  );
}
