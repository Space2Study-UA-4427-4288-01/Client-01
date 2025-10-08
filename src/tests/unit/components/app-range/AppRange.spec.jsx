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

  beforeEach(() => {
    onChange = vi.fn()
  })

  it('should render correctly', () => {
    render(<AppRange min={min} max={max} onChange={onChange} />)

    const sliders = screen.getAllByRole('slider')
    expect(sliders).toHaveLength(2)

    const inputs = screen.getAllByRole('textbox')
    expect(inputs).toHaveLength(2)
  })

  it('should call onChange when slider is moved', () => {
    render(<AppRange min={min} max={max} onChange={onChange} />)

    const sliders = screen.getAllByRole('slider')
    fireEvent.change(sliders[0], { target: { value: 50 } })

    expect(onChange).toHaveBeenCalled()
  })

  it('should call onChange when input is changed', () => {
    render(<AppRange min={min} max={max} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '10' } })

    expect(onChange).toHaveBeenCalled()
  })

  it('should not call onChange when input is not a number', () => {
    render(<AppRange min={min} max={max} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: 'abc' } })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('should call onChange with min number if input is empty', () => {
    render(<AppRange min={min} max={max} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '' } })
    fireEvent.blur(inputs[0])

    expect(onChange).toHaveBeenCalled()
  })

  it('should update prices when blurred and input is greater than max', () => {
    render(<AppRange min={min} max={max} onChange={onChange} />)

    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[1], { target: { value: '150' } })
    fireEvent.blur(inputs[1])

    expect(onChange).toHaveBeenCalled()
  })

  it('should not update prices when blurred but value has not changed', () => {
    render(
      <AppRange min={min} max={max} value={[10, 20]} onChange={onChange} />
    )

    const inputs = screen.getAllByRole('textbox')
    fireEvent.blur(inputs[0])

    expect(onChange).not.toHaveBeenCalled()
  })
})
