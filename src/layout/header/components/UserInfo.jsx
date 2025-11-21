// external imports
import { memo } from 'react';
import PropTypes from 'prop-types';

// internal imports
import { Menu } from '@components';
import UserMenuTrigger from './UserMenuTrigger';
import UserMenuContent from './UserMenuContent';

function UserInfo({ user = null }) {
  // Early return if no user data
  if (!user) {
    return null;
  }

  return (
    <Menu id="user-menu">
      <Menu.Trigger>
        <UserMenuTrigger user={user} />
      </Menu.Trigger>
      <UserMenuContent user={user} />
    </Menu>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

// Memoize component - only re-renders when user prop changes
export default memo(UserInfo);
