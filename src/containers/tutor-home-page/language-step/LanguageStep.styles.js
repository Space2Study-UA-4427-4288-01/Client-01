import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    mt: { xs: 2, md: 0 },
    maxWidth: { xs: '343px', md: '432px' },
    aspectRatio: { xs: '4/3', sm: 'auto' },
    pb: { xs: '16px', sm: '52px' }
  },
  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: { md: 0, xs: 1 },
    justifyContent: 'space-between',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  description: {
    mb: 2.5,
    color: 'text.medium',
    fontSize: { xs: '14px', sm: '16px' },
    fontWeight: 400,
    letterSpacing: '0.15px',
    lineHeight: 1.3
  },
  inputField: {
    flexGrow: { md: 1, xs: 1 }
  }
}
