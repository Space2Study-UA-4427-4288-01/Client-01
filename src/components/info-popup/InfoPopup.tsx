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
import InfoIcon from '~/assets/img/guest-home-page/info.svg'
import { styles } from '~/components/info-popup/InfoPopup.styles'

interface InfoPopupProps {
  email: string
  onClose: () => void
  open: boolean
}

const InfoPopup: FC<InfoPopupProps> = ({ email, onClose, open }) => {
  const { t } = useTranslation()

  const handleBackdropClick = (
    _event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') {
      return
    }
    onClose()
  }

  return (
    <Dialog
      PaperProps={{ sx: styles.dialogPaper }}
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
          aria-label='Close info popup'
          data-testid='close-button'
          onClick={onClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Box
          alt='info'
          component='img'
          src={InfoIcon}
          sx={{ ...styles.iconContainer, ...styles.infoIcon }}
        />

        <Typography sx={styles.title} variant='h6'>
          {t('signup.confirmEmailTitle')}
        </Typography>

        <Typography sx={styles.message}>
          {t('signup.confirmEmailMessage')}
          <strong>{email}</strong>.{t('signup.confirmEmailDesc')}
        </Typography>

        <Button
          aria-label='Close popup and continue'
          data-testid='ok-button'
          onClick={onClose}
          sx={styles.okButton}
          variant='contained'
        >
          {t('common.confirmButton')}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InfoPopup
