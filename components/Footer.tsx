import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="#top" className="brand">
              <Image
                src="/assets/logo.png"
                alt="Ralsha logo"
                width={36}
                height={36}
              />
              <b>RALSHA</b>
            </Link>
            <p>
              AI-driven growth for ambitious businesses that grow on conviction,
              not guesswork.
            </p>
            <div className="socials" style={{ marginTop: '20px' }}>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="Instagram">
                ◎
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Studio</h4>
            <Link href="#services">Services</Link>
            <Link href="#process">Process</Link>
            <Link href="#who">Who it&apos;s for</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:ralshadigitalai@gmail.com">
              ralshadigitalai@gmail.com
            </a>
            <a href="#">Hyderabad, India</a>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 Ralsha Digital &amp; AI Solutions. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
