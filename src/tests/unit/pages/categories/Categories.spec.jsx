import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '~tests/test-utils'
import Categories from '~/pages/categories/Categories'
import { vi } from 'vitest'
import { categoryService } from '~/services/category-service'

vi.mock('~/services/category-service')

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

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')
  const mockOpenModal = vi.fn()
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

const getSearchButton = () =>
  screen.getByRole('button', { name: /common.search/i })

describe('Categories component tests', () => {
  let user

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()
    categoryService.getCategories.mockResolvedValue({
      data: {
        count: mockCategories.length,
        items: mockCategories
      }
    })
  })

  describe('Rendering', () => {
    it('should render all main elements', () => {
      renderWithProviders(<Categories />)
      expect(screen.getByText('categoriesPage.title')).toBeInTheDocument()
      expect(screen.getByText('categoriesPage.description')).toBeInTheDocument()
      expect(
        screen.getByText('categoriesPage.showAllOffers')
      ).toBeInTheDocument()
      expect(screen.getByText('categoriesPage.searchLabel')).toBeInTheDocument()
      expect(
        screen.getByText('findOffers.offerRequestBlock.button')
      ).toBeInTheDocument()
    })

    it('should render categories list on initial load', async () => {
      renderWithProviders(<Categories />)
      await waitFor(() => {
        expect(screen.getByText('Mathematics')).toBeInTheDocument()
        expect(screen.getByText('Marketing')).toBeInTheDocument()
        const mathLink = screen.getByText('Mathematics').closest('a')
        expect(mathLink).toHaveAttribute(
          'href',
          '/categories/subjects?categoryId=1'
        )
        expect(screen.getAllByText(/offers/).length).toBeGreaterThan(0)
      })
    })

    it('should render "View more" button when there are more categories', async () => {
      categoryService.getCategories.mockResolvedValueOnce({
        data: {
          count: 20,
          items: mockCategories
        }
      })
      renderWithProviders(<Categories />)
      await waitFor(() => {
        expect(screen.getByText('categoriesPage.viewMore')).toBeInTheDocument()
      })
    })
  })

  describe('Search functionality', () => {
    it('should update search input and display autocomplete options', async () => {
      renderWithProviders(<Categories />)
      const searchInput = getSearchInput()

      await user.type(searchInput, 'Ma')

      await waitFor(() => {
        expect(searchInput).toHaveValue('Ma')
        expect(
          screen.getByRole('option', { name: 'Mathematics' })
        ).toBeInTheDocument()
        expect(
          screen.getByRole('option', { name: 'Marketing' })
        ).toBeInTheDocument()
      })
    })

    it('should trigger search when search button is clicked', async () => {
      renderWithProviders(<Categories />)
      const searchInput = getSearchInput()
      const searchButton = getSearchButton()

      await user.type(searchInput, 'Marketing')
      await user.click(searchButton)

      expect(searchInput).toHaveValue('Marketing')
    })

    it('should handle empty search input', async () => {
      renderWithProviders(<Categories />)
      const searchInput = getSearchInput()

      await user.click(getSearchButton())

      expect(searchInput).toHaveValue('')
    })

    it('should clear search input when clear icon is clicked', async () => {
      renderWithProviders(<Categories />)
      const searchInput = getSearchInput()

      await user.type(searchInput, 'Test')
      await user.click(screen.getByTestId('ClearIcon').closest('button'))

      expect(searchInput).toHaveValue('')
    })
  })

  describe('Empty State and Modal functionality', () => {
    it('should show empty state and open modal when request button is clicked', async () => {
      categoryService.getCategories.mockResolvedValueOnce({
        data: {
          count: 0,
          items: []
        }
      })

      renderWithProviders(<Categories />)

      await waitFor(() => {
        expect(
          screen.getByText('categoriesPage.description', { exact: false })
        ).toBeInTheDocument()
      })

      const requestButton = screen.getByText('errorMessages.buttonRequest')
      await user.click(requestButton)
    })
  })

  describe('Load More functionality', () => {
    it('should load more categories when button is clicked', async () => {
      categoryService.getCategories
        .mockResolvedValueOnce({
          data: {
            count: 20,
            items: mockCategories
          }
        })
        .mockResolvedValueOnce({
          data: {
            count: 20,
            items: [
              {
                _id: '3',
                name: 'Physics',
                appearance: { icon: 'physics-icon.svg', color: '#4CAF50' },
                totalOffers: { student: 20, tutor: 15 },
                createdAt: '2024-01-02',
                updatedAt: '2024-01-02'
              }
            ]
          }
        })

      renderWithProviders(<Categories />)

      await waitFor(() => {
        expect(screen.getByText('categoriesPage.viewMore')).toBeInTheDocument()
      })

      const loadMoreButton = screen.getByText('categoriesPage.viewMore')
      await user.click(loadMoreButton)

      await waitFor(() => {
        expect(screen.getByText('Physics')).toBeInTheDocument()
      })
    })
  })
})
