import React from 'react';
import Resource from '../Resource';
import withResources from '../withResources';

function fetchSlowResource() {
  const task = new Promise(resolve => {
    setTimeout(() => resolve('Hello, slow screen!'), 3000);
  });

  return new Resource(task);
}

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
