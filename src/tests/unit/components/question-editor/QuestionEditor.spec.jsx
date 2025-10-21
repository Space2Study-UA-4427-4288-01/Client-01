import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const mockData = {
  type: 'oneAnswer',
  text: 'Test question',
  answers: [{ text: 'Answer 1', isCorrect: false }],
  openAnswer: ''
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

vi.mock('~/hooks/use-menu', () => ({
  __esModule: true,
  default: () => ({
    openMenu: vi.fn(),
    closeMenu: vi.fn(),
    renderMenu: (content) => content
  })
}))

describe('QuestionEditor', () => {
  let handleInputChange
  let handleNonInputValueChange
  let onEdit

  beforeEach(() => {
    handleInputChange = vi.fn()
    handleNonInputValueChange = vi.fn()
    onEdit = vi.fn()
  })

  const setup = (props = {}) => {
    return render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        {...props}
      />
    )
  }

  it('renders question input field', () => {
    setup()
    expect(screen.getByLabelText('questionPage.question')).toBeInTheDocument()
  })

  it('renders open answer input when type is openAnswer', () => {
    setup({
      data: { ...mockData, type: 'openAnswer', openAnswer: 'Open answer' }
    })
    expect(screen.getByLabelText('questionPage.answer')).toBeInTheDocument()
  })

  it('changes question type', () => {
    setup()
    const selectInput = screen.getByTestId('app-select')
    fireEvent.change(selectInput, { target: { value: 'openAnswer' } })
    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('changes question and answer input fields', () => {
    setup()
    const questionInput = screen.getByLabelText('questionPage.question')
    fireEvent.change(questionInput, { target: { value: 'New question' } })
    expect(handleInputChange).toHaveBeenCalledWith('text')

    const answerInput = screen.getByPlaceholderText(
      'questionPage.writeYourAnswer'
    )
    fireEvent.change(answerInput, { target: { value: 'New answer' } })
    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('clicks on edit title and category', () => {
    setup({ isQuizQuestion: true, onEdit })
    const menuButton = screen.getByTestId('MoreVertIcon').closest('button')
    fireEvent.click(menuButton)

    const editItem = screen.getByText(
      'myResourcesPage.questions.titleWithCategory'
    )
    fireEvent.click(editItem)

    expect(onEdit).toHaveBeenCalled()
  })
})
