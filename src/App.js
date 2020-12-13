import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";

import './App.scss';
import { 
  TopNav,
  Home,
  // ListPage,
  // UserPage,
 } from './components/index';
import { loadAllLists } from './actions/list';

function App(props) {
  const { dispatch } = props;
  useEffect(() => {
    dispatch(loadAllLists());
  }, []);
  return (
    <div className="App">
      <Helmet>
        <title>cagematch</title>
      </Helmet>

      <TopNav/>

      <Switch>
        <Route path="/"><Home /></Route>
        {/* <Route path="/list/:listId"><ListPage /></Route> */}
        {/* <Route path="/cage/:id"><CagePage /></Route> */}
        {/* <Route path="/@/:username"><UserPage /></Route> */}
      </Switch>

      <header className="App-header">
        <p>
          cagematch is under construction
        </p>
      </header>
    </div>
  );
}

// connect to store just to receive dispatch as a prop
export default connect()(App);
