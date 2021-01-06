import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
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
  } = props;

  const rows = [...entries].sort((a, b) => {
    return entriesById[a].score > entriesById[b].score ? 1 : 0
  }).map(entryId => entriesById[entryId]).slice(0, 5);

  const leftEntry = entriesById[leftId];
  const rightEntry = entriesById[rightId];

  const classes = useStyles();

  return (
    <div style={{ borderColor: 'teal', borderWidth: '1px' }}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h3">{title}</Typography>
      </Box>
      <Grid container spacing={3} className={classes.cage}>
        <Grid variant="outlined" item xs={3}>
          <Card>
            <div>{description}</div>
            <div>{"Click the one you like more - left or right"}</div>
            <div>{entries.length} items to rank</div>
            <div>{voterCount} users voted {matchupCount} times</div>
            <div>@{createdBy}</div>
          </Card>
        </Grid>
        <Grid container item xs={9}>
          <Box display="flex" flexDirection="column" width="100%">
            <Box flexGrow="10">
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