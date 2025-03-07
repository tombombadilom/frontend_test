import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from '../RegisterPage';

describe('RegisterPage', () => {
  it('affiche le titre', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { name: /créer un compte/i })).toBeInTheDocument();
  });

  it('affiche le formulaire', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('textbox', { name: /adresse e-mail/i })).toBeInTheDocument();
  });

  it('affiche le bouton', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
  });
});
