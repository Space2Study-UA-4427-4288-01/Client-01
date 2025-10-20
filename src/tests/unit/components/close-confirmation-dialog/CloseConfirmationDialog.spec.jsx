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

const getElements = () => ({
  title: screen.getByText(TEST_CONSTANTS.TITLE),
  message: screen.getByText(TEST_CONSTANTS.MESSAGE),
  yesButton: screen.getByText(TEST_CONSTANTS.YES_BUTTON),
  noButton: screen.getByText(TEST_CONSTANTS.NO_BUTTON),
  closeButton: screen.getByTestId(TEST_CONSTANTS.CLOSE_BUTTON_TEST_ID),
  confirmButton: screen.getByTestId(TEST_CONSTANTS.CONFIRM_BUTTON_TEST_ID),
  cancelButton: screen.getByTestId(TEST_CONSTANTS.CANCEL_BUTTON_TEST_ID),
  dialog: screen.getByRole('dialog')
})

const expectAllElementsPresent = () => {
  const elements = getElements()
  Object.values(elements).forEach((element) =>
    expect(element).toBeInTheDocument()
  )
}

const expectDialogClosed = () => {
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(screen.queryByText(TEST_CONSTANTS.TITLE)).not.toBeInTheDocument()
}

const expectDialogOpen = () => {
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  expect(screen.getByText(TEST_CONSTANTS.TITLE)).toBeInTheDocument()
}

const clickButton = (buttonType) => {
  const elements = getElements()
  fireEvent.click(elements[buttonType])
}

const expectButtonClick = (buttonType, expectedCalls = 1) => {
  clickButton(buttonType)
  expect(mockOnDismiss).toHaveBeenCalledTimes(expectedCalls)
}

describe('CloseConfirmationDialog', () => {
  const renderDialog = (props = {}) => {
    return renderWithRouter(
      <CloseConfirmationDialog {...defaultProps} {...props} />
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render when open is true', () => {
    renderDialog()
    expectAllElementsPresent()
  })

  it('should not render when open is false', () => {
    renderDialog({ open: false })
    expectDialogClosed()
  })

  it('should call onDismiss when close button is clicked', () => {
    renderDialog()
    expectButtonClick('closeButton')
  })

  it('should call onDismiss when No button is clicked', () => {
    renderDialog()
    expectButtonClick('cancelButton')
  })

  it('should call onDismiss and navigate to home when Yes button is clicked', () => {
    renderDialog()
    clickButton('confirmButton')
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should not close popup when clicking on backdrop', () => {
    renderDialog()
    const backdrop = document.querySelector('.MuiBackdrop-root')
    if (backdrop) {
      fireEvent.click(backdrop)
    }
    expect(mockOnDismiss).not.toHaveBeenCalled()
    expectDialogOpen()
  })

  it('should call onDismiss when Escape key is pressed', () => {
    renderDialog()
    const { dialog } = getElements()
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' })
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('should have proper accessibility attributes', () => {
    renderDialog()
    const { closeButton, confirmButton, cancelButton } = getElements()
    expect(closeButton).toHaveAttribute(
      'aria-label',
      'Close confirmation dialog'
    )
    expect(confirmButton).toHaveAttribute('aria-label', 'Confirm close')
    expect(cancelButton).toHaveAttribute('aria-label', 'Cancel close')
  })

  it('should handle multiple rapid clicks on Yes button correctly', () => {
    renderDialog()
    const { confirmButton } = getElements()
    fireEvent.click(confirmButton)
    fireEvent.click(confirmButton)
    fireEvent.click(confirmButton)
    expect(mockOnDismiss).toHaveBeenCalledTimes(3)
    expect(mockNavigate).toHaveBeenCalledTimes(3)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('should render with proper test IDs', () => {
    renderDialog()
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
