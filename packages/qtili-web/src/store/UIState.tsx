import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { PaletteMode } from '@mui/material'

export const UIState = new (class {
  lessonMode = atom(false)
  paletteMode = atomWithStorage<PaletteMode>('paletteMode', 'dark')
})()
