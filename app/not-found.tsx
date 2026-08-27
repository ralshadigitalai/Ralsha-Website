import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#060d20',
        color: '#ffffff',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '72px',
          marginBottom: '16px',
          color: '#f5871f',
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '24px',
          marginBottom: '16px',
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          maxWidth: '420px',
          marginBottom: '32px',
          color: '#93a0c4',
          lineHeight: 1.6,
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
