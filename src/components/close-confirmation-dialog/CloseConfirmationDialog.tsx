import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import { styles } from '~/components/close-confirmation-dialog/CloseConfirmationDialog.styles'

interface CloseConfirmationDialogProps {
  open: boolean
  onDismiss: () => void
}

const CloseConfirmationDialog: FC<CloseConfirmationDialogProps> = ({
  open,
  onDismiss
}) => {
  const navigate = useNavigate()

  const handleConfirmClose = useCallback(() => {
    onDismiss()
    navigate('/')
  }, [navigate, onDismiss])

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
      onDismiss()
    },
    [onDismiss]
  )

  return (
    <Dialog
      PaperProps={{ sx: styles.dialogPaper }}
      data-testid='closeConfirmationDialog'
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
          aria-label='Close confirmation dialog'
          data-testid='close-button'
          onClick={onDismiss}
          sx={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>

        <Typography sx={styles.title} variant='h6'>
          Please Confirm
        </Typography>

        <Typography sx={styles.message}>
          Are you certain you want to close? Any unsaved changes will be lost
        </Typography>

        <Box sx={styles.buttonsContainer}>
          <Button
            aria-label='Confirm close'
            data-testid='confirm-button'
            onClick={handleConfirmClose}
            sx={styles.confirmButton}
            variant='contained'
          >
            Yes
          </Button>
          <Button
            aria-label='Cancel close'
            data-testid='cancel-button'
            onClick={onDismiss}
            sx={styles.cancelButton}
            variant='outlined'
          >
            No
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CloseConfirmationDialog
