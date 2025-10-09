import { screen, fireEvent, waitFor } from '@testing-library/react'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import { SnackBarProvider } from '~/context/snackbar-context'
import { renderWithProviders, mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'
import { vi } from 'vitest'
import i18n from '~/plugins/i18n'

const openModal = vi.fn()
const resetToken = 'test'

vi.mock('react-i18next', async () => {
  const actual = await vi.importActual('react-i18next')
  return { ...actual }
})

describe('ResetPassword test', () => {
  it('should open login dilog after positive response', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.resetPassword}/${resetToken}`)
      .reply(200)

    renderWithProviders(
      <SnackBarProvider>
        <ResetPassword openModal={openModal} resetToken={resetToken} />
      </SnackBarProvider>
    )

    const [passwordInput, confirmPasswordInput] =
      screen.getAllByLabelText(/password/i)
    const button = screen.getByText(i18n.t('login.savePassword'))

    fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(openModal).toHaveBeenCalled()
    })
  })

  it('should open snackbar with error after reject', async () => {
    mockAxiosClient
      .onPatch(`${URLs.auth.resetPassword}/${resetToken}`)
      .reply(404, { code: 'BAD_RESET_TOKEN' })

    renderWithProviders(
      <SnackBarProvider>
        <ResetPassword openModal={openModal} resetToken={resetToken} />
      </SnackBarProvider>
    )

    const [passwordInput, confirmPasswordInput] =
      screen.getAllByLabelText(/password/i)
    const button = screen.getByText(i18n.t('login.savePassword'))

    fireEvent.change(passwordInput, { target: { value: '12345qwertY' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '12345qwertY' } })
    fireEvent.click(button)

    const expected = i18n.t('errors.BAD_RESET_TOKEN')
    await waitFor(() => {
      const alert = screen.getByRole('alert')
      expect(alert).toHaveTextContent(expected)
    })
  })
})
