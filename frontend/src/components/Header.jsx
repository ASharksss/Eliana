import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {


  return (
    <div className='header_wrapper'>
      <div className="container">
        <div className="header">
          <div className="logo">
            <h2>Элиана</h2>
          </div>
          <div className="link">
            <NavLink to='history'>
              Посмотреть историю действий
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header

