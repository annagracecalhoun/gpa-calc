import React from 'react';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

function UserProfile(props) {


  return (
    <DropdownMenu userName={props.username} triggerType='icon' trigger='glyphicon glyphicon-user'>
      <MenuItem text='Change Password' location='/change-password' />
      <MenuItem text='Delete Account' location='/delete' />
      <MenuItem text='Account Information' location='/details' />
      <MenuItem type='separator' />
      <MenuItem text='Logout' location='/'/>
    </DropdownMenu>
  )
}

export default UserProfile;