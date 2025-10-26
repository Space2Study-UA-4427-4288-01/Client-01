import { emptyField, textField } from '~/utils/validations/common'

export const validations = {
  firstName: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  lastName: (value: string) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  description: (value: string) => textField(0, 100)(value)
}
