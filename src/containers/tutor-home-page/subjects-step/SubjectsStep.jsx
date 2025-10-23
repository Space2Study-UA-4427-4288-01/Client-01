import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import en from '~/constants/translations/en/become-tutor.json'
import { categoriesMock } from './constants.js'

const SubjectsStep = ({ btnsBox }) => {
  const t = en.categories

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} alt='Study category' />
      </Box>

      <Box sx={styles.rightBox}>
        <Typography variant='body1' sx={styles.description}>
          {t.title}
        </Typography>

        <Autocomplete
          disablePortal
          options={categoriesMock}
          getOptionLabel={(option) => option.name}
          sx={styles.dropdown}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t.mainSubjectsLabel}
              placeholder={t.mainSubjectsLabel}
            />
          )}
        />

        <Box sx={{ mt: 'auto', width: '100%' }}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
