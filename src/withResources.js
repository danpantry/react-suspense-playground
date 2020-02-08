import React from 'react';

/**
 * A HOC that will fetch resources in the static method `fetchResources()` on the given component and provides a Suspense fallback.
 * This is useful for top-level Route components.
 *
 * @param {React.ComponentType<P>} Component The React component to wrap.
 */
export default function withResources(Component) {
  const WithResources = () => {
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

  const displayName = Component.displayName ?? Component.name;
  WithResources.displayName = `WithResources(${displayName})`;

  return WithResources;
}
