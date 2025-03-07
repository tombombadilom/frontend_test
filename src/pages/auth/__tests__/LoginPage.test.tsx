import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';

describe('LoginPage', () => {
  it('affiche le titre', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /bienvenue/i })).toBeInTheDocument();
  });

  it('affiche le formulaire', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('textbox', { name: /adresse e-mail/i })).toBeInTheDocument();
  });

  it('affiche le bouton', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
  });
});
