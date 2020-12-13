import { connect } from 'react-redux';
import './TopNav.scss';

import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Logo from '../Logo/Logo.js';

function TopNav(props = {}) {
  const {
    username = 'liamjsc',
  } = props;
  return (
    <div className="TopNav">
      <div className="site-title-nav">
        <Logo className="site-title" />
        <div className="nav">
          <div className="nav-tab">
            <Button color="primary">About</Button>
          </div>
          <div className="nav-tab">
            <Button color="inherit">Favorites</Button>
          </div>
          <div className="nav-tab">
            <Button color="inherit">Community</Button>
          </div>
          <div className="nav-tab">
            <Button color="inherit">Create</Button>
          </div>
        </div>
      </div>
      <div className="site-buttons">
        <div className="site-button">
          <SearchIcon />
        </div>
        <div className="site-button">
          <NotificationsNoneIcon />
        </div>
        <div className="site-button">{username}</div>
        {/* <AccountCenter/> */}
      </div>
    </div>
  );
}

export default connect((state) => {
  console.log(state);
  return {};
})(TopNav);