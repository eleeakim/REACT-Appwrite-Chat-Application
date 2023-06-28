import React from 'react';
import { useAuth } from '../Utils/AuthContext';
import { Link } from 'react-router-dom';
import { LogOut, LogIn } from 'react-feather';

const Header = () => {
  const { user, handleUserLogout } = useAuth();
  
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          <span>Welcome {user.name}</span>
          <LogOut className="header--link" onClick={handleUserLogout} />
        </>
      ) : (
        <>
          <Link to="/login">
            <LogIn className="header--link" />
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
