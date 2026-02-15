export const getTransitions = (delay?: number) => ({
  transition: { duration: 0.5, delay },
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 },
});

// Animation pour les sections qui apparaissent au scroll
export const getSectionTransitions = (delay?: number) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: delay || 0, ease: 'easeOut' },
});
