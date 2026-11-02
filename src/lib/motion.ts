/** Shared motion language: slow, smooth, restrained. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: EASE } },
};
