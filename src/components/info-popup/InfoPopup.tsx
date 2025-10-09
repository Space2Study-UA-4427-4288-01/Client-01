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
import InfoIcon from '~/assets/img/guest-home-page/info.svg'
import { styles } from '~/components/info-popup/InfoPopup.styles'

interface InfoPopupProps {
  email?: string
  message: string
  onClose: () => void
  open: boolean
  title: string
}

const InfoPopup: FC<InfoPopupProps> = ({
  email,
  message,
  onClose,
  open,
  title
}) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      return
    }
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
          <img alt='info' src={InfoIcon} style={styles.infoIcon} />
        </Box>

        <Typography sx={styles.title} variant='h6'>
          {title}
        </Typography>

        <Typography sx={styles.message}>
          {message}
          {email && <strong> {email}</strong>}. Check your email and click on
          the confirmation button to continue.
        </Typography>

        <Button
          data-testid='ok-button'
          onClick={onClose}
          sx={styles.okButton}
          variant='contained'
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InfoPopup
