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
    secondary: {
      light: "#69f7ff",
      main: "#2bf4ff",
      dark: "#00f2ff",
      contrastText: "#181818"
    },
    primary: {
      light: "#be67ff",
      main: "#9413f3",
      dark: "#9200ff",
      contrastText: "#FFF"
    }
  }
}

export default defaultTheme