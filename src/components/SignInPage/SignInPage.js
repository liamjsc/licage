import { 
  Box,
  Button,
  TextField,
  Typography,
 } from '@material-ui/core';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { login } from '../../actions/auth';
import './SignInPage.scss';

function validate({ username, password }) {
  return username && password;
}

class SignInPage extends Component {
  state = {
    username: '',
    password: '',
    hidePassword: true,
    error: 'test error',
    posting: false,
  }

  onClickLogin = () => {
    console.log('onClickLogin');
    console.log(this.state);
    const valid = validate(this.state);
    if (!valid) return this.setState({ error: 'Double check the form' })
    const { email, username, password } = this.state;
    const credentials = {
      email,
      username,
      password,
    }
    this.setState({ posting: true });
    return this.props.dispatch(login(credentials))
      .then(() => {
        this.props.history.push('/');
      })
      .catch((e) => {
        console.log(e);
        this.setState({
          posting: false,
          error: 'That combination did not work'
        });
      })
  }

  onChangeUsername = (e) => {
    console.log(e);
    this.setState({
      username: e.target.value,
      error: ''
    });
  }
  onChangePassword = (e) => {
    this.setState({ 
      password: e.target.value,
      error: '',
    });
  }

  render() {
    const { username, password, error } = this.state;
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
          {!error ? null : <Typography color="error">{error}</Typography>}

          <div className="formInputArea">
            <TextField
              fullWidth
              id="username-email"
              label="username or email"
              variant="outlined"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="formInputArea">
            <TextField 
              fullWidth 
              id="password" 
              label="password" 
              variant="outlined"
              value={password}
              type="password"
              onChange={this.onChangePassword}
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onClickLogin}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button color="primary">Register</Button>
            <Button color="primary">Password Reset</Button>
          </div>
        </Box>
      </Box>
    )
  }
}

const SignInPageWithRouter = withRouter(SignInPage);

export default connect()(SignInPageWithRouter);