import { useCallback, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import Loader from '~/components/loader/Loader'
import CreateSubjectModal from '~/containers/find-offer/create-new-subject/CreateNewSubject'

import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import { useDebounce } from '~/hooks/use-debounce'
import useAxios from '~/hooks/use-axios'
import { defaultResponses } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { ItemsWithCount, CategoryInterface } from '~/types'
import { styles } from './Categories.styles'

const Categories = () => {
  const [match, setMatch] = useState<string>('')
  const searchRef = useRef<string>('')
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  // Search functionality - provides filtered categories data
  // Available for integration: response.items, loading, match
  // For use in "Implement list of categories block" task
  const getCategories = useCallback(
    () =>
      categoryService.getCategories({
        name: searchRef.current
      }),
    []
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<CategoryInterface>
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const debounceOnChange = useDebounce((text: string) => {
    searchRef.current = text
    void fetchData()
  })

  const handleSearchChange = useCallback(
    (value: string | ((prevState: string) => string)) => {
      const newValue = typeof value === 'function' ? value(match) : value
      setMatch(newValue)
      debounceOnChange(newValue)
    },
    [debounceOnChange, match]
  )

  const handleSearch = useCallback(() => {
    if (match.trim() && !loading) {
      searchRef.current = match.trim()
      void fetchData()
    }
  }, [match, fetchData, loading])

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
          onSearchChange={handleSearch}
          options={response?.items?.map((category) => category.name) || []}
          search={match}
          setSearch={handleSearchChange}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      {/* TODO: Цей блок буде замінений на CategoriesList компонент (task: Implement list of categories block) */}
      {/* ВАЖЛИВО: NotFoundResults має залишитися для показу коли нічого не знайдено при пошуку */}
      {/* Поточна реалізація - тимчасова, для демонстрації функціоналу пошуку */}
      {match && (
        <Box sx={styles.searchResults}>
          {loading ? (
            <Loader />
          ) : response?.items && response.items.length > 0 ? (
            <Box sx={styles.categoriesGrid}>
              {response.items.map((category: CategoryInterface) => (
                <CardWithLink
                  description={`${category.totalOffers?.student || 0} offers available`}
                  img={category.appearance?.icon || ''}
                  key={category._id}
                  link={`${authRoutes.categories.path}/${category._id}`}
                  title={category.name}
                />
              ))}
            </Box>
          ) : (
            <NotFoundResults
              buttonText={t('errorMessages.buttonRequest', {
                name: 'categories'
              })}
              description={t('errorMessages.tryAgainText', {
                name: 'categories'
              })}
              onClick={handleOpenModal}
            />
          )}
        </Box>
      )}
    </PageWrapper>
  )
}

export default Categories
