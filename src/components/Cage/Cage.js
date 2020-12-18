import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';

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
    flexGrow: 1,
    borderBottom: `2px solid transparent`,
    borderTop: `2px solid transparent`,
    '&:hover': {
      borderBottom: `2px solid ${theme.palette.secondary.light}`,
      borderTop: `2px solid ${theme.palette.secondary.light}`,
      // backgroundColor: theme.palette.primary.dark,
    }
  }
}));

function Cage(props) {
  console.log(props);
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
  } = props;

  const rows = [...entries].sort((a, b) => {
    return entriesById[a].score > entriesById[b].score ? 1 : 0
  }).map(entryId => entriesById[entryId]).slice(0, 5);

  const leftEntry = entriesById[entries[0]];
  const rightEntry = entriesById[entries[1]];

  const classes = useStyles();

  return (
    <div style={{ borderColor: 'teal', borderWidth: '1px' }}>
      <Typography variant="h3">{title}</Typography>
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
        <Grid item xs={6}>
          <Card className={classes.cageCard}>
            <div className={classes.cageEntry}>
              <div>{leftEntry.title}</div>
              <img src={leftEntry.image} />
            </div>
            <Divider orientation='vertical' flexItem/>
            <div className={classes.cageEntry}>
              <div>{rightEntry.title}</div>
              <img src={rightEntry.image} />
            </div>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card variant="outlined">
            <div>Rankings</div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="right">Title</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(({ title, score }, index) => {
                    return (
                      <TableRow key={title}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell align="right">{title}</TableCell>
                        <TableCell align="right">{score}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cage;