import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import InfoPopup from '~/components/info-popup/InfoPopup'

vi.mock('~/assets/img/guest-home-page/info.svg', () => ({
  default: 'mocked-info-icon.svg'
}))

const TEST_CONSTANTS = {
  TITLE: 'Your email address needs to be verified',
  OK_BUTTON: 'OK',
  CLOSE_BUTTON_TEST_ID: 'close-button',
  OK_BUTTON_TEST_ID: 'ok-button',
  INFO_ICON_ALT: 'info',
  TEST_EMAIL: 'test@example.com',
  JOHN_EMAIL: 'john.due@gmail.com',
  USER_EMAIL: 'user@domain.com'
}

const mockOnClose = vi.fn()

const defaultProps = {
  open: true,
  onClose: mockOnClose,
  email: TEST_CONSTANTS.TEST_EMAIL
}

describe('InfoPopup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when open is true', () => {
    render(<InfoPopup {...defaultProps} />)

    expect(screen.getByText(TEST_CONSTANTS.TITLE)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.TEST_EMAIL)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.OK_BUTTON)).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.OK_BUTTON_TEST_ID)
    ).toBeInTheDocument()
  })

  it('should not render when open is false', () => {
    render(<InfoPopup {...defaultProps} open={false} />)

    expect(screen.queryByText(TEST_CONSTANTS.TITLE)).not.toBeInTheDocument()
  })

  it('should display email when provided', () => {
    render(<InfoPopup {...defaultProps} email={TEST_CONSTANTS.JOHN_EMAIL} />)

    expect(screen.getByText(TEST_CONSTANTS.JOHN_EMAIL)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.JOHN_EMAIL)).toHaveStyle(
      'font-weight: 500'
    )
  })

  it('should not display email when not provided', () => {
    render(<InfoPopup {...defaultProps} email={undefined} />)

    expect(
      screen.queryByText(TEST_CONSTANTS.TEST_EMAIL)
    ).not.toBeInTheDocument()
    expect(
      screen.getByText(/We sent a confirmation email to:/)
    ).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(<InfoPopup {...defaultProps} />)

    const closeButton = screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when OK button is clicked', () => {
    render(<InfoPopup {...defaultProps} />)

    const okButton = screen.getByTestId(TEST_CONSTANTS.OK_BUTTON_TEST_ID)
    fireEvent.click(okButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should display info icon', () => {
    render(<InfoPopup {...defaultProps} />)

    const infoIcon = screen.getByAltText(TEST_CONSTANTS.INFO_ICON_ALT)
    expect(infoIcon).toBeInTheDocument()
    expect(infoIcon).toHaveAttribute('src')
  })

  it('should not close popup when clicking on backdrop', () => {
    render(<InfoPopup {...defaultProps} />)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should handle escape key through MUI Dialog', () => {
    render(<InfoPopup {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    expect(dialog).toHaveClass('MuiDialog-paper')
  })

  it('should have proper accessibility attributes', () => {
    render(<InfoPopup {...defaultProps} />)

    const closeButton = screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    const okButton = screen.getByTestId(TEST_CONSTANTS.OK_BUTTON_TEST_ID)

    expect(closeButton).toHaveAttribute('aria-label', 'Close info popup')
    expect(okButton).toHaveAttribute('aria-label', 'Close popup and continue')
  })

  it('should have proper Dialog configuration', () => {
    render(<InfoPopup {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog.closest('[role="dialog"]')).toBeInTheDocument()
  })

  it('should render with different email addresses', () => {
    render(<InfoPopup {...defaultProps} email={TEST_CONSTANTS.USER_EMAIL} />)

    expect(screen.getByText(TEST_CONSTANTS.USER_EMAIL)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.USER_EMAIL)).toHaveStyle(
      'font-weight: 500'
    )
  })

  it('should handle empty email gracefully', () => {
    render(<InfoPopup {...defaultProps} email='' />)

    expect(
      screen.getByText(/We sent a confirmation email to:/)
    ).toBeInTheDocument()

    expect(screen.queryByText(/@/)).not.toBeInTheDocument()
  })
})
