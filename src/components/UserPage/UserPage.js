import { connect } from 'react-redux';
import {
  useParams,
  withRouter,
} from 'react-router-dom';
import {
  Button,
  Grid,
} from '@material-ui/core';

import {
  signOut,
} from '../../actions/auth';

function UserPage(props) {
  const {
    username,
  } = useParams();

  function onClickSigOut(e) {
    props.dispatch(signOut())
    props.history.push('/login');
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <div>Left Col</div>
        <Button onClick={onClickSigOut}>Sign out</Button>
      </Grid>
      <Grid item xs={10}>
        <div>{username}</div>
      </Grid>
    </Grid>
  )
}
export default connect((state, ownProps, params) => {
  console.log(params);
  const { username } = params || {};
  return {
    username,
  }
})(withRouter(UserPage));