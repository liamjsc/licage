import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';

import './App.scss';
import theme from './theme';
import { 
  About,
  Home,
  SignInPage,
  TopNav,
  // ListPage,
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

function App(props) {
  const { dispatch } = props;
  useEffect(() => {
    // check auth
    const user = getUserFromDevice();
    dispatch(setUser(user));
    if (user) {
      return dispatch(loadUser(user ? user.id : null))
      .then(() => {
        return dispatch(loadAllLists(user))
          // .then(() => {
          //   console.log('calling onAppReady', onAppReady);
          //   onAppReady && onAppReady();
          // })
          .catch(() => {
            console.log('error did mount App')
          });
        })
      .catch((error) => {
        console.log(error);
      })
    }
    return dispatch(loadAllLists())
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Helmet>
          <title>cagematch</title>
        </Helmet>

        <TopNav/>

        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/login"><SignInPage /></Route>
          <Route path="/@/:username"><UserPage /></Route>
          <Route path="/"><Home /></Route>
          {/* <Route path="/list/:listId"><ListPage /></Route> */}
          {/* <Route path="/cage/:id"><CagePage /></Route> */}
        </Switch>
      </div>
    </ThemeProvider>
  );
}

// connect to store just to receive dispatch as a prop
export default connect()(App);
