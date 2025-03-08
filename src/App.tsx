import AppRouter from './Routes';
import { AuthProvider } from './contexts/auth-context';

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
