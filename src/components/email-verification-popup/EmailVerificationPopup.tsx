import { FC } from 'react'
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  IconButton,
  Box
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import SuccessIcon from '~/assets/img/email-confirmation-modals/success-icon.svg'
import { styles } from './EmailVerificationPopup.styles'

interface EmailVerificationPopupProps {
  open: boolean
  onClose: () => void
  onGoToLogin: () => void
}

const EmailVerificationPopup: FC<EmailVerificationPopupProps> = ({
  open,
  onClose,
  onGoToLogin
}) => {
  const handleBackdropClick = (_event: unknown, reason: string) => {
    if (reason === 'backdropClick') {
      return
    }
    onClose()
  }

  return (
    <Dialog
      PaperProps={{
        sx: styles.dialogPaper
      }}
      fullWidth={false}
      maxWidth={false}
      onClose={handleBackdropClick}
      open={open}
      slotProps={{
        backdrop: {
          sx: styles.backdrop
        }
      }}
    >
      <DialogContent sx={styles.dialogContent}>
        <IconButton
          data-testid='close-button'
          onClick={onClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={styles.iconContainer}>
          <img alt='success' src={SuccessIcon} style={styles.successIcon} />
        </Box>

        <Typography sx={styles.title} variant='h6'>
          Email has been successfully verified!
        </Typography>

        <Button
          data-testid='go-to-login-button'
          onClick={onGoToLogin}
          sx={styles.goToLoginButton}
          variant='contained'
        >
          Go to login
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default EmailVerificationPopup
