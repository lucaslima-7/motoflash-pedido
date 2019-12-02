const defaultTheme = {
  typography: {
    fontFamily: [
      '"Noto Sans"',
      'Muli',
      '"Helvetica"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    useNextVariants: true,
    suppressDeprecationWarnings: true,
    htmlFontSize: 10,
    body1: {
      fontSize: "1.4rem",
    },
    body2: {
      fontSize: "1.4rem",
    }
  },
  palette: {
    type: "light",
    primary: {
      light: "#E3F2FD",
      main: "#82B1FF",
      dark: "#2979FF",
      contrastText: "#212121"
    },
    secondary: {
      light: "#B3E5FC",
      main: "#80D8FF",
      dark: "#0091EA",
      contrastText: "#212121"
    }
  }
}

export default defaultTheme