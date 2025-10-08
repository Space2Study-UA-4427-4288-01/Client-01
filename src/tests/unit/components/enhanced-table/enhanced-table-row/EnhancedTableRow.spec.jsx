import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it, vi } from 'vitest'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))
const user = userEvent.setup()

describe('EnhancedTableRow', () => {
  const props = {
    columns: [
      { field: 'name', label: 'Name' },
      { field: 'age', label: 'Age' }
    ],
    isSelection: true,
    item: { _id: '1', name: 'First Name', age: 29 },
    refetchData: vi.fn(),
    rowActions: [{ label: 'Some Action', func: vi.fn() }],
    onRowClick: vi.fn(),
    select: {
      isSelected: vi.fn().mockReturnValue(false),
      handleSelectClick: vi.fn()
    },
    selectedRows: []
  }

  const SELECTORS = {
    menuIcon: () => screen.getByTestId('menu-icon'),
    menu: () => screen.queryByRole('menu'),
    menuItems: () => screen.getAllByRole('menuitem'),
    menuItem: (name) => screen.getByRole('menuitem', { name })
  }

  beforeEach(() => {
    render(
      <table>
        <tbody>
          <EnhancedTableRow {...props} />
        </tbody>
      </table>
    )
  })

  it('should render table row with correct data', () => {
    expect(screen.getByText('First Name')).toBeInTheDocument()
    expect(screen.getByText('29')).toBeInTheDocument()
  })

  it('should call handleSelectClick when checkbox is clicked', async () => {
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(props.select.handleSelectClick).toBeCalledTimes(1)
    expect(props.select.handleSelectClick).toHaveBeenLastCalledWith(
      expect.any(Object),
      '1'
    )
  })

  it('should render action menu when menu icon is clicked', async () => {
    await user.click(SELECTORS.menuIcon())

    expect(SELECTORS.menu()).toBeInTheDocument()
    expect(SELECTORS.menuItems()).toHaveLength(props.rowActions.length)
    expect(SELECTORS.menuItems()[0]).toHaveTextContent('Some Action')
  })

  it('should call onAction function when clicking on the menu item', async () => {
    await user.click(SELECTORS.menuIcon())
    await user.click(SELECTORS.menuItem('Some Action'))

    expect(props.rowActions[0].func).toHaveBeenCalledWith('1')
    expect(props.refetchData).toHaveBeenCalled()
  })

  it('should close menu when "escape" is pressed', async () => {
    await user.click(SELECTORS.menuIcon())

    expect(screen.getByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(SELECTORS.menu()).not.toBeInTheDocument()
    })
  })
})
