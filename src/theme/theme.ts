import { createTheme, type PaletteMode } from '@mui/material';

export function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#2D6A4F',
        light: '#52B788',
        dark: '#1B4332',
      },
      secondary: {
        main: '#E76F51',
      },
      background: {
        default: mode === 'light' ? '#F8F9FA' : '#0A0A0A',
        paper: mode === 'light' ? '#FFFFFF' : '#1C1C1C',
      },
      divider: mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
      text: {
        primary: mode === 'light' ? 'rgba(0,0,0,0.87)' : '#F5F5F5',
        secondary: mode === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'light' ? '0 2px 8px rgba(0,0,0,0.08)' : '0 2px 10px rgba(0,0,0,0.5)',
            border: mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : undefined,
            color: mode === 'dark' ? '#F5F5F5' : undefined,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
}