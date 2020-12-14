import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import Logo from '../Logo/Logo.js';
import './TopNav.scss';

function TopNav(props = {}) {
  const {
    displayName,
    isLoggedIn,
    username,
  } = props;
  return (
    <div className="TopNav">
      <div className="site-title-nav">
        <Link style={{ textDecoration: 'none' }} to="/">
          <Logo className="site-title" />
        </Link>
        <div className="nav">
          <div className="nav-tab">
            <Link style={{ textDecoration: 'none' }} to="/about">
              <Button color="primary.dark">About</Button>
            </Link>
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
        <div className="site-button">
          {
            isLoggedIn ? (
              <Link to={`/@/${username}`}>
                <Button color="primary">
                  {displayName}
                </Button>
              </Link>
            ) : (
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Button
                  color="secondary"
                  variant="contained"
                >
                  Sign in
                </Button>
              </Link>
            )
          }
        </div>
        {/* <AccountCenter/> */}
      </div>
    </div>
  );
}

export default connect((state) => {
  console.log(state);
  const { auth: { user } } = state;
  const displayName = user && (user.username || user.email)
  return {
    isLoggedIn: !!displayName,
    displayName,
    username: user && user.username,
  };
})(TopNav);