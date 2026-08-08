// No explicit type import for ScrollRevealObjectOptions

export function srConfig(
  delay: number = 200,
  viewFactor?: number
) {
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const resolvedViewFactor = viewFactor ?? (mobile ? 0.15 : 0.20);
  return {
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: resolvedViewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  };
} 