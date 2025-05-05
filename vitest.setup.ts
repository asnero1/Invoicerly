import '@testing-library/jest-dom'
import { vi } from 'vitest'
import type { vi as viType } from 'vitest'

// Extend globalThis with vi (no circular typing)
declare global {
  // eslint-disable-next-line no-var
  var vi: typeof viType
  interface Window {
    vi: typeof viType
  }
}

globalThis.vi = vi
