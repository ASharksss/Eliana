import React from 'react';
import {NavLink} from "react-router-dom";

const Solute = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="solution">
          <div className="table_header">
            <h2>Растворы</h2>
            <NavLink to='/addSolute'>
              <button>
                Пополнить
              </button>
            </NavLink>
          </div>
          <input type="text" placeholder='Поиск' className='search'/>
          <table>
            <thead>
            <tr>
              <th>% раствора</th>
              <th>Отдушка</th>
              <th>Литры</th>
              <th>Отдушка (г)</th>
              <th>ПГ (г)</th>
              <th>ПЭГ (г)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>5%</td>
              <td>BOSS</td>
              <td>10</td>
              <td>50</td>
              <td>30</td>
              <td>30</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Solute;