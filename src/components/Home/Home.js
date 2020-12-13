import { connect } from "react-redux";
import './Home.scss';
import { 
  Container,
  Grid,
 } from '@material-ui/core';

function FeaturedList(props) {
  console.log(props);
  const { listData } = props;
  return (
    <Container>
      <Grid container className="FeaturedList">
        <Grid item xs={3}>
          <div>Rankings</div>
        </Grid>
        <Grid container item xs={9}>
          <Grid item>
            {listData.entries[0]}
          </Grid>
          <Grid item>
            {listData.entries[1]}
          </Grid>

        </Grid>
      </Grid>
    </Container>
  )
}
function Home(props) {
  const { featuredListId, featuredListData } = props;
  return (
    <div className="Home">
      <FeaturedList
        id={featuredListId}
        listData={featuredListData}
      />
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
  return {
    featuredListId,
    featuredListData,
  };
})(Home);