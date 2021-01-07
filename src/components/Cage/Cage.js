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
import CageEntry from './CageEntry';
import { loadList, fetchUserListRankings } from '../../actions/list';
import { exclude, getExclusions } from '../../actions/auth';
import { postMatchup } from '../../actions/matchup';
import LinearWithProgress from '../ui/LinearWithProgress';
import Leaderboard from '../Leaderboard';

const useStyles = makeStyles((theme) => ({
  cage: {
    marginTop: '2rem',
  },
  cageCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cageEntry: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flexGrow: 1,
    borderBottom: `2px solid transparent`,
    borderTop: `2px solid transparent`,
    width: '49%',
    paddingBottom: '1rem',
    paddingTop: '1rem',
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.light}`,
      borderTop: `2px solid ${theme.palette.secondary.light}`,
      // backgroundColor: theme.palette.primary.dark,
    }
  },
}));

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
}));
function MyStats(props = {}) {
  const classes = useStyles();

  const {
    userListStats,
  } = props;

  const { matchup_count: userMatchupCount } = userListStats;
  return (
    <Card>
      <CardHeader title="My Activity" />
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <ShowChartIcon fontSize="large"/>
          </ListItemIcon>
          <ListItemText
            primary={`${userMatchupCount}  matchups counted`}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
              </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
              </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Card>
  );
}
function Cage(props) {

  const {
    listData: {
      entries,
      description,
      createdBy,
      title,
      matchupCount,
      voterCount,
    },
    entriesById,
    leftId,
    rightId,
    handleWinnerSelected,
    userListStats,
  } = props;

  const rows = [...entries].sort((a, b) => {
    return entriesById[a].score > entriesById[b].score ? 1 : 0
  }).map(entryId => entriesById[entryId]).slice(0, 5);

  const leftEntry = entriesById[leftId];
  const rightEntry = entriesById[rightId];

  const classes = useStyles();

  return (
    <div style={{ borderColor: 'teal', borderWidth: '1px' }}>

      {/* Header */}
      <Box display="flex" justifyContent="center">
        <Typography variant="h3">{title}</Typography>
      </Box>

      <Grid container spacing={3} className={classes.cage}>

        {/* Left Column */}
        <Grid variant="outlined" item xs={3}>
          <MyStats userListStats={userListStats}/>
        </Grid>

        {/* Center Column */}
        <Grid container item xs={9}>
          <Box display="flex" flexDirection="column" width="100%">
            <Box>
              <Card className={classes.cageCard}>
                <CageEntry
                  className={classes.cageEntry}
                  title={leftEntry.title}
                  image={leftEntry.image}
                  onClick={() => handleWinnerSelected(leftEntry.id)}
                />
                <Divider orientation='vertical' flexItem />
                <CageEntry
                  className={classes.cageEntry}
                  title={rightEntry.title}
                  image={rightEntry.image}
                  onClick={() => handleWinnerSelected(rightEntry.id)}
                />
              </Card>
            </Box>
            <div>
              <LinearWithProgress value={40} />
            </div>
            <Grid item xs={6}>
              <Leaderboard rows={rows} />
            </Grid>
            <Grid item xs={6}>
              <Leaderboard rows={rows} />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cage;