import { 
  Box,
  Button,
  Container,
  TextField,
  Typography,
 } from '@material-ui/core';

 import { cardGray } from '../../constants/constants';

 import './SignInPage.scss';

function SignInPage(props) {
  return (
    <Box pt="2em" display="flex" justifyContent="center" width="100%">
      <Box 
        width="30em"
        bgcolor="background.paper"
        boxShadow={2}
        mt="2em"
        py="1em"
      >
        <Typography variant="h3">Sign in</Typography>
        <div className="formInputArea">
          <TextField fullWidth id="username-email" label="username or email" variant="outlined" />
        </div>
        <div className="formInputArea">
          <TextField fullWidth id="password" label="password" variant="outlined" />
        </div>
        <div>
          <Button variant="contained" color="secondary">Sign In</Button>
        </div>
        <div>
          <Button color="primary">Register</Button>
          <Button color="primary">Password Reset</Button>
        </div>
      </Box>
    </Box>
  )
}

export default SignInPage;