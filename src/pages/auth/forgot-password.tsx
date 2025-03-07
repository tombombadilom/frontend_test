'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalide'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      // In a real application, this would make an API request
      showToast.success(
        `Instructions of reset sent to ${data.email}`
      );
      setIsSubmitted(true);
    } catch (_error) {
      showToast.error('Une erreur est survenue');
    }
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Mot de passe oublié</h1>
          <p className="text-muted-foreground">
            Entrez votre adresse email pour recevoir les instructions de
            réinitialisation
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-900/20">
            <h2 className="mb-2 text-lg font-medium text-green-800 dark:text-green-200">
              Email sent!
            </h2>
            <p className="mb-4 text-sm text-green-700 dark:text-green-300">
              If an account exists with this email address, you will receive a reset link.
            </p>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                Back to login
              </Button>
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="exemple@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll send you instructions to reset your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send instructions'}
              </Button>

              <div className="text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
