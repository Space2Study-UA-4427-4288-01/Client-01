import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, vi } from 'vitest'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('EnhancedTablePagination', () => {
  const pagination = {
    page: 1,
    pageInput: 1,
    rowsPerPage: 10,
    pageCount: 5,
    itemsCount: 50,
    handleChangePage: vi.fn(),
    handleChangeRowsPerPage: vi.fn(),
    handleChangePageInput: vi.fn(),
    handlePageSubmit: vi.fn()
  }

  beforeEach(() => {
    render(<EnhancedTablePagination pagination={pagination} />)
  })

  it('should render first page', () => {
    expect(screen.getByTestId('pagination-page-input')).toHaveValue(1)
    expect(screen.getByText(/table.of/)).toBeInTheDocument()
  })

  it('should change page from 1 to 2', async () => {
    const page2Button = screen.getByRole('button', { name: /Go to page 2/i })
    await userEvent.click(page2Button)

    expect(pagination.handleChangePage).toHaveBeenCalled()
  })
})
