import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'

import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/hooks/use-redux', async () => {
  const actual = await vi.importActual('~/hooks/use-redux')
  return {
    ...actual,
    useAppDispatch: () => vi.fn(),
    useAppSelector: vi.fn(() => ({
      userId: 'test-user-id',
      userRole: 'tutor',
      isFirstLogin: true
    }))
  }
})
vi.mock('~/redux/reducer', async () => {
  const actual = await vi.importActual('~/redux/reducer')
  return {
    ...actual,
    markFirstLoginComplete: vi.fn()
  }
})

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    default: ({ btnsBox }) => (
      <div>
        <div>GeneralInfoStep</div>
        {btnsBox}
      </div>
    )
  })
)
vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => ({
  default: ({ btnsBox }) => (
    <div>
      <div>SubjectsStep</div>
      {btnsBox}
    </div>
  )
}))
vi.mock('~/containers/tutor-home-page/language-step/LanguageStep', () => ({
  default: ({ btnsBox }) => (
    <div>
      <div>LanguageStep</div>
      {btnsBox}
    </div>
  )
}))

vi.mock('~/utils/image-resize', () => ({
  imageResize: vi.fn(async () => 'data:image/png;base64,RESIZED_DATA')
}))

global.DataTransfer = class DataTransfer {
  constructor() {
    this.items = {
      add: (file) => {
        this.files.push(file)
      }
    }
    this.files = []
  }
}

const createFile = (name, type, sizeBytes) => {
  const blob = new Blob([new Uint8Array(sizeBytes)], { type })
  return new File([blob], name, { type })
}

vi.mock(
  '~/containers/tutor-home-page/add-photo-step/AddPhotoStep',
  async () => {
    const React = await import('react')
    const { useState } = React
    const { imageResize } = await import('~/utils/image-resize')

    const MAX_FILE_SIZE = 1_000_000

    const AddPhotoStepMock = ({ btnsBox }) => {
      const [error, setError] = useState('')
      const [photoUrl, setPhotoUrl] = useState('')

      const onChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        if (file.size > MAX_FILE_SIZE) {
          setError('becomeTutor.photo.fileSizeError')
          return
        }
        setError('')
        const resized = await imageResize('blob:fake', {
          newHeight: 100,
          newWidth: 100
        })
        setPhotoUrl(resized)
      }

      return (
        <div>
          <div>PhotoStep</div>
          <label>
            Upload Photo
            <input type='file' aria-label='photo-input' onChange={onChange} />
          </label>
          {error && <div role='alert'>{error}</div>}
          {photoUrl && <img alt='uploaded' src={photoUrl} />}
          {btnsBox}
        </div>
      )
    }

    return { default: AddPhotoStepMock }
  }
)

describe('UserStepsWrapper', () => {
  const renderComponent = () =>
    renderWithProviders(<UserStepsWrapper userRole={'tutor'} />)

  it('should render first tab content by default', async () => {
    renderComponent()
    expect(await screen.findByText('GeneralInfoStep')).toBeInTheDocument()
  })

  it('should render second tab (Subjects) after click', async () => {
    renderComponent()
    const subjectsTab = await screen.findByText(/step.stepLabels.subjects/i)
    fireEvent.click(subjectsTab)
    expect(await screen.findByText('SubjectsStep')).toBeInTheDocument()
  })

  it('should open photo tab and show uploader', async () => {
    renderComponent()
    const photoTab = await screen.findByText(/step.stepLabels.photo/i)
    fireEvent.click(photoTab)
    expect(await screen.findByText('PhotoStep')).toBeInTheDocument()
    expect(screen.getByLabelText('photo-input')).toBeInTheDocument()
  })

  it('should render error after adding too large file', async () => {
    renderComponent()
    const photoTab = await screen.findByText(/step.stepLabels.photo/i)
    fireEvent.click(photoTab)
    const input = screen.getByLabelText('photo-input')

    const bigFile = createFile('big.png', 'image/png', 2_000_000)
    const dt = new DataTransfer()
    dt.items.add(bigFile)
    fireEvent.change(input, { target: { files: dt.files } })

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /becomeTutor\.photo\.fileSizeError/i
    )
  })

  it('should resize and show photo after adding valid photo', async () => {
    renderComponent()
    const photoTab = await screen.findByText(/step.stepLabels.photo/i)
    fireEvent.click(photoTab)
    const input = screen.getByLabelText('photo-input')

    const okFile = createFile('ok.png', 'image/png', 50_000)
    const dt = new DataTransfer()
    dt.items.add(okFile)
    fireEvent.change(input, { target: { files: dt.files } })

    const img = await screen.findByAltText('uploaded')
    expect(img).toHaveAttribute('src', 'data:image/png;base64,RESIZED_DATA')
  })
})
