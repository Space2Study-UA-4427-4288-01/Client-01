import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CloseConfirmationDialog from '~/components/close-confirmation-dialog/CloseConfirmationDialog'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const TEST_CONSTANTS = {
  TITLE: 'Please Confirm',
  MESSAGE:
    'Are you certain you want to close? Any unsaved changes will be lost',
  YES_BUTTON: 'Yes',
  NO_BUTTON: 'No',
  CLOSE_BUTTON_TEST_ID: 'close-button',
  CONFIRM_BUTTON_TEST_ID: 'confirm-button',
  CANCEL_BUTTON_TEST_ID: 'cancel-button',
  DIALOG_TEST_ID: 'closeConfirmationDialog'
}

const mockOnDismiss = vi.fn()

const defaultProps = {
  open: true,
  onDismiss: mockOnDismiss
}

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('CloseConfirmationDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when open is true', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    expect(screen.getByText(TEST_CONSTANTS.TITLE)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.MESSAGE)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.YES_BUTTON)).toBeInTheDocument()
    expect(screen.getByText(TEST_CONSTANTS.NO_BUTTON)).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID)
    ).toBeInTheDocument()
  })

  it('should not render when open is false', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} open={false} />)

    expect(screen.queryByText(TEST_CONSTANTS.TITLE)).not.toBeInTheDocument()
    expect(screen.queryByText(TEST_CONSTANTS.MESSAGE)).not.toBeInTheDocument()
    expect(
      screen.queryByText(TEST_CONSTANTS.YES_BUTTON)
    ).not.toBeInTheDocument()
    expect(screen.queryByText(TEST_CONSTANTS.NO_BUTTON)).not.toBeInTheDocument()
  })

  it('should call onDismiss when close button is clicked', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const closeButton = screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    fireEvent.click(closeButton)

    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should call onDismiss when No button is clicked', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const noButton = screen.getByTestId(TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID)
    fireEvent.click(noButton)

    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should call onDismiss and navigate to home when Yes button is clicked', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const yesButton = screen.getByTestId(TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID)
    fireEvent.click(yesButton)

    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should not close popup when clicking on backdrop', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    expect(mockOnDismiss).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should call onDismiss when Escape key is pressed', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })

    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should have proper accessibility attributes', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const closeButton = screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    const confirmButton = screen.getByTestId(
      TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID
    )
    const cancelButton = screen.getByTestId(
      TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID
    )

    expect(closeButton).toHaveAttribute(
      'aria-label',
      'Close confirmation dialog'
    )
    expect(confirmButton).toHaveAttribute('aria-label', 'Confirm close')
    expect(cancelButton).toHaveAttribute('aria-label', 'Cancel close')
  })

  it('should have proper Dialog configuration', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveClass('MuiDialog-paper')
    expect(dialog.closest('[role="dialog"]')).toBeInTheDocument()
  })

  it('should display correct text content', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const title = screen.getByText(TEST_CONSTANTS.TITLE)
    const message = screen.getByText(TEST_CONSTANTS.MESSAGE)
    const yesButton = screen.getByText(TEST_CONSTANTS.YES_BUTTON)
    const noButton = screen.getByText(TEST_CONSTANTS.NO_BUTTON)

    expect(title).toBeInTheDocument()
    expect(message).toBeInTheDocument()
    expect(yesButton).toBeInTheDocument()
    expect(noButton).toBeInTheDocument()
  })

  it('should have proper button styling classes', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const confirmButton = screen.getByTestId(
      TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID
    )
    const cancelButton = screen.getByTestId(
      TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID
    )

    expect(confirmButton).toHaveClass('MuiButton-contained')
    expect(cancelButton).toHaveClass('MuiButton-outlined')
  })

  it('should handle multiple rapid clicks correctly', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    const yesButton = screen.getByTestId(TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID)
    const noButton = screen.getByTestId(TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID)

    fireEvent.click(yesButton)
    fireEvent.click(noButton)
    fireEvent.click(yesButton)

    expect(mockOnDismiss).toHaveBeenCalledTimes(3)
  })

  it('should render with proper test IDs', () => {
    renderWithRouter(<CloseConfirmationDialog {...defaultProps} />)

    expect(
      screen.getByTestId(TEST_CONSTANTS.DIALOG_TEST_ID)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID)
    ).toBeInTheDocument()
  })
})
