import { commonShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  dialogPaper: {
    borderRadius: '8px',
    width: { xs: '90vw', sm: '600px', md: '744px' },
    minHeight: '448px',
    maxHeight: '90vh',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow
  },
  backdrop: {
    backgroundColor: 'rgba(38, 50, 56, 0.75)',
    backdropFilter: 'blur(4px)'
  },
  dialogContent: {
    p: { xs: '16px 24px 0', sm: '16px 24px 0', md: '16px 24px 0' },
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '16px',
    width: '48px',
    height: '48px',
    minWidth: '48px',
    borderRadius: '100px',
    color: 'basic.black',
    backgroundColor: 'transparent',
    p: '12px',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '& .MuiSvgIcon-root': {
      fontSize: { xs: '18px', sm: '20px', md: '24px' }
    }
  },
  iconContainer: {
    mt: { xs: '40px', sm: '50px', md: '65px' },
    mb: { xs: '14px', sm: '17px', md: '20px' },
    mr: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoIcon: {
    width: { xs: '72px', sm: '84px', md: '96px' },
    height: { xs: '72px', sm: '84px', md: '96px' },
    display: 'block'
  },
  title: {
    mb: { xs: '8px', sm: '11px', md: '14px' },
    color: 'primary.900',
    fontWeight: 500,
    typography: {
      xs: TypographyVariantEnum.MidTitle,
      md: TypographyVariantEnum.H5
    },
    letterSpacing: '0px',
    textAlign: 'center',
    maxWidth: { xs: '280px', sm: '400px', md: '500px' },
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'unset',
    mr: '15px'
  },
  message: {
    mb: { xs: '20px', sm: '25px', md: '30px' },
    color: 'primary.600',
    typography: TypographyVariantEnum.Body1,
    textAlign: 'center',
    maxWidth: { xs: '300px', sm: '450px', md: '565px' },
    '& strong': {
      fontWeight: 500
    }
  },
  okButton: {
    backgroundColor: 'primary.900',
    color: 'basic.white',
    height: { xs: '48px', sm: '52px', md: '56px' },
    p: {
      xs: '12px 20px',
      sm: '14px 24px',
      md: '16px 32px'
    },
    borderRadius: '4px',
    minWidth: { xs: '70px', sm: '80px', md: '86px' },
    typography: TypographyVariantEnum.Body1,
    textTransform: 'none',
    mb: { xs: '40px', sm: '50px', md: '60px' },
    boxShadow: commonShadow,
    '&:hover': {
      backgroundColor: 'primary.800',
      boxShadow: commonShadow
    },
    '&:active': {
      backgroundColor: 'primary.700',
      transform: 'translateY(1px)'
    }
  }
}
