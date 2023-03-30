import React from 'react';

export const History = () => {
  return (
    <div className='history'>
      <div className="container">
        <table>
          <thead>
          <th>Описание</th>
          <th>Сколько было</th>
          <th>Сколько стало</th>
          <th>Время</th>
          <th>Пользователь</th>
          </thead>
          <tbody>
          <tr>
            <td>Сделано то-се</td>
            <td>20</td>
            <td>30</td>
            <td>15.00 30.03.23</td>
            <td>Алсу</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
