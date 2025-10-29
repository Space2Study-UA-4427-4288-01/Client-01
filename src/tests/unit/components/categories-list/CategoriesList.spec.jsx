import { screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'

import CategoriesList from '~/components/categories-list/CategoriesList'
import { renderWithProviders } from '~tests/test-utils'
import { UserRoleEnum } from '~/types'

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
    name: 'English',
    appearance: { icon: 'english-icon.svg', color: '#4CAF50' },
    totalOffers: { student: 20, tutor: 8 },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    _id: '3',
    name: 'Physics',
    appearance: { icon: 'physics-icon.svg', color: '#FF5722' },
    totalOffers: { student: 12, tutor: 6 },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
]

const createMockState = (role) => ({
  appMain: {
    userRole: role,
    userId: 'test-id',
    _id: 'test-id'
  }
})

const defaultProps = {
  categories: mockCategories,
  loading: false,
  isExpandable: true,
  onLoadMore: vi.fn(),
  searchQuery: '',
  onRequestNewCategory: vi.fn()
}

const emptyProps = {
  ...defaultProps,
  categories: [],
  loading: false
}

describe('CategoriesList component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render list of categories', () => {
      renderWithProviders(<CategoriesList {...defaultProps} />)

      expect(screen.getByText('Mathematics')).toBeInTheDocument()
      expect(screen.getByText('English')).toBeInTheDocument()
      expect(screen.getByText('Physics')).toBeInTheDocument()
    })

    it('should render categories with correct links to subjects page', () => {
      const { container } = renderWithProviders(
        <CategoriesList {...defaultProps} />
      )

      const links = container.querySelectorAll('a')
      expect(links[0]).toHaveAttribute(
        'href',
        '/categories/subjects?categoryId=1'
      )
      expect(links[1]).toHaveAttribute(
        'href',
        '/categories/subjects?categoryId=2'
      )
      expect(links[2]).toHaveAttribute(
        'href',
        '/categories/subjects?categoryId=3'
      )
    })
  })

  describe('User Roles', () => {
    it('should display correct number of offers for student role', () => {
      renderWithProviders(<CategoriesList {...defaultProps} />, {
        preloadedState: createMockState(UserRoleEnum.Student)
      })

      expect(screen.getByText(/10/)).toBeInTheDocument()
      expect(screen.getByText(/8/)).toBeInTheDocument()
      expect(screen.getByText(/6/)).toBeInTheDocument()
    })

    it('should display correct number of offers for tutor role', () => {
      renderWithProviders(<CategoriesList {...defaultProps} />, {
        preloadedState: createMockState(UserRoleEnum.Tutor)
      })

      expect(screen.getByText(/15/)).toBeInTheDocument()
      expect(screen.getByText(/20/)).toBeInTheDocument()
      expect(screen.getByText(/12/)).toBeInTheDocument()
    })
  })

  describe('Pagination', () => {
    it('should show "View more" button when isExpandable is true', () => {
      renderWithProviders(<CategoriesList {...defaultProps} />)

      expect(screen.getByText('categoriesPage.viewMore')).toBeInTheDocument()
    })

    it('should hide "View more" button when isExpandable is false', () => {
      renderWithProviders(
        <CategoriesList {...defaultProps} isExpandable={false} />
      )

      expect(
        screen.queryByText('categoriesPage.viewMore')
      ).not.toBeInTheDocument()
    })

    it('should call onLoadMore when "View more" button is clicked', async () => {
      renderWithProviders(<CategoriesList {...defaultProps} />)

      fireEvent.click(screen.getByText('categoriesPage.viewMore'))

      await waitFor(() => {
        expect(defaultProps.onLoadMore).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Empty State', () => {
    it('should show NotFoundResults when no categories', () => {
      renderWithProviders(
        <CategoriesList {...emptyProps} searchQuery='NonexistentCategory' />
      )

      expect(
        screen.getByText('errorMessages.tryAgainText', { exact: false })
      ).toBeInTheDocument()
    })

    it('should call onRequestNewCategory when request button clicked', async () => {
      renderWithProviders(<CategoriesList {...emptyProps} />)

      const requestButton = screen.getByText('errorMessages.buttonRequest', {
        exact: false
      })
      fireEvent.click(requestButton)

      await waitFor(() => {
        expect(defaultProps.onRequestNewCategory).toHaveBeenCalledTimes(1)
      })
    })

    it('should not show categories when loading', () => {
      renderWithProviders(<CategoriesList {...emptyProps} loading />)

      expect(screen.queryByText('Mathematics')).not.toBeInTheDocument()
    })
  })
})
