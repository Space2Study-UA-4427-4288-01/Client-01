export const styles = {
  pageWrapper: {
    px: { xs: '20px', sm: '40px', md: '65px' }
  },
  titleWithDescription: {
    wrapper: {
      mt: { xs: '20px', sm: '25px', md: '30px' },
      mb: 0,
      textAlign: 'center'
    },
    title: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: { xs: '24px', sm: '28px', md: '32px' },
      lineHeight: '100%',
      letterSpacing: '0.05px',
      color: '#263238',
      textAlign: 'center',
      marginBottom: { xs: '8px', sm: '10px' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: { xs: '8px', sm: '10px' },
    color: 'primary.500',
    textDecoration: 'none',
    m: { xs: '0 5px 10px 0', sm: '0 8px 12px 0', md: '0 10px 5px 0' }
  },
  searchToolbar: {
    borderRadius: '70px',
    mb: { xs: '20px', sm: '25px', md: '30px' }
  }
}
