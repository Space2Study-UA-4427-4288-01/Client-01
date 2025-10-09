export const styles = {
  dialogPaper: {
    borderRadius: '8px',
    width: '744px',
    height: '448px',
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
    marginTop: '65px',
    marginBottom: '23px',
    marginLeft: '-10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoIcon: {
    width: '96px',
    height: '96px',
    display: 'block'
  },
  title: {
    marginBottom: '18px',
    color: '#29313D',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '120%',
    fontFamily: 'Rubik, sans-serif',
    letterSpacing: '0px',
    textAlign: 'center',
    maxWidth: '500px',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'unset',
    marginLeft: '-15px'
  },
  message: {
    marginBottom: '30px',
    color: '#666666',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    textAlign: 'center',
    maxWidth: '565px',
    '& strong': {
      fontWeight: 500,
      letterSpacing: '0.5px'
    }
  },
  okButton: {
    backgroundColor: '#263238',
    color: '#FFFFFF',
    height: '56px',
    padding: '16px 32px',
    borderRadius: '4px',
    minWidth: '86px',
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
