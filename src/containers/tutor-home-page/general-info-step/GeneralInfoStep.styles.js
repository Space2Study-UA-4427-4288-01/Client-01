import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  imgContainer: {
    width: '450px',
    maxWidth: { md: '50%', lg: '450px' },
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  formContainer: {
    width: '430px',
    minHeight: '420px',
    maxWidth: { lg: '430px' },
    '& .MuiGrid-item.MuiGrid-item': {
      paddingTop: '30px'
    }
  },
  stepTitle: {
    marginBottom: '10px'
  },
  btnsRow: {
    width: '430px',
    maxWidth: { lg: '430px' }
  },
  field: {
    mb: '5px',
    '& .MuiFormHelperText-root': {
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'unset',
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
      lineHeight: 1.15,
      marginBottom: '-22px'
    }
  },
  formLegend: {
    fontSize: '12px'
  }
}
