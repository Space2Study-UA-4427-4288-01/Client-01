import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import InfoPopup from '~/components/info-popup/InfoPopup'

const mockOnClose = vi.fn()

const defaultProps = {
  message: 'Test message',
  onClose: mockOnClose,
  open: true,
  title: 'Test Title'
}

describe('InfoPopup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when open is true', () => {
    render(<InfoPopup {...defaultProps} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test message')).toBeInTheDocument()
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
  })

  it('should not render when open is false', () => {
    render(<InfoPopup {...defaultProps} open={false} />)

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Test message')).not.toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    render(<InfoPopup {...defaultProps} />)

    const closeButton = screen.getByTestId('close-button')
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when OK button is clicked', () => {
    render(<InfoPopup {...defaultProps} />)

    const okButton = screen.getByTestId('ok-button')
    fireEvent.click(okButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should display info icon', () => {
    render(<InfoPopup {...defaultProps} />)

    const infoIcon = screen.getByAltText('info')
    expect(infoIcon).toBeInTheDocument()
    expect(infoIcon).toHaveAttribute('src')
  })

  it('should render email when provided', () => {
    render(<InfoPopup {...defaultProps} email='test@example.com' />)

    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toHaveStyle('font-weight: 500')
  })

  it('should render confirmation text when provided', () => {
    render(
      <InfoPopup
        {...defaultProps}
        confirmationText='Check your email and click on the confirmation button to continue'
      />
    )

    expect(
      screen.getByText((_content, element) => {
        return (
          element?.textContent ===
            'Test message. Check your email and click on the confirmation button to continue'
        )
      })
    ).toBeInTheDocument()
  })

  it('should render all text elements together when all props are provided', () => {
    render(
      <InfoPopup
        {...defaultProps}
        confirmationText='Check your email and click on the confirmation button to continue'
        email='test@example.com'
      />
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(
      screen.getByText((_content, element) => {
        return (
          element?.textContent ===
            'Test message test@example.com. Check your email and click on the confirmation button to continue'
        )
      })
    ).toBeInTheDocument()
  })

  it('should not close popup when clicking on backdrop', () => {
    render(<InfoPopup {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    fireEvent.click(dialog)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should close popup when pressing escape key', () => {
    render(<InfoPopup {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
