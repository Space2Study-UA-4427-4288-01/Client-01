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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  img: {
    width: '100%',
    maxWidth: { xs: '220px', sm: '280px', md: '350px' },
    height: 'auto'
  },

  rightBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '420px',
    alignItems: { xs: 'center', md: 'flex-start' },
    textAlign: { xs: 'center', md: 'left' },
    minHeight: { md: '350px' }
  },

  description: {
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: { xs: 'center', md: 'left' }
  },

  dropdownsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%'
  },

  dropdown: {
    width: '100%'
  },

  btnsBoxContainer: {
    mt: 'auto',
    width: '100%'
  }
}
