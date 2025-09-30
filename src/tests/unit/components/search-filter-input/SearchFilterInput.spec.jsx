import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'

describe('SearchFilterInput', () => {
  let updateFilter

  const getInput = () => screen.getByRole('textbox')
  const getSearchButton = () => screen.getByRole('button', { name: 'common.search' })

  beforeEach(() => {
    updateFilter = vi.fn()
    window.history.pushState({}, '', '/test-path')

    render(
      <SearchFilterInput
        updateFilter={updateFilter}
        textFieldProps={{ placeholder: 'type here' }}
      />
    )
  })

  it('should render component with input in it', () => {
    expect(getInput()).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    const input = getInput()
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(input).toHaveValue('hello')
  })

  it('should delete typed text when delete button is clicked', () => {
    const input = getInput()
    fireEvent.change(input, { target: { value: 'to be cleared' } })

    const clearBtn = screen.getByTestId('clearIcon')
    fireEvent.click(clearBtn)

    expect(input).toHaveValue('')
    expect(updateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function on search button click', () => {
    const input = getInput()
    fireEvent.change(input, { target: { value: 'query' } })

    const searchButton = getSearchButton()
    fireEvent.click(searchButton)

    expect(updateFilter).toHaveBeenCalledWith('query')
  })

  it('should call updateFilter function when enter is pressed', () => {
    const input = getInput()
    fireEvent.change(input, { target: { value: 'enter query' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(updateFilter).toHaveBeenCalledWith('enter query')
  })
})
