import React from 'react';
import { fetchUserProfile } from '../api';
import withResources from '../withResources';

UserProfile.fetchResources = () => {
  return {
    userResource: fetchUserProfile()
  };
};

function UserProfile({ userResource }) {
  const user = userResource.read();
  return (
    <dl>
      <dt>Name</dt>
      <dd>{user.name}</dd>
    </dl>
  );
}

export default withResources(UserProfile);
