import React, {useState} from 'react';
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
              <button className='stock_btn' value={2}>Химия</button>
            </NavLink>
            <NavLink className='stock_link' to='/stickers'>
              <button className='stock_btn' value={3}>Наклейки</button>
            </NavLink>
            <NavLink className='stock_link' to='/perfumes'>
              <button className='stock_btn' value={4}>Отдушки</button>
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Consumable;