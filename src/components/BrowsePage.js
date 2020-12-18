import {
  Card,
  Container,
  Grid,
  GridList,
  GridListTile,
  Icon,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ViewComfy from '@material-ui/icons/ViewComfy';
import ViewHeadline from '@material-ui/icons/ViewHeadline';

import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridItem: {
    textAlign: 'center',
  },
  card: {
    height: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  listItem: {
    borderBottom: `1px solid ${theme.palette.text.primary}`,
    height: '4rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  toolBar: {
    display: 'flex',
    padding: '1em 0',
    width: '100%'
  },
  icon: {
    color: 'white',
  },
}));

function BrowsePage(props) {
  const { listIds, listsById } = useSelector(state => {
    return {
      listIds: state.list.listIds,
      listsById: state.list.byId,
    }
  });

  const [gridView, setGridView] = useState(true);

  function goToListView(listId) {
    props.history.push(`/list/${listId}`)
  }

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.toolBar}>
        <ViewComfy
          color={gridView ? 'secondary' : 'inherit'}
          onClick={() => setGridView(true)}
        />
        <ViewHeadline
          color={!gridView ? 'secondary' : 'inherit'}
          onClick={() => setGridView(false)}
        />
      </div>
      {gridView ? (
        <GridList spacing={3} className={classes.gridList}>

          {listIds.map(listId => {
            const {
              title,
              description
            } = listsById[listId];
            return (
              <GridListTile 
               onClick={() => goToListView(listId)}
               col={2} 
               row={2} 
               className={classes.gridItem}
              >
                <Card elevation={2} className={classes.card}>
                  <div>{title}</div>
                  <div>{description}</div>
                </Card>
              </GridListTile>
            );
          })}

        </GridList>
      ) : (
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <List>
                {listIds.map(listId => {
                  const {
                    description,
                    title,
                  } = listsById[listId];
                  return (
                    <ListItem onClick={() => goToListView(listId)} className={classes.listItem}>
                      <ListItemText>
                        <div>{title}</div>
                        <div>{description}</div>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <div>
                  Right details here
              </div>
              </Card>
            </Grid>
          </Grid>

        )}
    </Container>
  );
}
export default withRouter(BrowsePage)