import React from 'react';
import {NavLink} from "react-router-dom";

const Complete = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="complete">
          <div className="table_header">
            <h2>Готовая продукция</h2>
            <NavLink to='/addComplete' className='complete_btn'>
              <button>
                Пополнить
              </button>
            </NavLink>
            <div className='space'></div>
            <NavLink to='/sendOrder'>
              <button>
                Отправить
              </button>
            </NavLink>
          </div>
          <input type="text" placeholder='Поиск' className='search'/>
          <table>
            <thead>
            <tr>
              <th>Вид</th>
              <th>Аромат</th>
              <th>Кол-во</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Спрей</td>
              <td>BOSS</td>
              <td>10</td>

            </tr>
            <tr>
              <td>Фитиль</td>
              <td>Ваниль</td>
              <td>20</td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complete;