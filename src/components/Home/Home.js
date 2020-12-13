import { connect } from "react-redux";
import {
  CircularProgress,
  Container,
} from '@material-ui/core';

import FeaturedList from './FeaturedList/FeaturedList';
import './Home.scss';

function Home(props) {
  const { 
    featuredListId,
    featuredListData,
    listsLoading,
    listsLoaded,
    entriesById,
  } = props;
  console.log('home props:')
  console.log(props);
  const notLoaded = !entriesById || listsLoading || !listsLoaded;
  return (
    <div className="Home">
      { (notLoaded) ? <CircularProgress /> : (
        <Container>
          <FeaturedList
            id={featuredListId}
            listData={featuredListData}
            entriesById={entriesById}
          />
        </Container>
      )}
    </div>
  )
}

export default connect((state) => {
  const {
    auth,
    entries,
    list,
    userRankings,
    users,
  } = state;

  const { loaded: listsLoaded, loading: listsLoading } = list;
  if (listsLoading) return { listsLoading };

  const featuredListId = state.list.listIds[0];
  const featuredListData = state.list.byId[featuredListId];
  console.log('featuredListData', featuredListData);
  return {
    featuredListId,
    featuredListData,
    listsLoaded,
    listsLoading,
    entriesById: entries.byId,
  };
})(Home);