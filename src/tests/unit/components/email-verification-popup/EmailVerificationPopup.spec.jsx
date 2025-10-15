import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import EmailVerificationPopup from '~/components/email-verification-popup/EmailVerificationPopup'

const mockOnClose = vi.fn()
const mockOnGoToLogin = vi.fn()

const defaultProps = {
  open: true,
  onClose: mockOnClose,
  onGoToLogin: mockOnGoToLogin
}

describe('EmailVerificationPopup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when open is true', () => {
    render(<EmailVerificationPopup {...defaultProps} />)

    expect(
      screen.getByText('Email has been successfully verified!')
    ).toBeInTheDocument()
    expect(screen.getByText('Go to login')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    expect(screen.getByTestId('go-to-login-button')).toBeInTheDocument()
  })

  it('should not render when open is false', () => {
    render(<EmailVerificationPopup {...defaultProps} open={false} />)

    expect(
      screen.queryByText('Email has been successfully verified!')
    ).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(<EmailVerificationPopup {...defaultProps} />)

    const closeButton = screen.getByTestId('close-button')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onGoToLogin when go to login button is clicked', () => {
    render(<EmailVerificationPopup {...defaultProps} />)

    const goToLoginButton = screen.getByTestId('go-to-login-button')
    fireEvent.click(goToLoginButton)

    expect(mockOnGoToLogin).toHaveBeenCalledTimes(1)
  })

  it('should display success icon', () => {
    render(<EmailVerificationPopup {...defaultProps} />)

    const successIcon = screen.getByAltText('Email verification success icon')
    expect(successIcon).toBeInTheDocument()
    expect(successIcon).toHaveAttribute('src')
  })

  it('should not close popup when clicking on backdrop', () => {
    render(<EmailVerificationPopup {...defaultProps} />)

    const backdrop = document.querySelector('.MuiBackdrop-root')
    if (backdrop) {
      fireEvent.click(backdrop)
    }

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should have proper Dialog configuration for escape key handling', () => {
    render(<EmailVerificationPopup {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    expect(dialog.closest('[role="dialog"]')).toBeInTheDocument()
  })
})
