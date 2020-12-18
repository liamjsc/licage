import {
  Box,
  Card,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function EmptyActivityFeed() {
  const classes = useStyle();
  return (
    <Card className={classes.paper}>
      <Typography>No activity yet</Typography>
    </Card>
  )
}
function ActivityFeed(props) {
  const classes = useStyle();

  const { activityItems = [] } = props;
  if (activityItems.length === 0) {
    return <EmptyActivityFeed/>
  }
  return (
    <div className={classes.root}>
    </div>
  )
}

export default ActivityFeed;