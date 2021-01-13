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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Link } from './index';

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.secondary,
  },
}));
function Leaderboard(props) {
  const {
    loaded = true,
    rows, // { title, score, id }
    showRecord,
    showHeader,
    header,
    count,
    className,
  } = props;
  const classes = useStyles();

  if (!loaded) return null;

  return (
    <Box className={className}>
      { header && <CardHeader title={header} />}
      <TableContainer>
        <Table>
          {showHeader && (
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>Ranking</TableCell>
                { showRecord && <TableCell className={classes.header}>Win-Loss</TableCell> }
                <TableCell className={classes.header}>Elo</TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.map(({ title, score, winCount, lossCount }, index) => {
              if (count && index >= count) return null;
              return (
                <TableRow key={title}>
                  <TableCell><span>{index + 1}. </span>{title} </TableCell>
                  {
                    showRecord && (
                      <TableCell><span style={{color: 'green'}}>{winCount}</span> - <span style={{color: 'red'}}>{lossCount}</span></TableCell>
                    )
                  }
                  <TableCell align="right">{score}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default connect((state) => {
  return {};
})(Leaderboard);