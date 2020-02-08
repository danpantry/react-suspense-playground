import React from 'react';
import styles from './App.module.css';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import Home from './screens/Home';
import SlowScreen from './screens/SlowScreen';
import SignUp from './screens/SignUp';
import UserProfile from './screens/UserProfile';
import Todos from './screens/Todos';
import AuthBoundary from './AuthBoundary';

function App() {
  return (
    <div className={styles.App}>
      <React.Suspense fallback={<h1>Suspended!</h1>}>
        <Router>
          <nav className={styles.nav}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/slow">Slow loading example</NavLink>
            <NavLink to="/sign-up">Sign up</NavLink>
            <NavLink to="/user">Current User Profile</NavLink>
            <NavLink to="/todos">To Do List</NavLink>
          </nav>
          <AuthBoundary fallback={<Navigate to="/sign-up" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/slow" element={<SlowScreen />} />
              <Route path="/sign-up" element={<SignUp nextLocation="/" />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/todos" element={<Todos />} />
            </Routes>
          </AuthBoundary>
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
