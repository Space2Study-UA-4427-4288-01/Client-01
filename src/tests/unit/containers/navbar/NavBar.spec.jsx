import { screen, fireEvent, waitFor } from '@testing-library/react'
import NavBar from '~/containers/layout/navbar/NavBar'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

// Mock navigate function
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/test' })
  }
})

vi.mock('~/hooks/use-confirm', () => {
  return {
    default: () => ({ setNeedConfirmation: () => true })
  }
})
vi.mock('~/containers/guest-home-page/google-button/GoogleButton', () => ({
  __esModule: true,
  default: function () {
    return <button>Google</button>
  }
}))

describe('Guest NavBar test', () => {
  const preloadedState = { appMain: { loading: false, userRole: '' } }

  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(<NavBar />, { preloadedState })
  })

  it('should render logo element', () => {
    const logo = screen.getByAltText('logo')

    expect(logo).toBeInTheDocument()
  })
  it('should render navigation item with guestNavBar text', () => {
    const text = screen.getByText('header.what-сan-you-do')

    expect(text).toBeInTheDocument()
  })
  it('should click login button', async () => {
    const loginButton = screen.getByText('header.loginButton')
    fireEvent.click(loginButton)
    const img = screen.getByAltText('login')

    await waitFor(() => expect(img).toBeInTheDocument())
  })

  it('should open sidebar with close icon after click menu icon', async () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    expect(menuIcon).toBeInTheDocument()

    fireEvent.click(menuIcon)
    const closeIcon = screen.getByTestId('CloseRoundedIcon')

    await waitFor(() => expect(closeIcon).toBeInTheDocument())
  })

  it('should handle logo click and scroll to top', () => {
    // Mock document.querySelector and scrollTo
    const mockScrollContainer = {
      scrollTop: 100,
      scrollTo: vi.fn()
    }
    const querySelectorSpy = vi
      .spyOn(document, 'querySelector')
      .mockReturnValue(mockScrollContainer)

    const logo = screen.getByAltText('logo')
    const logoButton = logo.closest('button')
    fireEvent.click(logoButton)

    expect(querySelectorSpy).toHaveBeenCalledWith('#main-content')
    expect(mockScrollContainer.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })

    // Cleanup
    querySelectorSpy.mockRestore()
  })

  it('should handle logo click and remove hash from URL when scrolling', () => {
    // Mock window.location
    const originalLocation = window.location
    delete window.location
    window.location = {
      ...originalLocation,
      hash: '#test-section',
      pathname: '/test-path'
    }

    // Mock document.querySelector and scrollTo
    const mockScrollContainer = {
      scrollTop: 100,
      scrollTo: vi.fn()
    }
    const querySelectorSpy = vi
      .spyOn(document, 'querySelector')
      .mockReturnValue(mockScrollContainer)

    const logo = screen.getByAltText('logo')
    const logoButton = logo.closest('button')
    fireEvent.click(logoButton)

    expect(mockScrollContainer.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })

    // Should call navigate to remove hash
    expect(mockNavigate).toHaveBeenCalledWith('/test-path', { replace: true })

    // Cleanup
    querySelectorSpy.mockRestore()
    window.location = originalLocation
  })
})

describe('Student NavBar test', () => {
  const preloadedState = { appMain: { loading: false, userRole: 'student' } }

  beforeEach(() => {
    vi.clearAllMocks()
    renderWithProviders(<NavBar />, { preloadedState })
  })

  it('should render navigation item with navBar text', () => {
    const text = screen.getByText('header.categories')

    expect(text).toBeInTheDocument()
  })
  it('should render account icon', () => {
    const icon = screen.getByTestId('AccountCircleOutlinedIcon')

    expect(icon).toBeInTheDocument()
  })
})
