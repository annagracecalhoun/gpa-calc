import React from 'react';
import Axios from 'axios';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

function UserProfile(props) {


  return (
    <DropdownMenu userName={props.username} triggerType='icon' trigger='glyphicon glyphicon-user'>
      <MenuItem text='Change Password' location='/change-password' />
      <MenuItem text='Delete Account' location='/delete' />
      <MenuItem text='Account Information' location='/details' />
      <MenuItem type='separator' />
      <MenuItem text='Logout' />
    </DropdownMenu>
  )
}

export default UserProfile;