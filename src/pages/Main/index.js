import React from 'react';

import UserHeadline from '../../components/UserHeadline';
import CheckFriend from '../../connects/CheckFriend';
import DisplayFriend from '../../connects/DisplayFriend';



function Main() {

  return (
    <main className="main-screen">

      <div className="profile-management">
        <UserHeadline></UserHeadline>
        <CheckFriend></CheckFriend>
      </div>

      <div className="main-dahsboard"></div>
        <DisplayFriend></DisplayFriend>
    </main>
  );
}

export default Main;