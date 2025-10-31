import { Box, Grid, Typography } from '@mui/material'
import loginImg from '~/assets/img/login-dialog/login.svg'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import useForm from '~/hooks/use-form'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useTranslation } from 'react-i18next'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import { ComponentEnum } from '~/types'
import { useEffect, useState } from 'react'
import { locationService } from '~/services/locations-service'
import { useSelector } from 'react-redux'
import { userService } from '~/services/user-service'
import { validations } from './GeneralInfoStep.constants'
import { useStepContext } from '~/context/step-context'

const GeneralInfoStep = ({ btnsBox, stepLabel, setIsStepInvalid }) => {
  const { userId, userRole } = useSelector((state) => state.appMain)
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [autocomleteKey, setAutocompleteKey] = useState(0)
  const { t } = useTranslation()
  const { handleStepData } = useStepContext()
  const {
    handleDataChange,
    handleSubmit,
    handleInputChange,
    handleBlur,
    data,
    errors
  } = useForm({
    onSubmit: async () => {
      handleStepData(stepLabel, data, errors)
      console.log(data)
      console.log(errors)
    },
    initialValues: {
      firstName: '',
      lastName: '',
      country: null,
      city: null,
      professionalSummary: ''
    },
    validations
  })
  useEffect(() => {
    userService.getUserById(userId, userRole).then((res) => {
      const { firstName, lastName } = res.data
      handleDataChange({ firstName, lastName })
    })
  }, [])
  useEffect(() => {
    if (data.country && data.country.id !== 0) {
      setLoading(true)
      handleDataChange({ ...data, city: null })
      setCities([])
      locationService.getCitiesByCountryId(data.country.id).then((res) => {
        let citiesList = res.data
          .map((city) => {
            return {
              label: city.name,
              id: city.id
            }
          })
          .filter(
            (city, index, arr) =>
              arr.findIndex((c) => c.label === city.label) === index
          )

        setCities(citiesList)
        setLoading(false)
      })
    }
  }, [data.country])
  useEffect(() => {
    const isStepInvalid = errors.firstName !== '' || errors.lastName !== ''
    setIsStepInvalid(isStepInvalid)
  }, [errors, setIsStepInvalid])
  const handleCountryChange = (event, newVal) => {
    const fakeEvent = {
      target: {
        name: 'country',
        value: newVal,
        type: 'text'
      }
    }
    handleInputChange('country')(fakeEvent)
  }
  const handleCityChange = (event, newVal) => {
    const fakeEvent = {
      target: {
        name: 'city',
        value: newVal,
        type: 'text'
      }
    }
    handleInputChange('city')(fakeEvent)
  }
  const handleCountryFocus = () => {
    locationService.getCountries().then((res) => {
      const countriesOptions = res.data.map((country) => {
        return {
          label: country.name,
          id: country.iso2
        }
      })
      setCountries(countriesOptions)
      setAutocompleteKey((prev) => prev + 1)
    })
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box>
        <Box
          component={ComponentEnum.Form}
          onSubmit={handleSubmit}
          sx={styles.formContainer}
        >
          <Typography sx={styles.stepTitle}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <AppTextField
                data-testid={'firstName'}
                errorMsg={t(errors.firstName)}
                label={t('common.labels.firstName')}
                onBlur={handleBlur('firstName')}
                onChange={handleInputChange('firstName')}
                required
                sx={styles.field}
                type='text'
                value={data.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <AppTextField
                data-testid={'lastName'}
                errorMsg={t(errors.lastName)}
                label={t('common.labels.lastName')}
                onBlur={handleBlur('lastName')}
                onChange={handleInputChange('lastName')}
                required
                sx={styles.field}
                type='text'
                value={data.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <AppAutoComplete
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                onBlur={handleBlur('country')}
                onChange={handleCountryChange}
                onFocus={handleCountryFocus}
                options={countries}
                textFieldProps={{ label: 'country' }}
                value={data.country}
              />
            </Grid>
            <Grid item xs={6}>
              <AppAutoComplete
                disabled={cities.length ? false : true}
                isOptionEqualToValue={(option, value) =>
                  option.id === value?.id
                }
                key={autocomleteKey}
                loading={loading}
                onBlur={handleBlur('city')}
                onChange={handleCityChange}
                options={cities}
                textFieldProps={{ label: 'city' }}
                value={data.city}
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextArea
                data-testid={'professionalSummary'}
                errorMsg={t(errors.lastName)}
                fullWidth
                label={t('common.labels.description')}
                maxLength={100}
                onBlur={handleBlur('professionalSummary')}
                onChange={handleInputChange('professionalSummary')}
                value={data.professionalSummary}
              />
            </Grid>
          </Grid>
          <Typography sx={styles.formLegend}>
            Inputs with the * sign are required
          </Typography>
        </Box>
        <Box sx={styles.btnsRow}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
