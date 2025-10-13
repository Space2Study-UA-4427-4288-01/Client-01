import { screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({ setNeedConfirmation: () => true })
}))

const createProps = (data = {}, errors = {}) => ({
  data: { email: 'test@example.com', password: 'password', ...data },
  errors: { email: '', password: '', ...errors },
  handleChange: vi.fn(),
  handleBlur: vi.fn(),
  handleSubmit: vi.fn()
})

const renderForm = (props, loading = false) => {
  const state = { appMain: { authLoading: loading } }
  return renderWithProviders(<LoginForm {...props} />, {
    preloadedState: state
  })
}

describe('LoginForm', () => {
  it('renders form elements', () => {
    renderForm(createProps())

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByText('common.labels.password')).toBeInTheDocument()
    expect(screen.getByText('login.forgotPassword')).toBeInTheDocument()
    expect(screen.getByText('common.labels.login')).toBeInTheDocument()
  })

  it('toggles password visibility', async () => {
    renderForm(createProps())

    const toggleButton = screen.getByTestId('VisibilityOffIcon')
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(screen.getByTestId('VisibilityIcon')).toBeInTheDocument()
    })
  })

  it('calls handleSubmit on form submission', () => {
    const props = createProps()
    props.handleSubmit.mockImplementation((e) => e.preventDefault())
    renderForm(props)

    fireEvent.click(screen.getByText('common.labels.login'))

    expect(props.handleSubmit).toHaveBeenCalled()
  })

  it('opens forgot password modal', async () => {
    renderForm(createProps())

    fireEvent.click(screen.getByText('login.forgotPassword'))

    await waitFor(() => {
      expect(screen.getByText('login.backToLogin')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    renderForm(createProps(), true)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('disables button when email empty', () => {
    renderForm(createProps({ email: '' }))

    expect(screen.getByText('common.labels.login')).toBeDisabled()
  })

  it('disables button when password empty', () => {
    renderForm(createProps({ password: '' }))

    expect(screen.getByText('common.labels.login')).toBeDisabled()
  })

  it('disables button when email has error', () => {
    renderForm(createProps({}, { email: 'Invalid email' }))

    expect(screen.getByText('common.labels.login')).toBeDisabled()
  })

  it('enables button when form is valid', () => {
    renderForm(createProps())

    expect(screen.getByText('common.labels.login')).toBeEnabled()
  })
})
