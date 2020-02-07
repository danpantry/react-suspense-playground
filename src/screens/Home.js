import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <Link to="slow">Click me!</Link>
    </div>
  );
}
