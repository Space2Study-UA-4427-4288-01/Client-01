import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import AppChipList from '~/components/app-chips-list/AppChipList'

const makeItems = (count) =>
  Array.from({ length: count }, (_, i) => `Item-${i + 1}`)

describe('AppChipList', () => {
  it('should show chips', () => {
    const items = makeItems(3)
    const quantity = 5

    render(<AppChipList defaultQuantity={quantity} items={items} />)

    expect(screen.getByText('Item-1')).toBeInTheDocument()
    expect(screen.getByText('Item-2')).toBeInTheDocument()
    expect(screen.getByText('Item-3')).toBeInTheDocument()
  })

  it('should show chip with +3', () => {
    const items = makeItems(8)
    const quantity = 5

    render(<AppChipList defaultQuantity={quantity} items={items} />)

    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })

  it('should show only 7 chips', () => {
    const items = makeItems(10)
    const quantity = 7

    render(<AppChipList defaultQuantity={quantity} items={items} />)

    expect(screen.getAllByTestId('chip')).toHaveLength(7)
    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+3')
  })

  it('should show only 10 chips', () => {
    const items = makeItems(11)
    const quantity = 10

    render(<AppChipList defaultQuantity={quantity} items={items} />)

    expect(screen.getAllByTestId('chip')).toHaveLength(10)
    expect(screen.getByTestId('amount-of-chips')).toHaveTextContent('+1')
  })

  it('should delete 1 chip', async () => {
    const user = userEvent.setup()
    const handleDelete = vi.fn()
    const items = makeItems(3)
    const quantity = 5

    render(
      <AppChipList
        defaultQuantity={quantity}
        handleChipDelete={handleDelete}
        items={items}
      />
    )

    const closeButton = screen.getAllByTestId('close-btn')[0]
    await user.click(closeButton)

    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleDelete).toHaveBeenCalledWith('Item-1')
  })
})
