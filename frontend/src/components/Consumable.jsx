import React from 'react';
import {NavLink} from "react-router-dom";



const Consumable = () => {


  return (
    <div className='wrapper'>
      <div className="container">
        <div className="resume">
          <h1 className='title'>Выберите склад</h1>
          <div className="stock_navigate">
            <NavLink className='stock_link' to='/consumable'>
              <button className='stock_btn'>Комплектующие</button>
            </NavLink>
            <NavLink className='stock_link' to='/chemistry'>
              <button className='stock_btn'>Химия</button>
            </NavLink>
            <NavLink className='stock_link' to='stickers'>
              <button className='stock_btn'>Наклейки</button>
            </NavLink>
            <NavLink className='stock_link' to='stickers'>
              <button className='stock_btn'>Отдушки</button>
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Consumable;