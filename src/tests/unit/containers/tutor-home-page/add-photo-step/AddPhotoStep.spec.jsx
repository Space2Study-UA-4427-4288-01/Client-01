import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import * as StepCtxMock from '~/context/step-context'

let isMobileMock = false
const handleStepDataMock = vi.fn()
let lastEmitter = null

let createObjectURLSpy
let revokeObjectURLSpy

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useTheme: () => ({ breakpoints: { down: () => '(max-width:600px)' } }),
    useMediaQuery: () => isMobileMock
  }
})

vi.mock('~/context/step-context', () => {
  const React = require('react')
  let initial = null

  return {
    __esModule: true,
    __setInitialPhoto: (file) => {
      initial = file
    },

    useStepContext: () => {
      const [photo, setPhoto] = React.useState(initial)
      const handleStepData = (label, data, errors) => {
        handleStepDataMock(label, data, errors)
        if (label === 'photo') setPhoto(data)
      }
      return {
        stepData: { photo },
        handleStepData
      }
    }
  }
})

vi.mock('~/components/drag-and-drop/DragAndDrop', () => ({
  __esModule: true,
  default: (props) => {
    lastEmitter = props.emitter
    return <div data-testid={props['data-testid']}>{props.children}</div>
  }
}))

const filesValidationMock = vi.fn().mockReturnValue(null)
vi.mock('~/utils/validations/files', () => ({
  filesValidation: (...args) => filesValidationMock(...args)
}))

const makeFile = (size, name, type = 'image/png') =>
  new File([new Uint8Array(size)], name, { type })

const emit = async (payload) => {
  await act(async () => {
    lastEmitter?.(payload)
  })
}

const renderAddPhotoStep = ({ initialPhoto = null, mobile = false } = {}) => {
  StepCtxMock.__setInitialPhoto(initialPhoto)
  isMobileMock = mobile
  return render(<AddPhotoStep btnsBox={<div>Buttons</div>} />)
}

beforeEach(() => {
  vi.clearAllMocks()
  isMobileMock = false
  lastEmitter = null

  createObjectURLSpy = vi
    .spyOn(globalThis.URL, 'createObjectURL')
    .mockImplementation(() => 'blob://fake')
  revokeObjectURLSpy = vi
    .spyOn(globalThis.URL, 'revokeObjectURL')
    .mockImplementation(() => {})

  StepCtxMock.__setInitialPhoto(null)
})

describe('AddPhotoStep', () => {
  it('should render desktop layout with placeholder and default button text', () => {
    renderAddPhotoStep()
    expect(screen.getByTestId('drag-and-drop-desktop')).toBeInTheDocument()
    expect(screen.queryByTestId('drag-and-drop-mobile')).not.toBeInTheDocument()
    expect(
      screen.getByText('becomeTutor.photo.placeholder')
    ).toBeInTheDocument()
    expect(screen.getByText('becomeTutor.photo.button')).toBeInTheDocument()
  })

  it('should render mobile layout when media query matches', () => {
    renderAddPhotoStep({ mobile: true })
    expect(screen.getByTestId('drag-and-drop-mobile')).toBeInTheDocument()
    expect(
      screen.queryByTestId('drag-and-drop-desktop')
    ).not.toBeInTheDocument()
  })

  it('should trigger hidden input click when pressing the visible button', async () => {
    renderAddPhotoStep()
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click')
    await userEvent.click(screen.getByTestId('choose-button'))
    expect(clickSpy).toHaveBeenCalled()
    clickSpy.mockRestore()
  })

  it('should handle a valid manual file and show its name', async () => {
    renderAddPhotoStep()
    const file = makeFile(3, 'avatar.png')

    filesValidationMock.mockReturnValue(null)

    const input = screen.getByTestId('photo-input')
    await userEvent.upload(input, file)

    expect(handleStepDataMock).toHaveBeenCalledWith('photo', file, null)
    expect(await screen.findByText('avatar.png')).toBeInTheDocument()
    expect(createObjectURLSpy).toHaveBeenCalled()
  })

  it('should show error for invalid manual file and not call handleStepData', async () => {
    renderAddPhotoStep()
    const input = screen.getByTestId('photo-input')

    const file = makeFile(3, 'bad.png', 'image/png')
    filesValidationMock.mockReturnValue('becomeTutor.photo.typeError')
    await userEvent.upload(input, file)

    expect(handleStepDataMock).not.toHaveBeenCalled()
    expect(await screen.findByTestId('error-text')).toHaveTextContent(
      'becomeTutor.photo.typeError'
    )
  })

  it('should update state via DragAndDrop emitter on success', async () => {
    renderAddPhotoStep()
    const file = makeFile(3, 'drag.jpg', 'image/jpeg')
    await emit({ files: [file], error: null })

    expect(handleStepDataMock).toHaveBeenCalledWith('photo', file, null)
    expect(await screen.findByText('drag.jpg')).toBeInTheDocument()
  })

  it('should show translated error via DragAndDrop emitter on failure', async () => {
    renderAddPhotoStep()
    await emit({ files: [], error: 'drag.error' })

    expect(await screen.findByTestId('error-text')).toHaveTextContent(
      'drag.error'
    )
    expect(handleStepDataMock).not.toHaveBeenCalled()
  })

  it('should show initial photo preview and file name', async () => {
    renderAddPhotoStep({ initialPhoto: makeFile(3, 'initial.png') })

    expect(await screen.findByText('initial.png')).toBeInTheDocument()
    const img = screen.getByTestId('photo-preview')
    expect(img).toHaveAttribute('src', 'blob://fake')
    expect(createObjectURLSpy).toHaveBeenCalled()
  })

  it('should revoke object URLs on file replace and on unmount', async () => {
    const { unmount } = renderAddPhotoStep()

    await emit({ files: [makeFile(3, 'x.png')], error: null })
    await screen.findByText('x.png')
    expect(createObjectURLSpy).toHaveBeenCalled()
    const revokeAfterFirst = revokeObjectURLSpy.mock.calls.length

    await emit({ files: [makeFile(3, 'y.png')], error: null })
    await screen.findByText('y.png')
    const revokeAfterSecond = revokeObjectURLSpy.mock.calls.length
    expect(revokeAfterSecond).toBeGreaterThan(revokeAfterFirst)

    unmount()
    const revokeAfterUnmount = revokeObjectURLSpy.mock.calls.length
    expect(revokeAfterUnmount).toBeGreaterThan(revokeAfterSecond)
  })
})
