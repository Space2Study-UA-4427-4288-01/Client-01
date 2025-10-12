import {
  render,
  screen,
  fireEvent,
  waitFor,
  within
} from '@testing-library/react'
import { vi } from 'vitest'

import PopupDialog from '~/components/popup-dialog/PopupDialog'
import useBreakpoints from '~/hooks/use-breakpoints'

const closeModal = vi.fn()
const closeModalAfterDelay = vi.fn()
const setFullScreen = vi.fn()

const props = {
  content: 'test',
  closeModalAfterDelay,
  timerId: null,
  isFullScreen: true,
  setFullScreen
}

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ checkConfirmation: () => true })
  }
})

vi.mock('~/hooks/use-breakpoints', () => ({
  default: vi.fn(() => ({ isMobile: false }))
}))

vi.mock('~/context/modal-context', () => ({
  useModalContext: () => ({
    closeModal
  })
}))
const renderPopup = (customProps = {}) =>
  render(<PopupDialog {...props} {...customProps} />)

describe('Popup dialog test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should have content text', () => {
    renderPopup()
    const content = screen.getByText(props.content)
    expect(content).toBeInTheDocument()
  })

  it('should close modal when X button is clicked', () => {
    renderPopup()
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(closeModal).toHaveBeenCalledTimes(1)
  })

  it('should close popup after delay', async () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    renderPopup({ timerId: 21 })

    const dialog = screen.getByTestId('popup')
    const popupContent = within(dialog).getByTestId('popupContent')

    fireEvent.mouseEnter(popupContent)
    fireEvent.mouseLeave(popupContent)

    expect(clearTimeoutSpy).toHaveBeenCalledWith(21)
    await waitFor(() => expect(closeModalAfterDelay).toHaveBeenCalled())
  })

  it('should not call clearTimeout when timerId is null', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    renderPopup({ timerId: null })

    const dialog = screen.getByTestId('popup')
    const popupContent = within(dialog).getByTestId('popupContent')

    fireEvent.mouseEnter(popupContent)

    expect(clearTimeoutSpy).not.toHaveBeenCalled()
  })

  it('should render fullscreen when isMobile is true', () => {
    useBreakpoints.mockReturnValue({ isMobile: true })
    renderPopup()
    const dialog = screen.getByTestId('popup')
    expect(dialog).toBeInTheDocument()
  })
})
