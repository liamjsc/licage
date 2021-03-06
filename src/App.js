import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core';

import theme from './theme';
import {
  About,
  BrowsePage,
  Home,
  SignInPage,
  TopNav,
  ListDetail,
  UserPage,
} from './components/index';
import {
  getUserFromDevice,
  setUser,
} from './actions/auth';
import {
  loadUser,
} from './actions/users';
import { loadAllLists } from './actions/list';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.backgroundColor
  }
}));

function App(props) {
  const { dispatch } = props;
  const classes = useStyle();
  const [userStatusResolved, setUserStatusResolved] = useState(false);

  console.log('App.js render. userStatusResolved:', userStatusResolved);
  useEffect(() => {
    // check auth
    const user = getUserFromDevice();
    dispatch(setUser(user));
    if (user) {
      return dispatch(loadUser(user ? user.id : null))
        .then(() => {
          return dispatch(loadAllLists(user))
            .then(() => {
              console.log('user found. calling setUserStatusResolved');
              setUserStatusResolved(true);
            })
            .catch(() => {
              console.log('error did mount App')
            });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    return dispatch(loadAllLists())
      .then(() => {
        console.log('user not found. calling setUserStatusResolved');
        setUserStatusResolved(true);
      })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Helmet>
          <title>cagematch</title>
        </Helmet>

        <TopNav />

        {
          !userStatusResolved ? null : (
            <Switch>
              <Route path="/about"><About /></Route>
              <Route path="/login"><SignInPage /></Route>
              <Route path="/browse"><BrowsePage /></Route>
              <Route path="/@/:username"><UserPage /></Route>
              <Route path="/list/:listId"><ListDetail /></Route>
              <Route path="/"><Home /></Route>
            </Switch>
          )
        }
      </div>
    </ThemeProvider>
  );
}

// connect to store just to receive dispatch as a prop
export default connect()(App);
