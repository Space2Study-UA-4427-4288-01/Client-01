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

  it('renders question input field', () => {
    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )
    expect(screen.getByLabelText('questionPage.question')).toBeInTheDocument()
  })

  it('renders open answer input when type is openAnswer', () => {
    const data = { ...mockData, type: 'openAnswer', openAnswer: 'Open answer' }
    render(
      <QuestionEditor
        data={data}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )
    expect(screen.getByLabelText('questionPage.answer')).toBeInTheDocument()
  })

  it('changes question type', () => {
    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )
    const selectInput = screen.getByTestId('app-select')
    fireEvent.change(selectInput, { target: { value: 'openAnswer' } })
    expect(handleNonInputValueChange).toHaveBeenCalled()
  })

  it('changes question and answer input fields', () => {
    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
      />
    )

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
    render(
      <QuestionEditor
        data={mockData}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        onEdit={onEdit}
        isQuizQuestion
      />
    )

    const menuButton = screen.getByTestId('MoreVertIcon').closest('button')
    fireEvent.click(menuButton)

    const editItem = screen.getByText(
      'myResourcesPage.questions.titleWithCategory'
    )
    fireEvent.click(editItem)

    expect(onEdit).toHaveBeenCalled()
  })
})
