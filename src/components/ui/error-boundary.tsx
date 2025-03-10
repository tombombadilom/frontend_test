'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-game-primary">Une erreur est survenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {this.state.error?.message || "Une erreur inattendue s'est produite."}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    this.setState({ hasError: false });
                    window.location.reload();
                  }}
                >
                  Réessayer
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      );
    }

    return this.props.children;
  }
} 