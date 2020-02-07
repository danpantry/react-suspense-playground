import React from 'react';

export default class AuthBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    // A real example would actually check more info about this error.
    return { hasError: true };
  }

  render() {
    if (this.state?.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
