import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import SubjectsStep from './SubjectsStep'
import { categoriesMock } from './constants.js'
import en from '~/constants/translations/en/become-tutor.json'

vi.mock('@emotion/react', () => ({
  useTheme: () => ({
    breakpoints: { down: () => '(max-width:600px)' }
  })
}))

const mockBtnsBox = <div data-testid='mock-btns-box'>Mock Buttons</div>
const t = en.categories

describe('SubjectsStep component', () => {
  let user, input

  beforeEach(() => {
    render(<SubjectsStep btnsBox={mockBtnsBox} />)
    user = userEvent.setup()
    input = screen.getByRole('combobox', { name: t.mainSubjectsLabel })
  })

  it('renders all elements correctly', () => {
    expect(screen.getByText(t.title)).toBeInTheDocument()
    expect(screen.getByAltText('Study category')).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(screen.getByTestId('mock-btns-box')).toBeInTheDocument()
  })

  it('shows all categories when Autocomplete is clicked', async () => {
    await user.click(input)
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(categoriesMock.length)
    categoriesMock.forEach((c, i) => {
      expect(options[i]).toHaveTextContent(c.name)
    })
  })

  it('filters categories based on user input', async () => {
    await user.type(input, 'Math')
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Mathematics')
  })

  it('updates input value when a category is selected', async () => {
    await user.click(input)
    const optionToSelect = await screen.findByText('History')
    await user.click(optionToSelect)

    expect(input).toHaveValue('History')
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })
})
