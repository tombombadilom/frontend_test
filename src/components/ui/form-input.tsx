import * as React from 'react';
import { Input } from './input';

interface FormInputProps extends React.ComponentProps<'input'> {
  error?: string;
}

export function FormInput({ error, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <Input
        className={`${className} ${error ? 'border-destructive' : ''}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
} 