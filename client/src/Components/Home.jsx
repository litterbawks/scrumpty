import React from 'react';
import { Link } from 'react-router-dom';
import UpdateUserForm from './UpdateUserForm.jsx';

const Home = ({ user }) => {
  const splashStyle = {
    maxWidth: '300',
    fontSize: '2em',
    fontWeight: 'lighter',
    margin: '4em auto',
    textAlign: 'center',
  };
  if (user) {
    return (
      <div style={splashStyle}>
        Welcome,
        <span style={{ color: 'grey' }}>
          {' '}
          {user.preferred}
        </span>
        .
        <br />
        Create a
        <Link to="/addsprint" style={{ color: '#ed1a5c', textDecoration: 'none' }}>
          {' '}
          new sprint
        </Link>
        , or view a sprint from the dropdown at the top of the screen.
      </div>

    );
  }
  return (
    <div style={splashStyle}>
      Welcome to Scrumpty! Login to view your sprints.
    </div>
  );
};

export default Home;
