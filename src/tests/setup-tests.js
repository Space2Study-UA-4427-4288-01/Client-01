import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str
    }
  }
}))

if (!globalThis.URL) {
  globalThis.URL = {}
}
Object.defineProperty(globalThis.URL, 'createObjectURL', {
  value: vi.fn(() => 'blob://fake'),
  writable: true
})
Object.defineProperty(globalThis.URL, 'revokeObjectURL', {
  value: vi.fn(() => {}),
  writable: true
})
