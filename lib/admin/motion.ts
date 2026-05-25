/** Shared motion tokens for admin shell — respects reduced motion at call sites */

export const adminEase = [0.22, 1, 0.36, 1] as const;

export const adminDuration = {
  instant: 0,
  fast: 0.18,
  base: 0.28,
  slow: 0.38,
} as const;

export const adminPageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

export const adminFadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export const adminScaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
};

export const adminStaggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
};

export const adminStaggerItem = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: adminDuration.base, ease: adminEase },
  },
};

export function adminTransition(
  reduced: boolean | null,
  duration: number = adminDuration.base
) {
  return {
    duration: reduced ? adminDuration.instant : duration,
    ease: adminEase,
  };
}
