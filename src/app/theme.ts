import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0A84FF',
    },
    secondary: {
      main: '#FFB703',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    grey: {
      100: '#F5F7FA',
      200: '#E5E7EB',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
    },
    h2: {
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
    },
    h3: {
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
    },
    h4: {
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
    },
    h5: {
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
    },
    h6: {
      fontWeight: 700,
      fontFamily: 'Inter, sans-serif',
    },
    body1: {
      fontWeight: 400,
      fontFamily: 'Inter, sans-serif',
    },
    body2: {
      fontWeight: 400,
      fontFamily: 'Inter, sans-serif',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': {
              borderColor: '#0A84FF',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0A84FF',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});
