import { defaultTheme, AdminProps } from 'react-admin'
import merge from 'lodash/merge'
import AnonymousProRegular from './fonts/Anonymous_Pro/AnonymousPro-Regular.ttf'

const overrides: AdminProps['theme'] = {
  palette: {
    primary: {
      main: '#2da626',
    },
    secondary: {
      main: '#1f202c',
    },
  },
  typography: {
    fontFamily:
      'UbuntuMono, Fira Sans, Inter, Avenir, Helvetica, Arial, sans-serif',
    body2: {
      fontFamily:
        'UbuntuMono, Fira Sans, Inter, Avenir, Helvetica, Arial, sans-serif',
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily:
            'UbuntuMono, Fira Sans, Inter, Avenir, Helvetica, Arial, sans-serif',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 22,
        },
      },
    },
  },
}

const theme = merge({}, defaultTheme, overrides)
export default theme
