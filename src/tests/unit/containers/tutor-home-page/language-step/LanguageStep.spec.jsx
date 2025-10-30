import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

vi.mock('@emotion/react', () => ({
  useTheme: () => ({
    breakpoints: { down: () => '(max-width:600px)' }
  })
}))

vi.mock('~/context/step-context', () => ({
  useStepContext: () => ({
    handleStepData: vi.fn()
  })
}))

const setup = () => {
  render(<LanguageStep btnsBox={<div>Buttons</div>} />)
  const input = screen.getByRole('combobox')
  return { input }
}

const openAutocomplete = async (input) => {
  await userEvent.click(input)
  const listbox = await screen.findByTestId('lang-listbox')

  Object.defineProperty(listbox, 'scrollTop', { value: 1000, writable: true })
  Object.defineProperty(listbox, 'clientHeight', { value: 200, writable: true })
  Object.defineProperty(listbox, 'scrollHeight', {
    value: 1000,
    writable: true
  })

  return listbox
}

describe('LanguageStep component', () => {
  it('should render without crashing', async () => {
    await waitFor(() => setup())
    expect(screen.getByTestId('lang-step-heading')).toBeInTheDocument()
  })

  it('should render first 6 languages by default', async () => {
    const { input } = setup()
    await openAutocomplete(input)

    const options = await screen.findAllByTestId('lang-option')
    expect(options).toHaveLength(6)
    expect(options[0]).toHaveTextContent('English')
  })

  it('should filter languages based on search input', async () => {
    const { input } = setup()
    await userEvent.type(input, 'sp')

    expect(await screen.findByText('Spanish')).toBeInTheDocument()
    expect(screen.queryByText('English')).not.toBeInTheDocument()
  })

  it('should load more languages on scroll when hasMore is true', async () => {
    const { input } = setup()
    const listbox = await openAutocomplete(input)

    let options = await screen.findAllByTestId('lang-option')
    expect(options.length).toBe(6)

    fireEvent.scroll(listbox)

    await waitFor(async () => {
      options = await screen.findAllByTestId('lang-option')
      expect(options.length).toBeGreaterThan(6)
    })
  })

  it('should not load more when all data loaded (hasMore = false)', async () => {
    const { input } = setup()
    await userEvent.type(input, 'f')

    const itemsBefore = await screen.findAllByRole('option')
    expect(itemsBefore).toHaveLength(2)

    const listbox = await openAutocomplete(input)

    fireEvent.scroll(listbox)

    const itemsAfter = await screen.findAllByRole('option')
    expect(itemsAfter).toHaveLength(2)
  })
})
