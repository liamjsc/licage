import React from 'react';
import {
  Box,
  Card,
  CardContent,
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
import CageEntry from './CageEntry';
import MyStats from '../MyStats';
import { loadList, fetchUserListRankings } from '../../actions/list';
import { exclude, getExclusions } from '../../actions/auth';
import { postMatchup } from '../../actions/matchup';
import LinearWithProgress from '../ui/LinearWithProgress';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

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
  listCard: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  listCardImage: {
    width: '50%',
  },
}));


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
    userRankingsIds,
    userRecordsById,
  } = props;

  const rows = [...entries].sort((a, b) => {
    return entriesById[a].score > entriesById[b].score ? 1 : 0
  }).map(entryId => entriesById[entryId]);

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

          <Card style={{ marginBottom: '14px' }}>
            <CardHeader
              title={title}
              subheader={`created by @${createdBy}`}
            />
            <CardContent style={{ paddingTop: 0 }}>
              <List className={classes.listCard}>

                <ListItem alignItems="flex-start">
                  {description}
                </ListItem>

                <Divider component="li" />
                {rows.length && (<ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <EmojiEventsIcon fontSize="large" />
                  </ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <ListItemText
                      primary={rows[0].title}
                      secondary="Leader"
                    />
                    {rows[0].image && (
                      <img className={classes.listCardImage} src={rows[0].image} />
                    )}
                  </Box>
                </ListItem>)}

                <Divider component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <ShowChartIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText
                    primary={matchupCount}
                    secondary="Matchups counted"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <MyStats
            userListStats={userListStats}
            userRankingsIds={userRankingsIds}
            userRecordsById={userRecordsById}
            entriesById={entriesById}
          />
        </Grid>

        {/* Center Column */}
        <Grid container item xs={9}>
          <Box display="flex" flexDirection="column" width="100%">
            <Box mb="14px">
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
{/* 
            <div>
              <LinearWithProgress value={13} />
            </div> */}

            <Box display="flex" flexDirection="row">
              <Grid item xs={6}>
                <Card>
                  <Leaderboard showRecord showHeader rows={rows} />
                </Card>
              </Grid>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cage;