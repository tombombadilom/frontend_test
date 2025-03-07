import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/stores/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "L'adresse e-mail est requise")
      .email('Adresse e-mail invalide'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z
      .string()
      .min(1, 'La confirmation du mot de passe est requise'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, error, isLoading, clearError } = useAuth();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      clearError();
      await registerUser(data.email, data.password);
      toast.success('Compte créé avec succès');
      navigate('/login');
    } catch (_err) {
      toast.error(error || "Une erreur s'est produite lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-background">
      <div className="w-[400px] p-8 bg-card rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Créer un compte</h1>
          <p className="text-muted-foreground">Inscrivez-vous pour commencer</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse e-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="vous@exemple.com"
                      {...field}
                    />
                  </FormControl>
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || form.formState.isSubmitting}
            >
              {isLoading ? 'Inscription...' : "S'inscrire"}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm mt-4">
          <span className="text-muted-foreground">Déjà un compte ?</span>{' '}
          <Button
            variant="link"
            className="px-2 font-semibold"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
}
