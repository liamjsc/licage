import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import './FeaturedList.scss';

function FeaturedList(props) {
  console.log(props);
  const {
    listData = {},
    entriesById,
  } = props;
  const rows = [...listData.entries].sort((a,b) => {
    return entriesById[a].score > entriesById[b].score ? 1 : 0
  }).map(entryId => entriesById[entryId]).slice(0, 5);
  const leftEntry = entriesById[listData.entries[0]];
  const rightEntry = entriesById[listData.entries[1]];
  return (
    <div className="FeaturedList">
      <Grid container>
        <Grid item xs={3}>
          <div>Rankings</div>
          <TableContainer component={Paper}>
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
        <Grid container item xs={9}>
          <Grid item xs={6}>
            <div>
              <div>{leftEntry.title}</div>
              <img src={leftEntry.image}/>
            </div>
          </Grid>
          <Grid item xs={6}>
          <div>
              <div>{rightEntry.title}</div>
              <img src={rightEntry.image}/>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default FeaturedList;