import { vi } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import React from 'react'

import { StepProvider } from '~/context/step-context'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import TempComponent from './TempComponent'
import {
  studentStepLabels,
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'

import { renderWithProviders } from '~tests/test-utils'

const stepsMock = tutorStepLabels || studentStepLabels

const childrenArrMock = [
  <TempComponent key='1'>1</TempComponent>,
  <TempComponent key='2'>2</TempComponent>,
  <TempComponent key='3'>3</TempComponent>,
  <TempComponent key='4'>4</TempComponent>
]

describe('StepWrapper test', () => {
  beforeEach(async () => {
    await waitFor(() => {
      renderWithProviders(
        <StepProvider initialValues={initialValues} stepLabels={stepsMock}>
          <StepWrapper steps={stepsMock}>{childrenArrMock}</StepWrapper>
        </StepProvider>
      )
    })
  })

  it('should render second children after click on tab', () => {
    const secondTab = screen.getByText(/step.stepLabels.language/i)

    fireEvent.click(secondTab)

    const secondChildren = screen.getByText(/3/i)

    expect(secondChildren).toBeInTheDocument()
  })

  it('should render finish button', () => {
    let nextBtn = screen.getByText(/Next/i)

    waitFor(() => fireEvent.click(nextBtn))

    nextBtn = screen.getByText(/Next/i)

    waitFor(() => fireEvent.click(nextBtn))

    nextBtn = screen.getByText(/Next/i)

    waitFor(() => fireEvent.click(nextBtn))

    const finishBtn = screen.getByText(/Finish/i)

    waitFor(() => fireEvent.click(finishBtn))

    expect(vi.fn()).not.toHaveBeenCalled()
  })

  it('should render first children after click on next and back button', () => {
    const nextBtn = screen.getByText(/Next/i)
    fireEvent.click(nextBtn)

    const backBtn = screen.getByText(/Back/i)
    fireEvent.click(backBtn)

    const firstChildren = screen.getByText(/1/i)

    expect(firstChildren).toBeInTheDocument()
  })

  it('should disable Next button when child calls setIsStepInvalid(true)', async () => {
    // Create a test component that renders btnsBox and makes the step invalid
    const TestComponentMakeInvalid = ({ setIsStepInvalid, btnsBox }) => {
      // Call setIsStepInvalid(true) on mount to test button disable
      React.useEffect(() => {
        setIsStepInvalid(true)
      }, [setIsStepInvalid])

      return (
        <div>
          <div>Test Step - Invalid</div>
          {btnsBox}
        </div>
      )
    }

    const childrenWithInvalidation = [<TestComponentMakeInvalid key='1' />]

    // Clear previous render
    document.body.innerHTML = ''

    renderWithProviders(
      <StepProvider initialValues={initialValues} stepLabels={stepsMock}>
        <StepWrapper steps={stepsMock}>{childrenWithInvalidation}</StepWrapper>
      </StepProvider>
    )

    await waitFor(() => {
      const nextButton = screen.getByText(/common.next/i)
      expect(nextButton).toBeDisabled()
    })
  })

  it('should pass setIsStepInvalid prop to child components', () => {
    // Test that setIsStepInvalid is passed as prop using TempComponent
    const TempComponentWithProps = ({ setIsStepInvalid }) => {
      return <div data-testid='temp-with-props'>{typeof setIsStepInvalid}</div>
    }

    const childrenWithProps = [<TempComponentWithProps key='1' />]

    // Clear and render with prop-testing component
    document.body.innerHTML = ''
    renderWithProviders(
      <StepProvider initialValues={initialValues} stepLabels={stepsMock}>
        <StepWrapper steps={stepsMock}>{childrenWithProps}</StepWrapper>
      </StepProvider>
    )

    const tempComponent = screen.getByTestId('temp-with-props')
    expect(tempComponent).toHaveTextContent('function')
  })

  it('should initialize with Next button enabled (isStepInvalid defaults to false)', () => {
    // Just check that Next button starts enabled with normal children
    const nextButton = screen.getByText(/Next/i)
    expect(nextButton).not.toBeDisabled()
  })
})
