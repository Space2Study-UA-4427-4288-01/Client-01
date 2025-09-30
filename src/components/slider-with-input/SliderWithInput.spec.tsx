import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (cb: (...args: unknown[]) => void) => cb
}))

vi.mock('~/assets/img/find-offer/currency_uah.svg', () => ({ 
  default: 'uah.svg' 
}))

describe('SliderWithInput', () => {
  const defaultProps = {
    title: 'Price',
    defaultValue: 50,
    min: 0,
    max: 100
  }

  let onChange: (value: number) => void

  beforeEach(() => {
    onChange = vi.fn()
  })

  it('should render correctly', () => {
    render(
      <SliderWithInput
        defaultValue={defaultProps.defaultValue}
        max={defaultProps.max}
        min={defaultProps.min}
        onChange={onChange}
        title={defaultProps.title}
      />
    )

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue(String(defaultProps.defaultValue))
  })

  it('should call onChange when slider is moved', () => {
    render(
      <SliderWithInput
        defaultValue={defaultProps.defaultValue}
        max={defaultProps.max}
        min={defaultProps.min}
        onChange={onChange}
        title={defaultProps.title}
      />
    )

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '30' } })

    expect(onChange).toHaveBeenCalledWith(30)
  })

  it('should update inputValue correctly when input value is empty', () => {
    render(
      <SliderWithInput
        defaultValue={defaultProps.defaultValue}
        max={defaultProps.max}
        min={defaultProps.min}
        onChange={onChange}
        title={defaultProps.title}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '' } })

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(defaultProps.min)
  })

  it('should not update prices when input is blurred and value has not changed', () => {
    render(
      <SliderWithInput
        defaultValue={defaultProps.defaultValue}
        max={defaultProps.max}
        min={defaultProps.min}
        onChange={onChange}
        title={defaultProps.title}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.blur(input)

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should update prices when input is blurred and input is greater than max value', () => {
    render(
      <SliderWithInput
        defaultValue={defaultProps.defaultValue}
        max={defaultProps.max}
        min={defaultProps.min}
        onChange={onChange}
        title={defaultProps.title}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { 
      target: { value: String(defaultProps.max + 50) } 
    })

    expect(onChange).toHaveBeenCalledWith(defaultProps.max)

    fireEvent.blur(input)
    expect(input.value).toBe(String(defaultProps.max))
  })
})
