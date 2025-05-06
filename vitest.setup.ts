import '@testing-library/jest-dom';
import { vi as vitestVi } from 'vitest';

// Extend globalThis to recognize `vi` mock utility
declare global {
  var vi: typeof vitestVi;
  interface Window {
    vi: typeof vitestVi;
  }
}

globalThis.vi = vitestVi;
