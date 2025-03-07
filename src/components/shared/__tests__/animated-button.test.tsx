'use client';

import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ButtonProps } from '@/components/ui/button';
import { AnimatedButton } from '../animated-button';

// Mock motion
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('AnimatedButton', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<AnimatedButton>Click me</AnimatedButton>);

    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('passes props to Button component', () => {
    const { getByRole } = render(
      <AnimatedButton variant="outline" size="lg">
        Click me
      </AnimatedButton>
    );

    const button = getByRole('button');
    expect(button).toHaveClass('inline-flex');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();

    const { getByRole } = render(
      <AnimatedButton onClick={handleClick}>Click me</AnimatedButton>
    );

    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
