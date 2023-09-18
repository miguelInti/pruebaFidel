import { createTheme } from '@mui/material/styles';
import { pink, lightBlue, yellow, lightGreen, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
      contrastText: '#fff',
    },
    secondary: {
      main: lightBlue[500],
      contrastText: '#fff',
    },
    warning: {
      main: yellow[500],
      contrastText: '#000',
    },
    success: {
      main: lightGreen[500],
      contrastText: '#000',
    },
    error: {
      main: red[500],
      contrastText: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1em',
          borderRadius: '8px',
          '&.Mui-disabled': { // Cambia el color de fondo del botón deshabilitado
            color: "#C3B9BF", // Cambia el color del texto del botón deshabilitado
          },
        },
        outlinedPrimary: {
          borderWidth: '0.3em',
          padding: '7px 21px',
          '&:hover': {
            border: '0.3em solid #e91e63',
            padding: '7px 21px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#dde0eb',
          '& label': {
            fontSize: 24,
          },
          '& input': {
            fontSize: '1.2em',
          },
          borderRadius: '8px',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#fff',
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          background: 'transparent',
          padding: 5,
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        alternativeLabel: {
          color: '#ffffffab',
          '& .MuiStepLabel-active': { color: '#ffffff' },
          '& .MuiStepLabel-completed': { color: '#ffffff' },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          marginTop: -180,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: '#fff',
        },
        filled: {
          background: '#fff',
        },
        select: {
          '&:focus': {
            backgroundColor: 'rgba(255,255,255,0.9)',
          },
        },
      },
    },
  },
});
