import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import axios from "../axios";
import {fetchConsumables} from "../redux/slices/slices";


const Consumable = () => {

  const dispatch = useDispatch()
  const {consumable} = useSelector(state => state.consumable)

  const isConsumableLoading = consumable.status === 'loading'

  useEffect(() => {
    dispatch(fetchConsumables())
  }, [])

  console.log(consumable)

  return (
    <div className='wrapper'>
      <div className="container">
        <div className="resume">
          <div className="table_header">
            <h2>Расходники</h2>
            <NavLink to='/addConsume'>
              <button>
                Пополнить
              </button>
            </NavLink>
          </div>
          <input type="text" placeholder='Поиск' className='search'/>
          <table>
            <thead>
            <tr>
              <th>Наименование</th>
              <th>Количество</th>
            </tr>
            </thead>
            <tbody>
            {(isConsumableLoading ? [...Array(5)] : consumable.items).map((obj, index) =>
              isConsumableLoading ? 'loading'
                :
                <tr key={index}>
                  <td>{obj.name}</td>
                  <td>{obj.count}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Consumable;