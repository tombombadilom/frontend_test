import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AnimatedCard } from '../animated-card';

interface MotionDivProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Mock motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: MotionDivProps) => (
      <div data-testid="motion-div" className={className} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('AnimatedCard', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <AnimatedCard>
        <p>Test content</p>
      </AnimatedCard>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <AnimatedCard className="custom-class">
        <p>Test content</p>
      </AnimatedCard>
    );

    const motionDiv = getByTestId('motion-div');
    expect(motionDiv.className).toContain('custom-class');
  });

  it('applies default classes', () => {
    const { getByTestId } = render(
      <AnimatedCard>
        <p>Test content</p>
      </AnimatedCard>
    );

    const motionDiv = getByTestId('motion-div');
    expect(motionDiv.className).toContain('rounded-lg');
    expect(motionDiv.className).toContain('border');
    expect(motionDiv.className).toContain('bg-card');
  });
});
