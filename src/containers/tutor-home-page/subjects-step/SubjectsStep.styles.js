import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: '30px', md: '40px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    alignItems: { xs: 'center', md: 'stretch' },
    justifyContent: { xs: 'center', md: 'space-between' },
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
    fontSize: '14px',
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
