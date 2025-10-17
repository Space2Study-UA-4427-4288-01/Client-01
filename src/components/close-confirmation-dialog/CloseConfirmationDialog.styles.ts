const COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TITLE: '#29313D',
  MESSAGE: '#666666',
  BUTTON_BG: '#263238',
  BUTTON_HOVER: '#1a2529',
  BUTTON_ACTIVE: '#0f1416',
  BACKDROP: 'rgba(38, 50, 56, 0.75)',
  HOVER_OVERLAY: 'rgba(0, 0, 0, 0.04)',
  SHADOW: 'rgba(0, 0, 0, 0.1)',
  BUTTON_SHADOW: 'rgba(144, 164, 174, 0.12)',
  BUTTON_SHADOW_HOVER: 'rgba(144, 164, 174, 0.16)',
  BORDER_COLOR: '#E0E0E0',
  BORDER_HOVER: '#BDBDBD'
} as const

const SIZES = {
  BORDER_RADIUS: '4px',
  BUTTON_HEIGHT: '56px',
  CLOSE_BUTTON_SIZE: '48px',
  TITLE_FONT_SIZE: '20px',
  MESSAGE_FONT_SIZE: '14px',
  MESSAGE_LINE_HEIGHT: '20px',
  BUTTON_FONT_SIZE: '16px'
} as const

const SPACING = {
  SMALL: '12px',
  MEDIUM: '16px',
  LARGE: '24px',
  XLARGE: '32px',
  TITLE_MARGIN_BOTTOM: '18px',
  MESSAGE_MARGIN_BOTTOM: '30px',
  BUTTON_MARGIN_BOTTOM: '50px',
  BUTTON_GAP: '16px'
} as const

export const styles = {
  dialogPaper: {
    borderRadius: SIZES.BORDER_RADIUS,
    width: { xs: '90vw', sm: '400px', md: '501px' },
    minHeight: { xs: '130px', sm: '140px', md: '140px' },
    maxHeight: '90vh',
    backgroundColor: COLORS.WHITE,
    boxShadow: `0px 8px 32px ${COLORS.SHADOW}`,
    margin: { xs: '16px', sm: '24px' }
  },
  backdrop: {
    backgroundColor: COLORS.BACKDROP,
    backdropFilter: 'blur(4px)'
  },
  dialogContent: {
    padding: { xs: '16px', sm: '19px', md: '19px' },
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: SPACING.MEDIUM,
    width: SIZES.CLOSE_BUTTON_SIZE,
    height: SIZES.CLOSE_BUTTON_SIZE,
    minWidth: SIZES.CLOSE_BUTTON_SIZE,
    borderRadius: '100px',
    color: COLORS.BLACK,
    backgroundColor: 'transparent',
    padding: SPACING.SMALL,
    '&:hover': {
      backgroundColor: COLORS.HOVER_OVERLAY
    },
    '& .MuiSvgIcon-root': {
      fontSize: SIZES.TITLE_FONT_SIZE
    }
  },
  title: {
    marginTop: '5px',
    marginBottom: { xs: '12px', sm: '16px', md: '20px' },
    color: '#424242',
    fontWeight: 600,
    fontSize: { xs: '18px', sm: '20px', md: '20px' },
    lineHeight: '120%',
    fontFamily: 'Rubik, sans-serif',
    letterSpacing: '0.2px',
    textAlign: 'left',
    maxWidth: 'none',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'unset',
    marginLeft: { xs: '5px', sm: '7px', md: '7px' }
  },
  message: {
    marginBottom: { xs: '16px', sm: '18px', md: '20px' },
    marginLeft: { xs: '5px', sm: '7px', md: '7px' },
    color: COLORS.MESSAGE,
    fontSize: { xs: '13px', sm: '14px', md: '14px' },
    lineHeight: { xs: '18px', sm: '20px', md: '20px' },
    letterSpacing: '0.1px',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    textAlign: 'left',
    maxWidth: 'none'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: { xs: 'center', sm: 'flex-end' },
    gap: { xs: '8px', sm: '7px', md: '7px' },
    marginBottom: '0px',
    marginRight: { xs: '0px', sm: '5px', md: '5px' },
    marginTop: 'auto',
    flexDirection: { xs: 'column', sm: 'row' }
  },
  confirmButton: {
    backgroundColor: COLORS.BUTTON_BG,
    color: COLORS.WHITE,
    height: { xs: '36px', sm: '40px', md: '40px' },
    padding: { xs: '4px 16px', sm: '5px 20px', md: '5px 20px' },
    borderRadius: '4px',
    minWidth: { xs: '80px', sm: '60px', md: '60px' },
    fontSize: { xs: '13px', sm: '14px', md: '14px' },
    fontWeight: 500,
    fontFamily: 'Rubik, sans-serif',
    lineHeight: { xs: '18px', sm: '20px', md: '20px' },
    letterSpacing: '0.5px',
    textTransform: 'none',
    boxShadow: `0px 3px 16px ${COLORS.BUTTON_SHADOW}, 0px 9px 12px ${COLORS.BUTTON_SHADOW}`,
    '&:hover': {
      backgroundColor: COLORS.BUTTON_HOVER,
      boxShadow: `0px 3px 16px ${COLORS.BUTTON_SHADOW_HOVER}, 0px 9px 12px ${COLORS.BUTTON_SHADOW_HOVER}`
    },
    '&:active': {
      backgroundColor: COLORS.BUTTON_ACTIVE,
      transform: 'translateY(1px)'
    }
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
    color: '#263238',
    height: { xs: '36px', sm: '40px', md: '40px' },
    padding: { xs: '4px 16px', sm: '5px 20px', md: '5px 20px' },
    borderRadius: '4px',
    minWidth: { xs: '80px', sm: '60px', md: '60px' },
    fontSize: { xs: '13px', sm: '14px', md: '14px' },
    fontWeight: 500,
    fontFamily: 'Rubik, sans-serif',
    lineHeight: { xs: '18px', sm: '20px', md: '20px' },
    letterSpacing: '0.5px',
    textTransform: 'none',
    border: 'none',
    '&:hover': {
      backgroundColor: '#BDBDBD',
      border: 'none'
    }
  }
} as const
