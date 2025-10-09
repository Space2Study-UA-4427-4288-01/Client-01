import { describe, it, expect, vi, afterEach } from 'vitest'

const loadClient = async (baseURL) => {
  vi.resetModules()
  if (baseURL === undefined) delete process.env.VITE_API_BASE_PATH
  else process.env.VITE_API_BASE_PATH = baseURL
  const mod = await import('~/plugins/axiosClient')
  return mod.axiosClient
}

afterEach(() => {
  vi.clearAllMocks()
})

describe('axiosClient', () => {
  it('sets baseURL from VITE_API_BASE_PATH', async () => {
    const client = await loadClient('https://api.example.com')
    expect(client.defaults.baseURL).toBe('https://api.example.com')
  })

  it('enables withCredentials', async () => {
    const client = await loadClient('http://localhost')
    expect(client.defaults.withCredentials).toBe(true)
  })

  it('serializes arrays with repeat and encodes values only', async () => {
    const client = await loadClient()
    const query = client.defaults.paramsSerializer({
      category: ['math & logic', 'cs'],
      q: 'A&B'
    })
    expect(query).toBe('category=math%20%26%20logic&category=cs&q=A%26B')
  })

  it('does not encode keys, only values when serializing', async () => {
    const client = await loadClient()
    const query = client.defaults.paramsSerializer({
      'cat[]': 'x y'
    })
    expect(query).toContain('cat[]=')
    expect(query).toContain('x%20y')
  })
})
