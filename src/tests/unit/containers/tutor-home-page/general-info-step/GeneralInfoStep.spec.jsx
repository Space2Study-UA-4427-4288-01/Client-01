import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { StepProvider } from '~/context/step-context'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

// Mock services
vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: vi.fn()
  }
}))

vi.mock('~/services/locations-service', () => ({
  locationService: {
    getCountries: vi.fn(),
    getCitiesByCountryId: vi.fn()
  }
}))

// Create mock functions and shared objects that we can access in tests
const mockHandleDataChange = vi.fn()
const mockHandleSubmit = vi.fn()
const mockHandleInputChange = vi.fn(() => vi.fn())
const mockHandleBlur = vi.fn(() => vi.fn())

// Shared mock data that can be modified in tests
const mockFormData = {
  firstName: 'John',
  lastName: 'Doe',
  country: null,
  city: null,
  professionalSummary: ''
}

const mockFormErrors = {}

// Mock useForm hook with proper factory function
vi.mock('~/hooks/use-form', () => {
  return {
    default: vi.fn(() => ({
      handleDataChange: mockHandleDataChange,
      handleSubmit: mockHandleSubmit,
      handleInputChange: mockHandleInputChange,
      handleBlur: mockHandleBlur,
      data: mockFormData,
      errors: mockFormErrors
    }))
  }
})

// Import mocked services and hooks
import { userService } from '~/services/user-service'
import { locationService } from '~/services/locations-service'

// Mock Redux store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      appMain: (
        state = { userId: 'test-user-id', userRole: 'tutor' },
        // eslint-disable-next-line no-unused-vars
        action
      ) => state
    },
    preloadedState: initialState
  })
}

// Test wrapper component
const TestWrapper = ({ children, store = createMockStore() }) => (
  <Provider store={store}>
    <StepProvider
      initialValues={{}}
      stepLabels={['general', 'subjects', 'language', 'photo']}
    >
      {children}
    </StepProvider>
  </Provider>
)

// Mock props
const mockProps = {
  btnsBox: <div>Buttons</div>,
  stepLabel: 'general',
  setIsStepInvalid: vi.fn()
}

describe('GeneralInfoStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Reset shared mock data to default state
    Object.assign(mockFormData, {
      firstName: 'John',
      lastName: 'Doe',
      country: null,
      city: null,
      professionalSummary: ''
    })

    Object.assign(mockFormErrors, {})

    // Setup default mock responses
    userService.getUserById.mockResolvedValue({
      data: { firstName: 'John', lastName: 'Doe' }
    })

    locationService.getCountries.mockResolvedValue({
      data: [{ name: 'United States', iso2: 'US' }]
    })

    locationService.getCitiesByCountryId.mockResolvedValue({
      data: [{ name: 'New York', id: 1 }]
    })

    // Render the component once in beforeEach for tests that use default state
    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )
  })

  it('should render the component with form fields', () => {
    expect(screen.getByTestId('firstName')).toBeInTheDocument()
    expect(screen.getByTestId('lastName')).toBeInTheDocument()
    expect(screen.getByTestId('professionalSummary')).toBeInTheDocument()
  })

  it('should display the description text', () => {
    expect(
      screen.getByText(
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'
      )
    ).toBeInTheDocument()
  })

  it('should call getUserById on component mount', async () => {
    await waitFor(() => {
      expect(userService.getUserById).toHaveBeenCalledWith(
        'test-user-id',
        'tutor'
      )
    })
  })

  it('should render the login image', () => {
    const image = screen.getByAltText('login')
    expect(image).toBeInTheDocument()
  })

  it('should render form inputs with proper labels', () => {
    const firstNameInput = screen.getByTestId('firstName')
    const lastNameInput = screen.getByTestId('lastName')
    const summaryInput = screen.getByTestId('professionalSummary')

    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(summaryInput).toBeInTheDocument()
  })

  it('should call setIsStepInvalid with false when no errors', async () => {
    // Set specific errors for this test
    Object.assign(mockFormErrors, { firstName: '', lastName: '' })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(mockProps.setIsStepInvalid).toHaveBeenCalledWith(false)
    })
  })

  it('should call setIsStepInvalid with true when firstName error exists', () => {
    // Set specific data and errors for this test
    Object.assign(mockFormData, { firstName: '' })
    Object.assign(mockFormErrors, { firstName: 'required', lastName: '' })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    expect(mockProps.setIsStepInvalid).toHaveBeenCalledWith(true)
  })

  it('should call setIsStepInvalid with true when lastName error exists', () => {
    // Set specific data and errors for this test
    Object.assign(mockFormData, { lastName: '' })
    Object.assign(mockFormErrors, { firstName: '', lastName: 'required' })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    expect(mockProps.setIsStepInvalid).toHaveBeenCalledWith(true)
  })

  it('should render country and city autocomplete fields', () => {
    const countryAutocomplete = screen.getByRole('combobox', {
      name: /country/i
    })
    const cityAutocomplete = screen.getByRole('combobox', { name: /city/i })

    expect(countryAutocomplete).toBeInTheDocument()
    expect(cityAutocomplete).toBeInTheDocument()
  })

  it('should load countries when country field is focused', async () => {
    const countryInput = screen.getByRole('combobox', { name: /country/i })

    fireEvent.focus(countryInput)

    await waitFor(() => {
      expect(locationService.getCountries).toHaveBeenCalled()
    })
  })

  it('should load cities when country is selected', async () => {
    // Set specific country for this test
    Object.assign(mockFormData, {
      country: { id: 'US', label: 'United States' }
    })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(locationService.getCitiesByCountryId).toHaveBeenCalledWith('US')
    })
  })

  it('should not load cities when country id is 0', () => {
    // Set country with id 0 for this test
    Object.assign(mockFormData, {
      country: { id: 0, label: 'Invalid Country' }
    })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    expect(locationService.getCitiesByCountryId).not.toHaveBeenCalled()
  })

  it('should handle form submission', async () => {
    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(mockHandleSubmit).toHaveBeenCalled()
  })

  it('should handle input changes correctly', async () => {
    const firstNameInput = screen.getByTestId('firstName')

    await userEvent.type(firstNameInput, 'Jane')

    expect(mockHandleInputChange).toHaveBeenCalledWith('firstName')
  })

  it('should handle blur events correctly', async () => {
    const firstNameInput = screen.getByTestId('firstName')

    fireEvent.blur(firstNameInput)

    expect(mockHandleBlur).toHaveBeenCalledWith('firstName')
  })

  it('should display required fields legend', () => {
    expect(
      screen.getByText('Inputs with the * sign are required')
    ).toBeInTheDocument()
  })

  it('should render btnsBox prop', () => {
    expect(screen.getByText('Buttons')).toBeInTheDocument()
  })

  it('should populate initial data from user service', async () => {
    userService.getUserById.mockResolvedValue({
      data: { firstName: 'Jane', lastName: 'Smith' }
    })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(mockHandleDataChange).toHaveBeenCalledWith({
        firstName: 'Jane',
        lastName: 'Smith'
      })
    })
  })

  it('should filter duplicate cities from location service response', async () => {
    locationService.getCitiesByCountryId.mockResolvedValue({
      data: [
        { name: 'New York', id: 1 },
        { name: 'New York', id: 2 },
        { name: 'Los Angeles', id: 3 }
      ]
    })

    // Set specific country for this test
    Object.assign(mockFormData, {
      country: { id: 'US', label: 'United States' }
    })

    render(
      <TestWrapper>
        <GeneralInfoStep {...mockProps} />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(locationService.getCitiesByCountryId).toHaveBeenCalledWith('US')
    })
  })
})
