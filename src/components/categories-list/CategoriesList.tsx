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

import icon1 from '~/assets/icons/categories/service_icon_1.svg'
import icon2 from '~/assets/icons/categories/service_icon_2.svg'
import icon3 from '~/assets/icons/categories/service_icon_3.svg'
import icon4 from '~/assets/icons/categories/service_icon_4.svg'
import icon5 from '~/assets/icons/categories/service_icon_5.svg'
import icon6 from '~/assets/icons/categories/service_icon_6.svg'
import icon7 from '~/assets/icons/categories/service_icon_7.svg'
import icon8 from '~/assets/icons/categories/service_icon_8.svg'
import icon9 from '~/assets/icons/categories/service_icon_9.svg'
import icon10 from '~/assets/icons/categories/service_icon_10.svg'
import icon11 from '~/assets/icons/categories/service_icon_11.svg'
import icon12 from '~/assets/icons/categories/service_icon_12.svg'

import { styles } from '~/components/categories-list/CategoriesList.styles'

const categoryIcons = [
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  icon9,
  icon10,
  icon11,
  icon12
]

export const getCategoryIcon = (id: string): string => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return categoryIcons[hash % categoryIcons.length]
}

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

  const categoryCards = useMemo(() => {
    const oppositeRole = getOpositeRole(userRole)
    return categories.map((category: CategoryInterface) => (
      <CardWithLink
        description={`${category.totalOffers?.[oppositeRole] || 0} ${t('categoriesPage.offers')}`}
        img={category.appearance?.icon || getCategoryIcon(category._id)}
        key={category._id}
        link={`${authRoutes.subjects.path}?categoryId=${category._id}`}
        title={category.name}
      />
    ))
  }, [categories, userRole, t])

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
