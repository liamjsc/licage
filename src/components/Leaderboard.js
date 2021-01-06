import { connect } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Link } from './index';

function Leaderboard(props) {
  const {
    loaded = true,
    rows,
    title = 'Leaderboard',
  } = props;
  if (!loaded) return null;

  return (
    <Card variant="outlined">
      <Box display="flex">
        <Typography variant="h5">Rankings</Typography>
        <Button>{'More >>'}</Button>
      </Box>
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
  )
}

export default connect((state) => {
  return {};
})(Leaderboard);