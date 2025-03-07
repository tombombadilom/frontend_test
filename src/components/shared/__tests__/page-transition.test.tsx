import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import type { MotionProps } from '../../../types/test-utils';
import { PageTransition } from '../page-transition';

// Mock motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: MotionProps) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('PageTransition', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <PageTransition>
          <p>Test content</p>
        </PageTransition>
      </BrowserRouter>
    );

    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PageTransition className="custom-class">
          <p>Test content</p>
        </PageTransition>
      </BrowserRouter>
    );

    const motionDiv = getByTestId('motion-div');
    expect(motionDiv.className).toContain('custom-class');
  });
});
