import { FC, useCallback } from 'react'
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

const TEXTS = {
  TITLE: 'Your email address needs to be verified',
  MESSAGE_START: 'We sent a confirmation email to:',
  MESSAGE_END:
    'Check your email and click on the confirmation button to continue.',
  MESSAGE_WITHOUT_EMAIL:
    'Please check your email and click on the confirmation button to continue.',
  OK_BUTTON: 'OK',
  CLOSE_BUTTON_LABEL: 'Close info popup',
  OK_BUTTON_LABEL: 'Close popup and continue',
  INFO_ICON_ALT: 'info'
} as const

interface InfoPopupProps {
  email?: string
  onClose: () => void
  open: boolean
}

const InfoPopup: FC<InfoPopupProps> = ({ email, onClose, open }) => {
  const handleBackdropClick = useCallback(
    (
      _event:
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>,
      reason: 'backdropClick' | 'escapeKeyDown'
    ) => {
      if (reason === 'backdropClick') {
        return
      }
      onClose()
    },
    [onClose]
  )

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
          aria-label={TEXTS.CLOSE_BUTTON_LABEL}
          data-testid='close-button'
          onClick={onClose}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={styles.iconContainer}>
          <img
            alt={TEXTS.INFO_ICON_ALT}
            src={InfoIcon}
            style={styles.infoIcon}
          />
        </Box>

        <Typography sx={styles.title} variant='h6'>
          {TEXTS.TITLE}
        </Typography>

        <Typography sx={styles.message}>
          {email ? (
            <>
              {TEXTS.MESSAGE_START} <strong>{email}</strong>.{' '}
              {TEXTS.MESSAGE_END}
            </>
          ) : (
            TEXTS.MESSAGE_WITHOUT_EMAIL
          )}
        </Typography>

        <Button
          aria-label={TEXTS.OK_BUTTON_LABEL}
          data-testid='ok-button'
          onClick={onClose}
          sx={styles.okButton}
          variant='contained'
        >
          {TEXTS.OK_BUTTON}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InfoPopup
