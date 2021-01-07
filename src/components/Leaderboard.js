import { connect } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardHeader,
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
    header = 'Leaderboard',
  } = props;
  if (!loaded) return null;

  return (
    <Card variant="outlined">
      <CardHeader title={header}/>
      <TableContainer>
        <Table>
          <TableBody>
            {rows.map(({ title, score }, index) => {
              return (
                <TableRow key={title}>
                  <TableCell><span>{index + 1}. </span>{title} </TableCell>
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