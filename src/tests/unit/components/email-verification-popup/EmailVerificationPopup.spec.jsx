import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import EmailVerificationPopup from '~/components/email-verification-popup/EmailVerificationPopup'

const mockOnClose = vi.fn()
const mockOnGoToLogin = vi.fn()

const props = {
  open: true,
  onClose: mockOnClose,
  onGoToLogin: mockOnGoToLogin
}

const translations = {
  SUCCESS_MESSAGE: 'Your email has been successfully verified!',
  GO_TO_LOGIN: 'Go to login'
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const translationMap = {
        'modals.emailConfirm': translations.SUCCESS_MESSAGE,
        'button.goToLogin': translations.GO_TO_LOGIN
      }
      return translationMap[key] || key
    }
  })
}))

const renderEmailVerificationPopup = (customProps = {}) =>
  render(<EmailVerificationPopup {...props} {...customProps} />)

describe('EmailVerificationPopup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when open is true', () => {
    renderEmailVerificationPopup()

    expect(screen.getByText(translations.SUCCESS_MESSAGE)).toBeInTheDocument()
    expect(screen.getByText(translations.GO_TO_LOGIN)).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    expect(screen.getByTestId('go-to-login-button')).toBeInTheDocument()
  })

  it('should not render when open is false', () => {
    renderEmailVerificationPopup({ open: false })

    expect(
      screen.queryByText(translations.SUCCESS_MESSAGE)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(translations.GO_TO_LOGIN)).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    renderEmailVerificationPopup()

    const closeButton = screen.getByTestId('close-button')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onGoToLogin when go to login button is clicked', () => {
    renderEmailVerificationPopup()

    const goToLoginButton = screen.getByTestId('go-to-login-button')
    fireEvent.click(goToLoginButton)

    expect(mockOnGoToLogin).toHaveBeenCalledTimes(1)
  })

  it('should display success icon', () => {
    renderEmailVerificationPopup()

    const successIcon = screen.getByAltText('Email verification success icon')
    expect(successIcon).toBeInTheDocument()
    expect(successIcon).toHaveAttribute('src')
  })

  it('should not close popup when clicking on backdrop', () => {
    renderEmailVerificationPopup()

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    const backdrop = document.querySelector('.MuiBackdrop-root')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should call onClose when Escape key is pressed', () => {
    renderEmailVerificationPopup()

    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should have proper accessibility attributes', () => {
    renderEmailVerificationPopup()

    const closeButton = screen.getByTestId('close-button')
    expect(closeButton).toHaveAttribute(
      'aria-label',
      'Close email verification popup'
    )
  })

  it('should have proper Dialog configuration', () => {
    renderEmailVerificationPopup()

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveClass('MuiDialog-paper')
  })
})
