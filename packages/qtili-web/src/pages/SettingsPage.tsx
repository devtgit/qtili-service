import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { css } from '@emotion/css'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '@/pages/PageLayout'
import { AppBarTitlePortal } from '@/containers/AppTopBar'

export const SettingsPage = () => {
  const { t } = useTranslation()

  return (
    <PageLayout>
      <AppBarTitlePortal>{t('settings_page')}</AppBarTitlePortal>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Button>Пройти тест</Button>
      </div>
    </PageLayout>
  )
}
