'use client';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AnimatedScrollToTop } from '../animated-scroll-to-top';

interface MotionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  'aria-label': string;
  [key: string]: unknown;
}

interface AnimatePresenceProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

// Mock motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className, 'aria-label': ariaLabel, ...props }: MotionButtonProps) => (
      <button
        data-testid="motion-button"
        onClick={onClick}
        className={className}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: AnimatePresenceProps) => children,
}));

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

describe('AnimatedScrollToTop', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
  });

  it('is hidden at the top of the page', () => {
    render(<AnimatedScrollToTop />);
    expect(screen.queryByRole('button', { name: /Retour en haut/i })).not.toBeInTheDocument();
  });

  it('becomes visible when scrolled beyond threshold', () => {
    render(<AnimatedScrollToTop />);
    window.scrollY = 400;
    fireEvent.scroll(window);

    expect(screen.getByRole('button', { name: /Retour en haut/i })).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    render(<AnimatedScrollToTop />);
    window.scrollY = 400;
    fireEvent.scroll(window);

    const button = screen.getByRole('button', { name: /Retour en haut/i });
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('respects custom threshold', () => {
    render(<AnimatedScrollToTop threshold={500} />);
    window.scrollY = 400;
    fireEvent.scroll(window);

    expect(screen.queryByRole('button', { name: /Retour en haut/i })).not.toBeInTheDocument();

    window.scrollY = 600;
    fireEvent.scroll(window);

    expect(screen.getByRole('button', { name: /Retour en haut/i })).toBeInTheDocument();
  });
});
