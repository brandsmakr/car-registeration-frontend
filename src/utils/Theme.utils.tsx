import { createTheme, makeStyles, withStyles } from "@mui/material";

const ButtonTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9900f3",
      light: "#ff9900c1",
      dark: "#ff9900",
      contrastText: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});


const GoogleButtonTheme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
      light: "#ffff",
      dark: "#ffff",
      contrastText: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const FacebookButtonTheme = createTheme({
  palette: {
    primary: {
      main: "#1877F2",
      light: "#1877F2",
      dark: "#1877F2",
      contrastText: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const AppleButtonTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "#000000",
      dark: "#000000",
      contrastText: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const LightButtonTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9e0c33",
      light: "#ff9e0c33",
      dark: "#ff9d0a4d",
      contrastText: "#ff9900f3",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const TabsStyle = createTheme({
  palette: {
    primary: {
      main: "#ff9900f3",
      light: "#ff9900c1",
      dark: "#ff9900",
      contrastText: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontWeight: "bolder",
      letterSpacing: "1px",
    },
  },
});

const TransParentButton = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#f6f6f7",
      dark: "#f6f6f7",
      contrastText: "#000000",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const MenuButtonTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(99, 115, 129, 0.75)",
      light: "rgba(99, 115, 129, 0.75)",
      dark: "rgba(99, 115, 129, 0.75)",
      contrastText: "rgba(99, 115, 129)",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const MenuActiveButtonTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(255, 157, 10, 0.1)",
      light: "rgba(255, 157, 10, 0.1)",
      dark: "rgba(255, 157, 10, 0.15)",
      contrastText: "#ff9900f3",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const ButtonActiveTheme = createTheme({
  palette: {
    primary: {
      main: "#ff9900f3",
      light: "#ff9900c1",
      dark: "#ff9900",
      contrastText: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: "capitalize",
      textShadow: "0.8px 0.8px #e3e3e3",
      letterSpacing: "1px"
    },
  },
});

const Theme = {
  MenuButtonTheme,
  MenuActiveButtonTheme,
  LightButtonTheme,
  TabsStyle,
  ButtonTheme,
  ButtonActiveTheme,
  TransParentButton,
  GoogleButtonTheme,
  FacebookButtonTheme,
  AppleButtonTheme
};

export default Theme;
