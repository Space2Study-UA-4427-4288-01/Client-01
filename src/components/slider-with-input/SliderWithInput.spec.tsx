import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (cb: (...args: any[]) => void) => cb
}))

vi.mock('~/assets/img/find-offer/currency_uah.svg', () => ({ default: 'uah.svg' }))

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
        title={defaultProps.title}
        defaultValue={defaultProps.defaultValue}
        min={defaultProps.min}
        max={defaultProps.max}
        onChange={onChange}
      />
    )

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe(String(defaultProps.defaultValue))
  })

  it('should call onChange when slider is moved', () => {
    render(
      <SliderWithInput
        title={defaultProps.title}
        defaultValue={defaultProps.defaultValue}
        min={defaultProps.min}
        max={defaultProps.max}
        onChange={onChange}
      />
    )

    const slider = screen.getByRole('slider') as HTMLInputElement
    fireEvent.change(slider, { target: { value: '30' } })

    expect(onChange).toHaveBeenCalledWith(30)
  })

  it('should update inputValue correctly when input value is empty', () => {
    render(
      <SliderWithInput
        title={defaultProps.title}
        defaultValue={defaultProps.defaultValue}
        min={defaultProps.min}
        max={defaultProps.max}
        onChange={onChange}
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: '' } })

    expect(input.value).toBe('')
    expect(onChange).toHaveBeenCalledWith(defaultProps.min)
  })

  it('should not update prices when input is blurred and value has not changed', () => {
    render(
      <SliderWithInput
        title={defaultProps.title}
        defaultValue={defaultProps.defaultValue}
        min={defaultProps.min}
        max={defaultProps.max}
        onChange={onChange}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.blur(input)

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should update prices when input is blurred and input is greater than max value', () => {
    render(
      <SliderWithInput
        title={defaultProps.title}
        defaultValue={defaultProps.defaultValue}
        min={defaultProps.min}
        max={defaultProps.max}
        onChange={onChange}
      />
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: String(defaultProps.max + 50) } })

    expect(onChange).toHaveBeenCalledWith(defaultProps.max)

    fireEvent.blur(input)
    expect(input.value).toBe(String(defaultProps.max))
  })
})
