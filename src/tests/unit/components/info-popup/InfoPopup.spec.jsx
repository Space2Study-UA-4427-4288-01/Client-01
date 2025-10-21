import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import InfoPopup from '~/components/info-popup/InfoPopup'

vi.mock('~/assets/img/guest-home-page/info.svg', () => ({
  default: 'mocked-info-icon.svg'
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translations = {
        'signup.confirmEmailTitle': 'Your email address needs to be verified',
        'signup.confirmEmailMessage': 'We sent a confirmation email to: ',
        'signup.confirmEmailDesc':
          ' Check your email and click on the confirmation button to continue.',
        'common.confirmButton': 'OK'
      }
      return translations[key] || key
    }
  })
}))

describe('InfoPopup test', () => {
  const onClose = vi.fn()
  const props = {
    open: true,
    onClose,
    email: 'test@example.com'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render popup with email', () => {
    render(<InfoPopup {...props} />)

    expect(
      screen.getByText('Your email address needs to be verified')
    ).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    expect(screen.getByTestId('ok-button')).toBeInTheDocument()
  })

  it('should not render when open is false', () => {
    render(<InfoPopup {...props} open={false} />)

    expect(
      screen.queryByText('Your email address needs to be verified')
    ).not.toBeInTheDocument()
  })

  it('should display different email addresses', () => {
    render(<InfoPopup {...props} email='user@example.com' />)

    expect(screen.getByText('user@example.com')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(<InfoPopup {...props} />)

    const closeButton = screen.getByTestId('close-button')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when OK button is clicked', () => {
    render(<InfoPopup {...props} />)

    const okButton = screen.getByTestId('ok-button')
    fireEvent.click(okButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should have info icon', () => {
    render(<InfoPopup {...props} />)

    const icon = screen.getByAltText('info')

    expect(icon).toBeInTheDocument()
  })

  it('should not close when clicking on backdrop', () => {
    render(<InfoPopup {...props} />)

    const backdrop = document.querySelector('.MuiBackdrop-root')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should call onClose when Escape key is pressed', () => {
    render(<InfoPopup {...props} />)

    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
