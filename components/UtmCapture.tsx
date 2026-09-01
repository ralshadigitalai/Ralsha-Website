'use client';

import { useEffect, useRef } from 'react';
import { captureLandingAttribution } from '@/lib/utm';

export default function UtmCapture() {
  const hasCapturedRef = useRef(false);

  useEffect(() => {
    if (hasCapturedRef.current) return;
    hasCapturedRef.current = true;
    captureLandingAttribution();
  }, []);

  return null;
}
