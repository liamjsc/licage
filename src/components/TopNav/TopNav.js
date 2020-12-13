import './TopNav.scss';
import Logo from '../Logo/Logo.js';

function TopNav(props = {}) {
  const {} = props;
  return (
    <div className="TopNav">
      <Logo className="site-title" />
      {/* <Search/> */}
      {/* <NotificationCenter/> */}
      {/* <AccountCenter/> */}
    </div>
  );
}

export default TopNav;