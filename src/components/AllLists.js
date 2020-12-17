import { connect } from 'react-redux';
import {
  Card,
} from '@material-ui/core';
import { Link } from './index';

function AllLists(props) {
  const {
    listIds,
    listById,
    loaded,
  } = props;
  if (!loaded) return null;

  return (
    <Card title="Lists">
      <div>
        {listIds.map((listId) => {
          const {
            title,
            id,
          } = listById[listId];
          return (
            <Link to={`/list/${id}`}>
              <div>
                <div>{title}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </Card>
  )
}

export default connect((state) => {
  const {
    list: {
      listIds,
      byId: listById,
      loaded,
    },
  } = state;
  return {
    listIds,
    listById,
    loaded,
  }
})(AllLists);