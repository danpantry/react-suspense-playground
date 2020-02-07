import React from 'react';

export default function withResources(Component) {
  return () => {
    const initialProps = React.useMemo(
      () => ('fetchResources' in Component ? Component.fetchResources() : {}),
      []
    );

    return (
      <React.Suspense fallback={<h1>Loading...</h1>}>
        <Component {...initialProps} />
      </React.Suspense>
    );
  };
}
