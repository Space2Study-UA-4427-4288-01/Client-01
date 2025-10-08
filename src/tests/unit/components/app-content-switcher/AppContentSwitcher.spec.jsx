import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const switchOptions = {
  left: {
    text: 'Left Option',
    tooltip: 'Left Tooltip'
  },
  right: {
    text: 'Right Option',
    tooltip: 'Right Tooltip'
  }
}

const user = userEvent.setup()
const handleChange = vi.fn()

describe('AppContentSwitcher', () => {
  beforeEach(() => {
    render(
      <AppContentSwitcher
        active
        onChange={handleChange}
        switchOptions={switchOptions}
        typographyVariant='body1'
      />
    )
  })

  it('should render with the correct props', () => {
    expect(screen.getByText('Left Option')).toBeInTheDocument()
    expect(screen.getByText('Right Option')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', async () => {
    const switchElement = screen.getByRole('checkbox')
    await user.click(switchElement)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should renders tooltips when tooltip props are passed', async () => {
    await user.hover(screen.getByText('Left Option'))
    expect(await screen.findByText('Left Tooltip')).toBeInTheDocument()

    await user.unhover(screen.getByText('Left Option'))
    expect(screen.getByText('Left Tooltip')).not.toBeVisible()

    await user.hover(screen.getByText('Right Option'))
    expect(await screen.findByText('Right Tooltip')).toBeInTheDocument()

    await user.unhover(screen.getByText('Right Option'))
    expect(screen.getByText('Right Tooltip')).not.toBeVisible()
  })
})
