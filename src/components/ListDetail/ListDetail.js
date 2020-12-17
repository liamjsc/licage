import {
  Link,
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import Cage from '../Cage/Cage';

function ListDetail(props) {
  const {
    entriesById,
    listsById,
    loaded,
  } = props;
  const { listId } = useParams();

  if (!loaded) return null;

  const listData = listsById[listId];

  return (
    <Container>
      <Cage
        id={listId}
        listData={listData}
        entriesById={entriesById}
      />
    </Container>
  )
}

export default connect((state, ownProps) => {
  console.log(ownProps);
  const {
    list: {
      listIds,
      byId: listsById,
      loaded,
    },
    entries: { byId: entriesById },
  } = state;
  return {
    entriesById,
    listsById,
    loaded,
  }
})(ListDetail);