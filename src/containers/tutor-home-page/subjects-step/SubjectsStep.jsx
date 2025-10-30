import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { categoriesMock } from './constants.js'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt={t('becomeTutor.categories.imageAlt')}
          component='img'
          src={img}
          sx={styles.img}
        />
      </Box>

      <Box sx={styles.rightBox}>
        <Typography sx={styles.description} variant='body1'>
          {t('becomeTutor.categories.title')}
        </Typography>

        <Autocomplete
          disablePortal
          getOptionLabel={(option) => option.name}
          options={categoriesMock}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('becomeTutor.categories.mainSubjectsLabel')}
              placeholder={t('becomeTutor.categories.mainSubjectsLabel')}
            />
          )}
          sx={styles.dropdown}
        />

        <Box mt='auto' sx={{ width: '100%' }}>
          {btnsBox}
        </Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
