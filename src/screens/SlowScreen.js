import React from 'react';
import { fetchSlowResource } from '../api';
import withResources from '../withResources';

SlowScreen.fetchResources = () => {
  return {
    resource: fetchSlowResource()
  };
};

function SlowScreen({ resource }) {
  const greeting = resource.read();
  return <h1>{greeting}</h1>;
}

export default withResources(SlowScreen);
