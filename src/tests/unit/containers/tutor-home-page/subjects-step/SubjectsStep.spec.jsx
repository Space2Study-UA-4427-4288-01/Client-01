import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import { categoriesMock } from '~/containers/tutor-home-page/subjects-step/constants.js'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        'becomeTutor.categories.title':
          'Please choose the main subjects based on the category. You can add others later.',
        'becomeTutor.categories.mainSubjectsLabel': 'Main Tutoring Category',
        'becomeTutor.categories.imageAlt': 'Study category'
      }
      return map[key]
    }
  })
}))

vi.mock('@emotion/react', () => ({
  useTheme: () => ({
    breakpoints: { down: () => '(max-width:600px)' }
  })
}))

const mockBtnsBox = <div data-testid='mock-btns-box'>Mock Buttons</div>

describe('SubjectsStep component', () => {
  let user, input

  beforeEach(() => {
    render(<SubjectsStep btnsBox={mockBtnsBox} />)
    user = userEvent.setup()
    input = screen.getByRole('combobox', { name: 'Main Tutoring Category' })
  })

  it('renders all elements correctly', () => {
    expect(
      screen.getByText(
        'Please choose the main subjects based on the category. You can add others later.'
      )
    ).toBeInTheDocument()
    expect(screen.getByAltText('Study category')).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(screen.getByTestId('mock-btns-box')).toBeInTheDocument()
  })

  it('shows all categories on input focus', async () => {
    await user.click(input)
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(categoriesMock.length)
    options.forEach((option, i) => {
      expect(option).toHaveTextContent(categoriesMock[i].name)
    })
  })

  it('filters categories when typing in input', async () => {
    await user.type(input, 'Math')
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Mathematics')
  })

  it('updates input value on category selection', async () => {
    await user.click(input)
    const optionToSelect = await screen.findByText('History')
    await user.click(optionToSelect)

    expect(input).toHaveValue('History')
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })
})
