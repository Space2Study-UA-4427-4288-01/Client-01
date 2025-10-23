import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: '40px',
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation,

    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px'
    }
  },

  imgContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  img: {
    width: '100%',
    maxWidth: '350px',
    height: 'auto',
    '@media (max-width: 1024px)': {
      maxWidth: '280px'
    },
    '@media (max-width: 600px)': {
      maxWidth: '220px'
    }
  },

  rightBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '420px',

    '@media (max-width: 1024px)': {
      alignItems: 'center',
      textAlign: 'center',
      maxWidth: '90%'
    }
  },

  description: {
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'left',
    '@media (max-width: 1024px)': {
      textAlign: 'center'
    }
  },

  dropdown: {
    width: '100%'
  }
}
