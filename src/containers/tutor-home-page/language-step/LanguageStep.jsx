import Box from '@mui/material/Box'

import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { useTheme } from '@emotion/react'
import { useStepContext } from '~/context/step-context'

const ALL_LANGUAGES = [
  { title: 'English', value: 'en' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'French', value: 'fr' },
  { title: 'Spanish', value: 'es' },
  { title: 'Ukrainian', value: 'ua' },
  { title: 'Polish', value: 'pl' },
  { title: 'German', value: 'de' },
  { title: 'German', value: 'de' }
]

const LanguageStep = ({ btnsBox }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const [languages, setLanguages] = useState([])
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const { handleStepData } = useStepContext()

  const fetchLanguages = async ({ search = '', offset = 0, limit = 6 }) => {
    let filtered = ALL_LANGUAGES
    if (search) {
      filtered = filtered.filter((lang) =>
        lang.title.toLowerCase().startsWith(search.toLowerCase())
      )
    }
    return filtered.slice(offset, offset + limit)
  }

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const newLangs = await fetchLanguages({ search, offset, limit: 6 })
        setLanguages((prev) =>
          offset === 0 ? newLangs : [...prev, ...newLangs]
        )
      } catch (error) {
        console.error('Failed to load languages:', error)
      }
    }
    loadLanguages()
  }, [search, offset])

  const handleLanguageChange = (event, newValue) => {
    setSelectedLanguage(newValue)
    handleStepData('Language', newValue)
  }

  const handleInputChange = (event, value) => {
    setSearch(value)
    setOffset(0)
  }

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget

    if (
      listboxNode.scrollTop + listboxNode.clientHeight >=
      listboxNode.scrollHeight
    ) {
      setOffset((prev) => prev + 6)
    }
  }

  return (
    <Box sx={styles.container}>
      {!isMobile && (
        <Box sx={styles.imgContainer}>
          <Box component='img' src={img} sx={styles.img} />
        </Box>
      )}
      <Box sx={styles.rigthBox}>
        <Box>
          <Typography sx={styles.description} variant='h6'>
            Please select the language in which you would like to study and
            cooperate.
          </Typography>

          {isMobile && (
            <Box sx={styles.imgContainer}>
              <Box component='img' src={img} sx={styles.img} />
            </Box>
          )}

          <AppAutoComplete
            ListboxProps={{
              onScroll: handleScroll,
              style: { maxHeight: 205 }
            }}
            getOptionLabel={(option) => option.title || ''}
            onChange={handleLanguageChange}
            onInputChange={handleInputChange}
            options={languages}
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.title}
              </li>
            )}
            sx={styles.inputField}
            textFieldProps={{
              label: 'Your native language',
              placeholder: 'Your native language',
              variant: 'outlined'
            }}
            value={selectedLanguage}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
