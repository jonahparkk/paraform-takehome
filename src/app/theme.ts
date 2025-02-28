import { createTheme, type Components, type Theme } from '@mui/material/styles';

const commonComponents: Components<Theme> = {
    MuiButton: {
        styleOverrides: {
            root: {
            textTransform: 'none',
            borderRadius: '8px',
            },
        },
    }
};

const commonTypography = {
  fontFamily: 'var(--font-geist-sans)',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
  },
};

const commonPalette = {
  primary: {
    main: 'rgb(75, 131, 239)',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

export const darkTheme = createTheme({
  typography: commonTypography,
  palette: {
    mode: 'light',
    ...commonPalette,
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#171717',
      secondary: '#525252',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  components: commonComponents,
});

export const theme = darkTheme; 