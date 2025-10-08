import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce:
    (callback) =>
    (...args) => {
      callback(...args)
    }
}))

vi.mock('~/utils/range-filter', () => ({
  checkNumberIsInRange: ({ inputValue, min, max }) => {
    if (inputValue === null || inputValue === undefined) return min
    return Math.min(Math.max(Number(inputValue), min), max)
  },
  createMarks: (min, max) => [
    { value: min, label: min.toString() },
    { value: max, label: max.toString() }
  ]
}))

vi.mock('~/assets/img/find-offer/currency_uah.svg', () => ({
  default: 'mocked-currency-icon'
}))

describe('SliderWithInput', () => {
  const defaultProps = {
    defaultValue: 50,
    max: 100,
    min: 0,
    onChange: vi.fn(),
    title: 'Test Slider'
  }

  let renderResult

  beforeEach(() => {
    vi.clearAllMocks()
    renderResult = render(
      <SliderWithInput {...defaultProps} />
    )
  })

  it('should render correctly', () => {
    const { getByText, getByRole } = renderResult
    )

    expect(getByText('Test Slider')).toBeInTheDocument()
    expect(getByRole('slider')).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    const { getByRole } = renderResult
    const slider = getByRole('slider')

    fireEvent.change(slider, { target: { value: '75' } })

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(75)
    })
  })

  it('should update inputValue correctly when input value is empty', () => {
    const { getByRole } = renderResult
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: '' } })

    expect(input.value).toBe('')

    fireEvent.blur(input)

    expect(input.value).toBe('0')
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderResult
    const input = getByRole('textbox')

    await user.clear(input)
    await user.type(input, '50')

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(50)
    })

    vi.clearAllMocks()

    await user.tab()

    expect(defaultProps.onChange).not.toHaveBeenCalled()
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    const { getByRole } = renderResult
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: '150' } })

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(100)
    })

    fireEvent.blur(input)

    expect(input.value).toBe('100')
  })

  it('should handle input change with valid number', async () => {
    const { getByRole } = renderResult
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: '75' } })

    expect(input.value).toBe('75')

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(75)
    })
  })

  it('should constrain input value to min when below minimum', async () => {
    const { getByRole } = renderResult
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: '-10' } })

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(0)
    })

    fireEvent.blur(input)

    expect(input.value).toBe('0')
  })

  it('should handle slider change with array value', () => {
    const { getByRole } = renderResult
    const slider = getByRole('slider')

    fireEvent.change(slider, { target: { value: [25, 75] } })

    expect(defaultProps.onChange).not.toHaveBeenCalled()
  })
})
