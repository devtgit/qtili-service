import React from 'react'
import { useAtom } from 'jotai'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import IconButton from '@mui/material/IconButton'
import { UIState } from '@/store/UIState'

export const ToggleThemeButton = () => {
  const [themeMode, setThemeMode] = useAtom(UIState.paletteMode)

  return (
    <IconButton
      size="large"
      color="inherit"
      onClick={() => setThemeMode((x) => (x === 'dark' ? 'light' : 'dark'))}
    >
      {themeMode === 'light' ? (
        <DarkModeOutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
  )
}
