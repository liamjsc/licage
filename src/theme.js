import { createMuiTheme } from '@material-ui/core/styles';
import { grey, deepPurple, purple, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#BB86FC',
    },
    secondary: teal,
    // background: {
    //   default: '#121212',
    //   paper: '#1C1C1C',
    // }
  },
});

theme.props = {
  MuiLink: {
    underline: 'none',
  }
}

export default theme;