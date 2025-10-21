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
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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
          aria-label='Close email verification popup'
          data-testid='close-button'
          onClick={onClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Box
          alt='Email verification success icon'
          component='img'
          src={SuccessIcon}
          sx={{ ...styles.iconContainer, ...styles.successIcon }}
        />

        <Typography sx={styles.title} variant='h6'>
          {t('modals.emailConfirm')}
        </Typography>

        <Button
          data-testid='go-to-login-button'
          onClick={onGoToLogin}
          sx={styles.goToLoginButton}
          variant='contained'
        >
          {t('button.goToLogin')}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default EmailVerificationPopup
