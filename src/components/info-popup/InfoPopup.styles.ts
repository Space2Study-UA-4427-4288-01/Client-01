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
  BUTTON_SHADOW_HOVER: 'rgba(144, 164, 174, 0.16)'
} as const

const SIZES = {
  BORDER_RADIUS: '8px',
  ICON_SIZE: '96px',
  BUTTON_HEIGHT: '56px',
  CLOSE_BUTTON_SIZE: '48px',
  TITLE_FONT_SIZE: '24px',
  MESSAGE_FONT_SIZE: '16px',
  MESSAGE_LINE_HEIGHT: '24px',
  BUTTON_FONT_SIZE: '16px'
} as const

const SPACING = {
  SMALL: '12px',
  MEDIUM: '16px',
  LARGE: '24px',
  XLARGE: '32px',
  ICON_MARGIN_TOP: '65px',
  ICON_MARGIN_BOTTOM: '23px',
  TITLE_MARGIN_BOTTOM: '18px',
  MESSAGE_MARGIN_BOTTOM: '30px',
  BUTTON_MARGIN_BOTTOM: '50px'
} as const

export const styles = {
  dialogPaper: {
    borderRadius: SIZES.BORDER_RADIUS,
    width: { xs: '90vw', sm: '600px', md: '744px' },
    minHeight: '448px',
    maxHeight: '90vh',
    backgroundColor: COLORS.WHITE,
    boxShadow: `0px 8px 32px ${COLORS.SHADOW}`
  },
  backdrop: {
    backgroundColor: COLORS.BACKDROP,
    backdropFilter: 'blur(4px)'
  },
  dialogContent: {
    padding: `${SPACING.MEDIUM} ${SPACING.LARGE} 0 ${SPACING.LARGE}`,
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
  iconContainer: {
    marginTop: SPACING.ICON_MARGIN_TOP,
    marginBottom: SPACING.ICON_MARGIN_BOTTOM,
    marginLeft: '-10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoIcon: {
    width: SIZES.ICON_SIZE,
    height: SIZES.ICON_SIZE,
    display: 'block'
  },
  title: {
    marginBottom: SPACING.TITLE_MARGIN_BOTTOM,
    color: COLORS.TITLE,
    fontWeight: 500,
    fontSize: SIZES.TITLE_FONT_SIZE,
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
    marginBottom: SPACING.MESSAGE_MARGIN_BOTTOM,
    color: COLORS.MESSAGE,
    fontSize: SIZES.MESSAGE_FONT_SIZE,
    lineHeight: SIZES.MESSAGE_LINE_HEIGHT,
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
    backgroundColor: COLORS.BUTTON_BG,
    color: COLORS.WHITE,
    height: SIZES.BUTTON_HEIGHT,
    padding: `${SPACING.MEDIUM} ${SPACING.XLARGE}`,
    borderRadius: '4px',
    minWidth: '86px',
    fontSize: SIZES.BUTTON_FONT_SIZE,
    fontWeight: 500,
    fontFamily: 'Rubik, sans-serif',
    lineHeight: SIZES.BUTTON_FONT_SIZE,
    letterSpacing: '0.5px',
    textTransform: 'none',
    marginBottom: SPACING.BUTTON_MARGIN_BOTTOM,
    boxShadow: `0px 3px 16px ${COLORS.BUTTON_SHADOW}, 0px 9px 12px ${COLORS.BUTTON_SHADOW}`,
    '&:hover': {
      backgroundColor: COLORS.BUTTON_HOVER,
      boxShadow: `0px 3px 16px ${COLORS.BUTTON_SHADOW_HOVER}, 0px 9px 12px ${COLORS.BUTTON_SHADOW_HOVER}`
    },
    '&:active': {
      backgroundColor: COLORS.BUTTON_ACTIVE,
      transform: 'translateY(1px)'
    }
  }
} as const
