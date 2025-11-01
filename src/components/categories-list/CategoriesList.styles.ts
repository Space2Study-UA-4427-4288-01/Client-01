export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    mt: { xs: '20px', sm: '25px', md: '30px' },
    '& > div:first-of-type > div:first-of-type': {
      gridTemplateColumns: {
        xs: 'repeat(1, minmax(264px, 1fr))',
        sm: 'repeat(2, minmax(264px, 1fr))',
        md: 'repeat(3, minmax(264px, 1fr))'
      }
    }
  }
}
