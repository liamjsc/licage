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
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
  },
  cardImage: {
    width: '30%',
  },
  highlight: {
    color: theme.palette.secondary.light,
    paddingRight: '4px',
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
  const { listIds, listsById, entriesById } = useSelector(state => {
    return {
      listIds: state.list.listIds,
      listsById: state.list.byId,
      entriesById: state.entries.byId,
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
              description,
              id,
              createdBy,
              matchupCount,
              voterCount,
              entries,
            } = listsById[listId];

            const topEntry = entriesById[entries[0]];
            return (
              <GridListTile
                key={id}
                onClick={() => goToListView(listId)}
                col={2}
                row={2}
                className={classes.gridItem}
              >
                <Card elevation={2}>
                  <div className={classes.card}>
                    <div className={classes.cardImage}>
                      <img src={topEntry.image} />
                    </div>
                    <div>
                      <div>{title}</div>
                      <div>{description}</div>
                      <List>
                        <ListItem>
                          <span className={classes.highlight}>{matchupCount}</span> matchups counted
                        </ListItem>
                        <ListItem>
                          <span className={classes.highlight}>{voterCount}</span> users voted
                        </ListItem>
                        <ListItem>
                          Created by &nbsp;<span className={classes.highlight}>@{createdBy}</span>
                        </ListItem>
                      </List>
                    </div>
                  </div>
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
                    id,
                  } = listsById[listId];
                  return (
                    <ListItem
                      key={id}
                      onClick={() => goToListView(listId)}
                      className={classes.listItem}
                    >
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