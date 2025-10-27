import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import Categories from '~/pages/categories/Categories'
import { vi } from 'vitest'

const mockCategories = [
  {
    _id: '1',
    name: 'Mathematics',
    appearance: { icon: 'math-icon.svg', color: '#FFD700' },
    totalOffers: { student: 15, tutor: 10 },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '2',
    name: 'Marketing',
    appearance: { icon: 'marketing-icon.svg', color: '#FF6B6B' },
    totalOffers: { student: 8, tutor: 5 },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

vi.mock('~/services/category-service', () => ({
  categoryService: {
    getCategories: vi.fn(() =>
      Promise.resolve({
        data: {
          count: mockCategories.length,
          items: mockCategories
        }
      })
    ),
    getCategoriesNames: vi.fn()
  }
}))

const mockOpenModal = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  return {
    ...actual,
    useModalContext: () => ({
      openModal: mockOpenModal,
      closeModal: vi.fn()
    })
  }
})

const getSearchInput = () =>
  screen.getByRole('combobox', { name: /categoriesPage.searchLabel/i })

describe('Categories component tests', () => {
  beforeEach(() => {
    renderWithProviders(<Categories />)
  })

  describe('Rendering', () => {
    it('should render all main elements', () => {
      const title = screen.getByText('categoriesPage.title')
      const description = screen.getByText('categoriesPage.description')
      const showAllLink = screen.getByText('categoriesPage.showAllOffers')
      const searchLabel = screen.getByText('categoriesPage.searchLabel')
      const offerRequestButton = screen.getByText(
        'findOffers.offerRequestBlock.button'
      )

      expect(title).toBeInTheDocument()
      expect(description).toBeInTheDocument()
      expect(showAllLink).toBeInTheDocument()
      expect(searchLabel).toBeInTheDocument()
      expect(offerRequestButton).toBeInTheDocument()
    })
  })

  describe('Search functionality', () => {
    it('should update search input and display results in dropdown and cards', async () => {
      const searchInput = getSearchInput()

      fireEvent.change(searchInput, { target: { value: 'Math' } })

      await waitFor(
        () => {
          expect(searchInput.value).toBe('Math')

          const mathOption = screen.getByRole('option', { name: 'Mathematics' })
          expect(mathOption).toBeInTheDocument()

          const mathCard = screen.getByText('Mathematics')
          expect(mathCard).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })

    it('should perform search when search button is clicked', async () => {
      const searchInput = getSearchInput()

      fireEvent.change(searchInput, { target: { value: 'Marketing' } })

      const searchButton = screen.getByText('common.search')
      fireEvent.click(searchButton)

      await waitFor(
        () => {
          const marketingOption = screen.queryByRole('option', {
            name: 'Marketing'
          })
          expect(marketingOption).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })

    it('should display multiple categories when partial match', async () => {
      const searchInput = getSearchInput()

      fireEvent.change(searchInput, { target: { value: 'Ma' } })

      await waitFor(
        () => {
          const mathCategory = screen.getByText('Mathematics')
          const marketingCategory = screen.getByText('Marketing')

          expect(mathCategory).toBeInTheDocument()
          expect(marketingCategory).toBeInTheDocument()
        },
        { timeout: 1000 }
      )
    })

    it('should handle empty and whitespace search gracefully', async () => {
      const searchInput = getSearchInput()
      const searchButton = screen.getByText('common.search')

      fireEvent.change(searchInput, { target: { value: '   ' } })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(searchInput.value).toBe('   ')
      })

      fireEvent.change(searchInput, { target: { value: '' } })
      fireEvent.click(searchButton)

      await waitFor(() => {
        expect(searchInput.value).toBe('')
      })
    })
  })
})
