import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { MotionProps } from '../../../types/test-utils';
import { FadeIn, FadeInOut } from '../animations';

// Mock motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: MotionProps) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="animate-presence">{children}</div>
  ),
}));

describe('Animation Components', () => {
  it('renders FadeIn component', () => {
    render(<FadeIn>Test Content</FadeIn>);
    expect(screen.getByTestId('motion-div')).toHaveTextContent('Test Content');
  });

  it('renders FadeInOut component', () => {
    render(<FadeInOut>Test Content</FadeInOut>);
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    expect(screen.getByTestId('motion-div')).toHaveTextContent('Test Content');
  });
});
