import React from 'react';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

class UserProfile extends React.Component {
  render() {
    return (
      <DropdownMenu userName = {this.props.username} triggerType='icon' trigger='glyphicon glyphicon-user'>
        <MenuItem text='Change Password' location='/change-password' />
        <MenuItem text='Delete Account' location='/delete' />
        <MenuItem text='Account Information' location='/details' />
        <MenuItem type='separator' />
        <MenuItem text='Logout' />
      </DropdownMenu>
    )
  }
}

export default UserProfile;