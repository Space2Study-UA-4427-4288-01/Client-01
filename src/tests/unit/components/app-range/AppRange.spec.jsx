import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AppRange from '~/components/app-range/AppRange'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

vi.mock('~/hooks/use-debounce', () => ({
  useDebounce: (fn) => fn
}))

describe('AppRange', () => {
  const min = 0
  const max = 100
  let onChange

  const setup = (props = {}) => {
    return render(
      <AppRange max={max} min={min} onChange={onChange} {...props} />
    )
  }

  beforeEach(() => {
    onChange = vi.fn()
  })

  it('should render correctly', () => {
    setup()

    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)
  })

  it('should call onChange when slider is moved', () => {
    setup()

    const sliders = screen.getAllByRole('slider')
    fireEvent.change(sliders[0], { target: { value: 50 } })

    expect(onChange).toHaveBeenCalled()
  })

  it('should call onChange when input is changed', () => {
    setup()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '10' } })

    expect(onChange).toHaveBeenCalled()
  })

  it('should not call onChange when input is not a number', () => {
    setup()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'abc' } })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call onChange with min number if input is empty', () => {
    setup()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '' } })
    fireEvent.blur(inputs[0])

    expect(onChange).toHaveBeenCalled()
  })

  it('should update prices when blurred and input is greater than max', () => {
    setup()

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[1], { target: { value: '150' } })
    fireEvent.blur(inputs[1])

    expect(onChange).toHaveBeenCalled()
  })

  it('should not update prices when blurred but value has not changed', () => {
    setup({ value: [10, 20] })

    const inputs = screen.getAllByRole('textbox')
    fireEvent.blur(inputs[0])

    expect(onChange).not.toHaveBeenCalled()
  })
})
