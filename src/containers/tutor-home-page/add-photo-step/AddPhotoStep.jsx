import { CloudUpload } from '@mui/icons-material'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'
import { validationData } from './constants'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import { filesValidation } from '~/utils/validations/files'
import { useStepContext } from '~/context/step-context'

const AddPhotoStep = ({ btnsBox }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()
  const inputRef = useRef(null)

  const { stepData, handleStepData } = useStepContext()
  const rawPhoto = stepData?.photo
  const photoFile = Array.isArray(rawPhoto)
    ? rawPhoto[0] ?? null
    : rawPhoto ?? null

  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!photoFile) {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
      return
    }

    const objUrl = URL.createObjectURL(photoFile)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return objUrl
    })

    return () => {
      URL.revokeObjectURL(objUrl)
    }
  }, [photoFile])

  const emitter = ({ files: newFiles, error: errKey }) => {
    if (errKey) {
      setError(t(errKey))
      return
    }
    setError('')
    const first = Array.isArray(newFiles) ? newFiles[0] ?? null : null
    handleStepData('photo', first, null)
  }

  const handleChooseClick = () => inputRef.current?.click()

  const addFilesManually = (e) => {
    e.preventDefault()
    const picked = e.target.files?.[0] ?? null
    if (!picked) {
      emitter({ files: [], error: null })
      e.target.value = ''
      return
    }
    const errKey = filesValidation([picked], {
      ...validationData,
      maxQuantityFiles: 1
    })
    emitter({
      files: errKey ? (photoFile ? [photoFile] : []) : [picked],
      error: errKey
    })
    e.target.value = ''
  }

  const DropContent = (
    <Box>
      {previewUrl ? (
        <Box
          alt={t('becomeTutor.photo.imageAlt')}
          component='img'
          data-testid='photo-preview'
          src={previewUrl}
          sx={style.img}
        />
      ) : (
        <Typography align='center' color='text.secondary'>
          {t('becomeTutor.photo.placeholder')}
        </Typography>
      )}
    </Box>
  )

  return (
    <Box sx={style.root}>
      {!isMobile && (
        <DragAndDrop
          data-testid='drag-and-drop-desktop'
          emitter={emitter}
          initialState={photoFile ? [photoFile] : []}
          style={style}
          validationData={{ ...validationData, maxQuantityFiles: 1 }}
        >
          {DropContent}
        </DragAndDrop>
      )}
      <Box sx={style.rigthBox}>
        <Box>
          <Typography color='text.secondary' sx={style.description}>
            {t('becomeTutor.photo.description')}
          </Typography>

          <input
            accept={validationData.filesTypes.join(',')}
            data-testid='photo-input'
            onChange={addFilesManually}
            ref={inputRef}
            style={{ display: 'none' }}
            type='file'
          />

          <Box sx={style.fileUploader.root}>
            <AppButton
              color='primary'
              component='label'
              data-testid='choose-button'
              onClick={handleChooseClick}
              sx={style.fileUploader.button}
              variant='outlined'
            >
              {!photoFile && (
                <CloudUpload sx={{ mr: 1, color: 'primary.700' }} />
              )}

              <Typography sx={style.fileUploader.buttonText}>
                {photoFile ? photoFile.name : t('becomeTutor.photo.button')}
              </Typography>
            </AppButton>

            <Typography color='text.secondary' sx={{ mt: 1 }} variant='caption'>
              {t('becomeTutor.photo.maxSize')}
            </Typography>

            {error && (
              <Typography
                color='error'
                data-testid='error-text'
                variant='caption'
              >
                {error}
              </Typography>
            )}
          </Box>
        </Box>

        {isMobile && (
          <DragAndDrop
            data-testid='drag-and-drop-mobile'
            emitter={emitter}
            initialState={photoFile ? [photoFile] : []}
            style={style}
            validationData={{ ...validationData, maxQuantityFiles: 1 }}
          >
            {DropContent}
          </DragAndDrop>
        )}

        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
