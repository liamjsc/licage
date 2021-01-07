import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import BarChartIcon from '@material-ui/icons/BarChart';

import Leaderboard from './Leaderboard';

/**
 * MyStats goes in the left column on the cage page
 * Show the two entries in their relative current USER ranks
 * * title, wins, losses, & score
 * 
 */
const useMyStatsStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: '50%',
  }
}));
export default function MyStats(props = {}) {
  const classes = useMyStatsStyles();

  const {
    userListStats,
    userRankingsIds,
    userRecordsById,
    entriesById,
  } = props;

  const userRows = userRankingsIds.slice(0, 5).map((id, index) => {
    const { score, winCount, lossCount } = userRecordsById[id];
    const { title, image } = entriesById[id];
    return {
      score,
      winCount,
      lossCount,
      title,
      id,
      image,
      rank: index + 1,
    }
  });
  const { matchup_count: userMatchupCount } = userListStats;
  return (
    <Card>
      <CardHeader title="My Activity" />
      <List className={classes.root}>
        {userRows.length && (<ListItem alignItems="flex-start">
          <ListItemIcon>
            <EmojiEventsIcon fontSize="large" />
          </ListItemIcon>
          <Box display="flex" flexDirection="column">
            <ListItemText
              primary={userRows[0].title}
              secondary="Leader"
            />
            {userRows[0].image && (
              <img className={classes.image} src={userRows[0].image} />
            )}
          </Box>
        </ListItem>)}

        <Divider component="li" />

        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <ShowChartIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary={`${userMatchupCount}  matchups counted`}
          />
        </ListItem>

        <Divider component="li" />

        {userRows.length && (<ListItem alignItems="flex-start">
          {/* <ListItemIcon>
            <BarChartIcon fontSize="large" />
          </ListItemIcon> */}
          <Leaderboard rows={userRows} />
        </ListItem>)}
      </List>
    </Card>
  );
}
