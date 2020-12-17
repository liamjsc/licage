import {
  Box,
  Card,
  Grid,
  Typography,
} from '@material-ui/core';

function EmptyActivityFeed() {
  return (
    <Card>
      <Typography>No activity yet</Typography>
    </Card>
  )
}
function ActivityFeed(props) {
  const { activityItems = [] } = props;
  if (activityItems.length === 0) {
    return <EmptyActivityFeed/>
  }
  return (
    <div>
    </div>
  )
}

export default ActivityFeed;