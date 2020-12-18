import {
  Card,
  Container,
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

export default function BrowsePage() {
  const { listIds, listsById } = useSelector(state => {
    return {
      listIds: state.list.listIds,
      listsById: state.list.byId,
    }
  });

  const [gridView, setGridView] = useState(true);

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
              <GridListTile col={2} row={2} className={classes.gridItem}>
                <Card elevation={2} className={classes.card}>
                  <div>{title}</div>
                  <div>{description}</div>
                </Card>
              </GridListTile>
            );
          })}

        </GridList>
      ) : (
          <List>
            {listIds.map(listId => {
              const {
                description,
                title,
              } = listsById[listId];
              return (
                <ListItem className={classes.listItem}>
                  <ListItemText>
                    <div>{title}</div>
                    <div>{description}</div>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        )}
    </Container>
  );
}