import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { mockObjects } from './mocks/objects';
import { mockGames } from './mocks/games';
import { mockSettings } from './mocks/settings';
import { mockWishlistItems } from './mocks/wishlist';
import './mocks/resize-observer';
import './mocks/match-media';

// Mocks des fichiers JSON
vi.mock('@/data/objects.json', () => ({
  default: mockObjects,
}));

vi.mock('@/data/games.json', () => ({
  default: mockGames,
}));

vi.mock('@/data/settings.json', () => ({
  default: mockSettings,
}));

// Mock de sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Nettoyer automatiquement après chaque test
afterEach(() => {
  cleanup();
});
