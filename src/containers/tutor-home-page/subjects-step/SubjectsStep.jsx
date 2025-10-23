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
        <Box alt='Study category' component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rightBox}>
        <Typography sx={styles.description} variant='body1'>
          {t.title}
        </Typography>

        <Autocomplete
          disablePortal
          getOptionLabel={(option) => option.name}
          options={categoriesMock}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t.mainSubjectsLabel}
              placeholder={t.mainSubjectsLabel}
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
