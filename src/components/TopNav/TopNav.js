import { connect } from 'react-redux';
import './TopNav.scss';
import Logo from '../Logo/Logo.js';

function TopNav(props = {}) {
  const {} = props;
  return (
    <div className="TopNav">
      <div className="site-title-nav">
        <Logo className="site-title" />
        <div className="nav">
          <div className="nav-tab">Rank</div>
          <div className="nav-tab">Favorites</div>
          <div className="nav-tab">Create</div>
        </div>
        <div className="site-buttons">
          {/* <Search/> */}
          {/* <NotificationCenter/> */}
          {/* <AccountCenter/> */}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => {
  console.log(state);
  return {};
})(TopNav);