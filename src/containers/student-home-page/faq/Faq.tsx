import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import Accordions from '~/components/accordion/Accordions'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { TypographyVariantEnum } from '~/types'
import { accordionItems } from '~/containers/student-home-page/faq/accordionItems'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'

const Faq = () => {
  const { t } = useTranslation()
  const [activeItems, setActiveItems] = useState<number[]>([])

  const onChange = (activeItem: number) => {
    setActiveItems((prevActiveItems) => {
      if (prevActiveItems.includes(activeItem)) {
        return prevActiveItems.filter(
          (prevActiveItem) => prevActiveItem !== activeItem
        )
      } else {
        return [...prevActiveItems, activeItem]
      }
    })
  }

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />
      <Accordions
        activeIndex={activeItems}
        descriptionVariant={TypographyVariantEnum.Body1}
        elevation={0}
        icon={<ExpandMoreRoundedIcon />}
        items={accordionItems}
        multiple
        onChange={onChange}
        sx={styles.accordion}
      />
    </Box>
  )
}

export default Faq
