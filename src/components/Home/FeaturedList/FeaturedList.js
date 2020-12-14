import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import './FeaturedList.scss';

function FeaturedList(props) {
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
  return (
    <div style={{borderColor: 'teal', borderWidth: '1px'}} className="FeaturedList">
      <Typography variant="h3">{title}</Typography>
      <Grid container justify="space-around">
        <Grid component={Paper} elevation={2} item xs={2}>
          <Box spacing={3}>
            <div>{description}</div>
            <div>{"Click the one you like more - left or right"}</div>
            <div>{entries.length} items to rank</div>
            <div>{voterCount} users voted {matchupCount} times</div>
            <div>@{createdBy}</div>
          </Box>
        </Grid>
        <Grid container component={Paper} elevation={4} item xs={6}>
          <Grid item xs={6}>
            <div>
              <div>{leftEntry.title}</div>
              <img src={leftEntry.image} />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <div>{rightEntry.title}</div>
              <img src={rightEntry.image} />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <div>Rankings</div>
          <TableContainer component={Paper} elevation={2}>
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
        </Grid>
      </Grid>
    </div>
  )
}

export default FeaturedList;