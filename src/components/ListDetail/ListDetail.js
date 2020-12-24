import { useEffect, useState } from 'react';
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

import { loadList, fetchUserListRankings } from '../../actions/list';
import { postMatchup } from '../../actions/matchup';
import { exclude, getExclusions } from '../../actions/auth';
import * as actionTypes from '../../util/actionTypes';

import Cage from '../Cage/Cage';

function loadQueue(candidateIds = []) {
  // generate all possible pairs from the input list
  // loop through each candidate ID
  // for each ID, loop through all subsequent ID's and push the pair into results
  const res = [];
  candidateIds.forEach((id, index) => {
    for (let i=index+1; i < candidateIds.length; i++) {
      res.push([id, candidateIds[i]]);
    }
  });
  return res;
}

function selectTwoEntries(candidateIds, currentLeft, currentRight) {
  const entryAId = currentLeft;
  const entryBId = currentRight;
  const indexOne = Math.floor(Math.random() * candidateIds.length);
  let indexTwo = Math.floor(Math.random() * candidateIds.length);

  // handle some cases here
  // make sure they arent the same index
  // make sure they are nt just repeating the previous two indices
  const validLength = candidateIds && candidateIds.length && candidateIds.length > 2;
  let isRepeat = [indexOne, indexTwo].indexOf(entryAId) >= 0 && [indexOne, indexTwo].indexOf(entryBId) >= 0;
  while (validLength && (indexOne === indexTwo || isRepeat)) {
    indexTwo = Math.floor(Math.random() * candidateIds.length);
    isRepeat = [indexOne, indexTwo].indexOf(entryAId) >= 0 && [indexOne, indexTwo].indexOf(entryBId) >= 0;
  }

  const ret = [candidateIds[indexOne], candidateIds[indexTwo]];
  return ret;
}

function ListDetail(props) {
  const {
    entriesById,
    listsById,
    loaded,
    list,
    user = {},
    hiddenEntryIds,
    candidateIds,
    entryIdMap,
    isNewUserForList,
    dispatch,
  } = props;

  const { listId } = useParams();

  function loadCage() {
    const { id: userId } = user || {};
    return dispatch(getExclusions(userId))
      .then(() => dispatch(loadList(listId)))
      .then(() => dispatch(fetchUserListRankings({ listId, userId })))
  }

  useEffect(() => {
    loadCage();
  }, []);

  const [matchupPair, setMatchup] = useState(selectTwoEntries(candidateIds))
  const [leftId, rightId] = matchupPair;
  
  const listData = (listsById || {})[listId];

  function handleClickEntry(winner) {
    const [leftId, rightId] = matchupPair;
    const loser = winner === leftId ? rightId : leftId;
    const matchupResults = {
      entryA: leftId,
      entryB: rightId,
      winner,
      loser,
      listId,
      userId: user.id,
    }
    console.log(matchupResults);

    // need to increment voterCount on the listMeta
    if (isNewUserForList) {
      console.log('increment voter count from handlePress Cage.js');
      dispatch({ type: actionTypes.INCREMENT_VOTER_COUNT, listId })
    }

    dispatch(postMatchup(matchupResults));
    
    setMatchup(selectTwoEntries(candidateIds, leftId, rightId));
  }

  return (
    <Container>
      { !loaded ? <div>loading</div> : (
        <Cage
          id={listId}
          listData={listData}
          entriesById={entriesById}
          leftId={leftId}
          rightId={rightId}
          handleWinnerSelected={handleClickEntry}
        />
      )}
    </Container>
  )
}

export default connect((state, ownProps) => {
  const {
    list: {
      listIds,
      byId: listsById,
      loaded,
    },
    entries: { byId: entriesById },
    auth: { exclusions, user },
    users,
  } = state;
  // const listId = '64f9f290-3f78-49e9-b731-909e9de36bac';
  
  const listId = (function(){
    const path = window.location.pathname.split('/');
    return path[path.length - 1];
  })();
  const hiddenEntryIds = exclusions[listId] || [];
  const { entries: entryIds = [] } = (listsById[listId] || {});
  const candidateIds = entryIds.filter(entryId => {
    return hiddenEntryIds.indexOf(entryId) < 0;;
  });

  const userListData = ((users.byId[user.id] || {}).listStats || {})[listId] || {};
  const isNewUserForList = !(userListData && userListData.matchup_count > 0);

  return {
    candidateIds,
    entriesById,
    listsById,
    loaded,
    user,
    isNewUserForList,
  }
})(ListDetail);