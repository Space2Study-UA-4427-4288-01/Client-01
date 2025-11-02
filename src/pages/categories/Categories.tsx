import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import CategoriesList from '~/components/categories-list/CategoriesList'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'

import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import useLoadMore from '~/hooks/use-load-more'
import useBreakpoints from '~/hooks/use-breakpoints'
import { itemsLoadLimit } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { CategoryInterface } from '~/types'
import { getScreenBasedLimit } from '~/utils/helper-functions'
import { styles } from './Categories.styles'

const Categories = () => {
  const [match, setMatch] = useState<string>('')
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const breakpoints = useBreakpoints()

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const params = useMemo(() => ({ name: match }), [match])

  const {
    data: categories,
    loading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, { name: string }>({
    service: categoryService.getCategories,
    limit: cardsLimit,
    params
  })

  const handleOpenModal = () => openModal({ component: <CreateSubjectModal /> })

  return (
    <PageWrapper sx={styles.pageWrapper}>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <Box sx={styles.showAllOffers}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize='small' />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          onSearchChange={resetData}
          options={categories?.map((category) => category.name) || []}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      <CategoriesList
        categories={categories}
        isExpandable={isExpandable}
        loading={loading}
        onLoadMore={loadMore}
        onRequestNewCategory={handleOpenModal}
        searchQuery={match}
      />
    </PageWrapper>
  )
}

export default Categories
