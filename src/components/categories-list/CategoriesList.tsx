import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

import { useAppSelector } from '~/hooks/use-redux'
import { authRoutes } from '~/router/constants/authRoutes'
import { getOpositeRole } from '~/utils/helper-functions'
import { CategoryInterface } from '~/types'

import { styles } from '~/components/categories-list/CategoriesList.styles'

interface CategoriesListProps {
  categories: CategoryInterface[]
  loading: boolean
  isExpandable: boolean
  onLoadMore: () => void
  searchQuery: string
  onRequestNewCategory: () => void
}

const CategoriesList: FC<CategoriesListProps> = ({
  categories,
  loading,
  isExpandable,
  onLoadMore,
  searchQuery,
  onRequestNewCategory
}) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  const categoryCards = useMemo(
    () => {
      const oppositeRole = getOpositeRole(userRole)

      return categories.map((category: CategoryInterface) => (
        <CardWithLink
          description={`${category.totalOffers?.[oppositeRole] || 0} ${t('categoriesPage.offers')}`}
          img={category.appearance?.icon || ''}
          key={category._id}
          link={`${authRoutes.subjects.path}?categoryId=${category._id}`}
          title={category.name}
        />
      ))
    },
    [categories, userRole, t]
  )

  if (!categories.length && !loading) {
    return (
      <Box sx={styles.container}>
        <NotFoundResults
          buttonText={t('errorMessages.buttonRequest', { name: 'categories' })}
          description={
            searchQuery
              ? t('errorMessages.tryAgainText', { name: 'categories' })
              : t('categoriesPage.description')
          }
          onClick={onRequestNewCategory}
        />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={categoryCards}
        isExpandable={isExpandable}
        loading={loading}
        onClick={onLoadMore}
      />
    </Box>
  )
}

export default CategoriesList
