import { connect } from "react-redux";
import {
  Card,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';

import {
  ActivityFeed,
} from '../index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Home(props) {
  const {
    listsLoading,
    listsLoaded,
    entriesById,
  } = props;
  
  const classes = useStyles();
  console.log('home props:')
  console.log(props);
  const notLoaded = !entriesById || listsLoading || !listsLoaded;
  return (
    <div className={classes.root}>
      { (notLoaded) ? <CircularProgress /> : (
        <div>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Card className={classes.paper}>
                Left column
              </Card>
            </Grid>
            <Grid item xs={6}>
              <ActivityFeed />
            </Grid>

            <Grid item xs={3}>
              <Card className={classes.paper}>
                Right column
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}

export default connect((state) => {
  const {
    auth,
    entries,
    list,
    userRankings,
    users,
  } = state;

  const { loaded: listsLoaded, loading: listsLoading } = list;
  if (listsLoading) return { listsLoading };

  const featuredListId = state.list.listIds[0];
  const featuredListData = state.list.byId[featuredListId];
  console.log('featuredListData', featuredListData);
  return {
    featuredListId,
    featuredListData,
    listsLoaded,
    listsLoading,
    entriesById: entries.byId,
  };
})(Home);