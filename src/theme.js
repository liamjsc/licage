import { createMuiTheme } from '@material-ui/core/styles';
import { grey, deepPurple, teal } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: teal,
  },
});

export default theme;