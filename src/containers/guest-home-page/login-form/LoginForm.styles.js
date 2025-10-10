export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  field: {
    mb: '5px',
    '& .MuiFormHelperText-root': {
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'unset',
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
      lineHeight: 1.15,
      marginBottom: '8px'
    }
  },
  input: {
    maxWidth: '343px'
  },
  loginButton: {
    width: '100%',
    py: '14px'
  },
  forgotPass: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'primary.900',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    },
    mb: '20px',
    alignSelf: 'end'
  }
}
