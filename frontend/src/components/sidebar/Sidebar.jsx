import React, {useEffect, useState, useRef} from 'react';
import './sidebar.css'
import {NavLink} from "react-router-dom";

const Sidebar = ({toggle, setToggle, hideSidebar}) => {
  const sidebarRef= useRef(null)
  const handleClickLink = () => {
    hideSidebar()
    let btn = document.querySelector('.menu__btn')
    btn.click()
  }
  return (
    <div className="hamburger-menu" ref={sidebarRef}>

      <input id="menu__toggle" type="checkbox" value={toggle} onChange={() => setToggle(!toggle)}/>
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>



        <ul className="menu__box">
          <div className="menu__box-container">
            <NavLink to='/' className="noLink">
              <button className='noBtn menu__item-btn menu__item' onClick={() => handleClickLink()}>
                Склад
              </button>
            </NavLink>

            <NavLink to='/solute' className="noLink ">
              <button className='noBtn menu__item-btn menu__item' onClick={() => handleClickLink()}>
                Растворы
              </button>
            </NavLink>
            <NavLink to='/completeProducts' className='noLink'>
              <button className='noBtn menu__item-btn menu__item' onClick={() => handleClickLink()}>
                Готовая продукция
              </button>
            </NavLink>
            <NavLink to='supplies' className='noLink menu__item-btn menu__item' onClick={() => handleClickLink()}>
              Заказы
            </NavLink>
            <NavLink to='/archive' className='noLink'>
              <button className='noBtn menu__item-btn menu__item' onClick={() => handleClickLink()}>
                Архив
              </button>
            </NavLink>
            <NavLink to='history' className='noLink menu__item-btn menu__item' onClick={() => handleClickLink()}>
              История действий
            </NavLink>

          </div>


        </ul>
      </div>


  );
};

export default Sidebar;