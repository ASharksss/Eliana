import React from 'react';
import {NavLink} from "react-router-dom";

const Resume = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="resume">
          <div className="table_header">
            <h2>Расходники</h2>
            <NavLink to='/addResume'>
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
            <tr>
              <td>Бутылка</td>
              <td>60304</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Resume;