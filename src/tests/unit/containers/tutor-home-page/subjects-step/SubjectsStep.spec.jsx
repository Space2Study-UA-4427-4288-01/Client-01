import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'

import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import {
  categoriesMock,
  subjectsMock
} from '~/containers/tutor-home-page/subjects-step/constants.js'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const map = {
        'becomeTutor.categories.title':
          'Please choose the main subjects based on the category. You can add others later.',
        'becomeTutor.categories.mainSubjectsLabel': 'Main Tutoring Category',
        'becomeTutor.categories.subjectLabel': 'Subject',
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
  let user, mainInput, subjectInput

  beforeEach(() => {
    render(<SubjectsStep btnsBox={mockBtnsBox} />)
    user = userEvent.setup()
    mainInput = screen.getByRole('combobox', { name: 'Main Tutoring Category' })
    subjectInput = screen.getByRole('combobox', { name: 'Subject' })
  })

  it('renders all elements correctly', () => {
    expect(
      screen.getByText(
        'Please choose the main subjects based on the category. You can add others later.'
      )
    ).toBeInTheDocument()
    expect(screen.getByAltText('Study category')).toBeInTheDocument()
    expect(mainInput).toBeInTheDocument()
    expect(subjectInput).toBeInTheDocument()
    expect(screen.getByTestId('mock-btns-box')).toBeInTheDocument()
  })

  it('shows all categories on focus of the main category input', async () => {
    await user.click(mainInput)
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(categoriesMock.length)
    options.forEach((option, i) => {
      expect(option).toHaveTextContent(categoriesMock[i].name)
    })
  })

  it('filters main categories when typing', async () => {
    await user.type(mainInput, 'Math')
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Mathematics')
  })

  it('updates main input value on category selection', async () => {
    await user.click(mainInput)
    const optionToSelect = await screen.findByText('History')
    await user.click(optionToSelect)
    expect(mainInput).toHaveValue('History')
    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  it('shows all subjects on focus of the Subject input', async () => {
    await user.click(subjectInput)
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(subjectsMock.length)
    options.forEach((option, i) => {
      expect(option).toHaveTextContent(subjectsMock[i].name)
    })
  })

  it('filters subjects when typing in the Subject input', async () => {
    await user.type(subjectInput, 'Bot')
    const options = await screen.findAllByRole('option')
    expect(options.length).toBeGreaterThan(0)
    expect(options[0].textContent.toLowerCase()).toContain('bot')
  })

  it('updates Subject input value on selection', async () => {
    await user.click(subjectInput)
    const optionToSelect = await screen.findByText(subjectsMock[0].name)
    await user.click(optionToSelect)
    expect(subjectInput).toHaveValue(subjectsMock[0].name)
  })
})
