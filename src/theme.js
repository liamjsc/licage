import { createMuiTheme } from '@material-ui/core/styles';
import { grey, deepPurple, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#BB86FC',
      dark: '#3700B3',
    },
    secondary: teal,
    background: {
      default: '#121212',
      paper: '#1C1C1C',
    }
  },
});

export default theme;