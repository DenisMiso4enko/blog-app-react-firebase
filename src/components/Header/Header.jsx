import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.email);

  return (
    <header className="header header-container">
      <nav className="header__nav">
        <NavLink to="/">Home</NavLink>
        {user ? (
          <>
            <NavLink to="/create">Create Post</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
