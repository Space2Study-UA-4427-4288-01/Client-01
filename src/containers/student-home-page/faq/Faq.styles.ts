import {
  commonShadow,
  commonHoverShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: {
    flexDirection: 'column',
    maxWidth: '1128px',
    gap: { xs: '30px', sm: '40px', md: '50px' },
    mx: 'auto',
    mt: { xs: '40px', sm: '50px', md: '60px' },
    mb: 0,
    pb: { xs: 6, sm: 8, md: 10 },
    px: { xs: '20px', sm: '40px', md: 0 }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'center',
      maxWidth: '1128px',
      gap: '8px',
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: { xs: '24px', sm: '28px', md: '32px' },
      lineHeight: '100%',
      letterSpacing: '0.25%',
      textAlign: 'center',
      color: '#263238'
    },
    description: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: { xs: '14px', sm: '15px', md: '16px' },
      lineHeight: { xs: '20px', sm: '22px', md: '24px' },
      letterSpacing: '0.5px',
      textAlign: 'center',
      color: '#263238'
    }
  },
  accordion: {
    withIcon: {
      root: {
        maxWidth: { xs: '100%', md: '928px' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '12px', sm: '14px', md: '16px' }
      },
      accordion: {
        width: { xs: '100%', md: '928px' },
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
        '&::before': { display: 'none' }
      },
      inactive: {
        '&:hover': {
          boxShadow: '0px 3px 16px 2px rgba(144, 164, 174, 0.18)'
        }
      },
      summary: {
        p: { xs: '16px 20px', sm: '20px 24px', md: '24px 32px' },
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '16px', sm: '20px', md: '24px' },
        '& .MuiAccordionSummary-content': {
          m: 0,
          flex: 1
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
          ml: 0
        }
      },
      titleActive: {
        color: 'primary.900',
        width: '100%',
        maxWidth: '864px',
        fontSize: { xs: '16px', sm: '17px', md: '18px' },
        lineHeight: { xs: '24px', sm: '26px', md: '28px' },
        letterSpacing: '1.2px',
        fontWeight: 500
      },
      titleInactive: {
        color: 'primary.900',
        width: '100%',
        maxWidth: '864px',
        fontSize: { xs: '16px', sm: '17px', md: '18px' },
        lineHeight: { xs: '24px', sm: '26px', md: '28px' },
        letterSpacing: '1.2px',
        fontWeight: 500
      },
      details: {
        p: { xs: '16px 20px', sm: '20px 24px', md: '24px 32px' },
        pt: 0
      },
      description: {
        color: 'primary.700',
        fontSize: { xs: '14px', sm: '15px', md: '16px' },
        lineHeight: { xs: '20px', sm: '22px', md: '24px' },
        fontWeight: 400
      },
      active: {
        boxShadow: commonShadow,
        backgroundColor: 'basic.white',
        '&:hover': { boxShadow: commonHoverShadow }
      }
    }
  }
}
