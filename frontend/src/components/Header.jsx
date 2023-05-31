import React, {useState} from 'react';
import Sidebar from "./sidebar/Sidebar";

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const hideSidebar = () => {
    setToggle(false)
  }

  return (
    <div className='header_wrapper'>
      <div className="container">
        <div className="header">
          <Sidebar setToggle={setToggle} toggle={toggle} hideSidebar={hideSidebar}/>
          <div className="logo">
            <h2>Элиана</h2>
          </div>

          <div className="link">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Header

