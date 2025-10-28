import { render, screen, fireEvent } from '@testing-library/react'
import Faq from '~/containers/student-home-page/faq/Faq'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('Faq component tests', () => {
  beforeEach(() => {
    render(<Faq />)
  })

  it('should render title', () => {
    const title = screen.getByText('studentHomePage.faq.title')

    expect(title).toBeInTheDocument()
  })

  it('should render description', () => {
    const description = screen.getByText('studentHomePage.faq.subtitle')

    expect(description).toBeInTheDocument()
  })

  it('should render all 4 accordion items', () => {
    const findTutor = screen.getByText('studentHomePage.faq.findTutor')
    const bookLesson = screen.getByText('studentHomePage.faq.bookLesson')
    const rules = screen.getByText('studentHomePage.faq.rules')
    const howPayLessons = screen.getByText('studentHomePage.faq.howPayLessons')

    expect(findTutor).toBeInTheDocument()
    expect(bookLesson).toBeInTheDocument()
    expect(rules).toBeInTheDocument()
    expect(howPayLessons).toBeInTheDocument()
  })

  it('should expand accordion item when clicked', () => {
    const firstQuestion = screen.getByText('studentHomePage.faq.findTutor')

    fireEvent.click(firstQuestion)

    const expandedAccordion = screen.getByTestId('0-true')
    const description = screen.getByText(
      'studentHomePage.faq.findTutorDescription'
    )

    expect(expandedAccordion).toBeInTheDocument()
    expect(description).toBeVisible()
  })

  it('should show description when accordion is expanded', () => {
    const firstQuestion = screen.getByText('studentHomePage.faq.findTutor')

    fireEvent.click(firstQuestion)

    const description = screen.getByText(
      'studentHomePage.faq.findTutorDescription'
    )
    expect(description).toBeVisible()
  })

  it('should allow multiple accordions to be open at once', () => {
    const firstQuestion = screen.getByText('studentHomePage.faq.findTutor')
    const secondQuestion = screen.getByText('studentHomePage.faq.bookLesson')

    fireEvent.click(firstQuestion)
    fireEvent.click(secondQuestion)

    const firstAccordion = screen.getByTestId('0-true')
    const secondAccordion = screen.getByTestId('1-true')
    const firstDescription = screen.getByText(
      'studentHomePage.faq.findTutorDescription'
    )
    const secondDescription = screen.getByText(
      'studentHomePage.faq.bookLessonDescription'
    )

    expect(firstAccordion).toBeInTheDocument()
    expect(secondAccordion).toBeInTheDocument()
    expect(firstDescription).toBeVisible()
    expect(secondDescription).toBeVisible()
  })

  it('should collapse accordion when clicked again', () => {
    const firstQuestion = screen.getByText('studentHomePage.faq.findTutor')

    fireEvent.click(firstQuestion)
    let expandedAccordion = screen.getByTestId('0-true')
    expect(expandedAccordion).toBeInTheDocument()

    fireEvent.click(firstQuestion)
    const collapsedAccordion = screen.getByTestId('0-false')

    expect(collapsedAccordion).toBeInTheDocument()
  })

  it('should render ExpandMoreRoundedIcon', () => {
    const icons = screen.getAllByTestId('ExpandMoreRoundedIcon')

    expect(icons).toHaveLength(4)
  })
})
