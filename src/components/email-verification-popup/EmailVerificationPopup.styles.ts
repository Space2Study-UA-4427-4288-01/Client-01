export const styles = {
    dialogPaper: {
      borderRadius: '8px',
      width: { xs: '90vw', sm: '600px', md: '744px' },
      minHeight: '396px',
      maxHeight: '90vh',
      margin: '16px',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)'
    },
    backdrop: {
      backgroundColor: 'rgba(38, 50, 56, 0.75)',
      backdropFilter: 'blur(4px)'
    },
    dialogContent: {
      padding: '16px 24px 0 24px',
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
      color: '#000000',
      backgroundColor: 'transparent',
      padding: '12px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      },
      '& .MuiSvgIcon-root': {
        fontSize: '24px'
      }
    },
    iconContainer: {
      marginTop: '78px',
      marginBottom: '24px',
      marginRight: '7px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    successIcon: {
      width: '75px',
      height: '75px',
      display: 'block'
    },
    title: {
      marginTop: '10px',
      marginBottom: '30px',
      marginLeft: '6px',
      color: '#29313D',
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '120%',
      fontFamily: 'Rubik, sans-serif',
      letterSpacing: '0px',
      textAlign: 'center',
      maxWidth: '600px',
      wordWrap: 'break-word',
      hyphens: 'auto'
    },
    goToLoginButton: {
      backgroundColor: '#263238',
      color: '#FFFFFF',
      height: '56px',
      padding: '16px 32px',
      borderRadius: '4px',
      minWidth: '152px',
      fontSize: '16px',
      fontWeight: 500,
      fontFamily: 'Rubik, sans-serif',
      lineHeight: '24px',
      letterSpacing: '0.5px',
      textTransform: 'none',
      
      marginBottom: '50px',
      boxShadow:
        '0px 3px 16px rgba(144, 164, 174, 0.12), 0px 9px 12px rgba(144, 164, 174, 0.14)',
      '&:hover': {
        backgroundColor: '#1a2529',
        boxShadow:
          '0px 3px 16px rgba(144, 164, 174, 0.16), 0px 9px 12px rgba(144, 164, 174, 0.18)'
      },
      '&:active': {
        backgroundColor: '#0f1416',
        transform: 'translateY(1px)'
      }
    }
  } as const
