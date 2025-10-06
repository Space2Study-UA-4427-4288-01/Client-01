import { vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { renderWithProviders } from '~tests/test-utils'

describe('SearchAutocomplete', () => {
  const mockSetSearch = vi.fn()
  const mockOnSearchChange = vi.fn()
  const textFieldProps = { label: 'Search' }

  const options = [
    'Tutor: John Doe',
    'Tutor: Jane Smith',
    'Student: Alice Johnson',
    'Student: Bob Brown'
  ]

  beforeEach(() => {
    mockSetSearch.mockClear()
    mockOnSearchChange.mockClear()
  })

  it('renders autocomplete with search input', () => {
    renderWithProviders(
      <SearchAutocomplete
        onSearchChange={mockOnSearchChange}
        options={options}
        search=''
        setSearch={mockSetSearch}
        textFieldProps={textFieldProps}
      />
    )

    const input = screen.getByLabelText('Search')
    expect(input).toBeInTheDocument()
  })

  it('updates search input on typing', async () => {
    renderWithProviders(
      <SearchAutocomplete
        onSearchChange={mockOnSearchChange}
        options={options}
        search=''
        setSearch={mockSetSearch}
        textFieldProps={textFieldProps}
      />
    )

    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Tutor: John')

    expect(input.value).toBe('Tutor: John')
  })

  it('filters options on typing', async () => {
    renderWithProviders(
      <SearchAutocomplete
        onSearchChange={mockOnSearchChange}
        options={options}
        search=''
        setSearch={mockSetSearch}
        textFieldProps={textFieldProps}
      />
    )

    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Alice')

    const option = await screen.findByText('Student: Alice Johnson')
    expect(option).toBeInTheDocument()
  })

  it('selects an option on click', async () => {
    renderWithProviders(
      <SearchAutocomplete
        onSearchChange={mockOnSearchChange}
        options={options}
        search=''
        setSearch={mockSetSearch}
        textFieldProps={textFieldProps}
      />
    )

    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Jane')

    const option = await screen.findByText('Tutor: Jane Smith')
    await userEvent.click(option)

    expect(mockSetSearch).toHaveBeenCalledWith('Tutor: Jane Smith')
    expect(mockOnSearchChange).toHaveBeenCalled()
  })

  it('clears search input on clear icon click', async () => {
    renderWithProviders(
      <SearchAutocomplete
        onSearchChange={mockOnSearchChange}
        options={options}
        search='Tutor: John Doe'
        setSearch={mockSetSearch}
        textFieldProps={textFieldProps}
      />
    )

    const clearButton = screen.getByTestId('ClearIcon').closest('button')
    await userEvent.click(clearButton)

    expect(mockSetSearch).toHaveBeenCalledWith('')
    expect(mockOnSearchChange).toHaveBeenCalled()
  })

  it('triggers search on search button click', async () => {
    renderWithProviders(
      <SearchAutocomplete
        onSearchChange={mockOnSearchChange}
        options={options}
        search=''
        setSearch={mockSetSearch}
        textFieldProps={textFieldProps}
      />
    )

    const input = screen.getByLabelText('Search')
    await userEvent.type(input, 'Bob')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await userEvent.click(searchButton)

    expect(mockSetSearch).toHaveBeenCalledWith('Bob')
    expect(mockOnSearchChange).toHaveBeenCalled()
  })
})
