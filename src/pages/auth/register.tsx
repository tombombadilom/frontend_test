'use client';

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from '@/hooks/use-auth';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { motion } from 'motion/react';

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
      .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" })
      .regex(
        /^[a-zA-Z0-9\s\-']+$/,
        { message: "Le nom contient des caractères invalides" }
      ),
    email: z
      .string()
      .min(1, { message: "L'email est requis" })
      .email({ message: "Format d'email invalide" })
      .max(100, { message: "L'email ne peut pas dépasser 100 caractères" }),
    password: z
      .string()
      .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" })
      .max(100, { message: "Le mot de passe ne peut pas dépasser 100 caractères" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        { message: "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre" }
      ),
    confirmPassword: z
      .string()
      .min(6, { message: "La confirmation du mot de passe est requise" }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Sanitize inputs
      const sanitizedName = values.name.trim();
      const sanitizedEmail = values.email.trim().toLowerCase();

      const result = await registerUser({
        name: sanitizedName,
        email: sanitizedEmail,
        password: values.password,
      });

      if (result.success) {
        showToast.success('Compte créé avec succès');
        navigate('/');
      } else {
        showToast.error(result.error || "L'inscription a échoué");
      }
    } catch (_error) {
      showToast.error('Une erreur est survenue');
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="space-y-2 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold"
          >
            Créer un compte
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            Entrez vos informations pour créer un compte
          </motion.p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    C'est votre nom public qui sera affiché.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Nous ne partagerons jamais votre email avec qui que ce soit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Doit contenir au moins 6 caractères avec une majuscule, une minuscule et un chiffre.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Entrez à nouveau votre mot de passe pour confirmer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      J'accepte les{' '}
                      <Link
                        to="/terms"
                        className="text-primary hover:underline"
                      >
                        conditions d'utilisation
                      </Link>
                    </FormLabel>
                    <FormDescription>
                      Vous devez accepter nos conditions d'utilisation pour créer un compte.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Création en cours...' : 'Créer un compte'}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Se connecter
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
