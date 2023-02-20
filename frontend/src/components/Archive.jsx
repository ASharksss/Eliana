import React from 'react';


const Archive = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="archive">
          <div className="table_header">
            <h2>Архив</h2>
          </div>
          <input type="text" placeholder='Поиск' className='search'/>
          <div className="filter_dates">
            <div className="block_date">
              <label>Начальная дата</label>
              <input type="date" className='datepicker'/>
            </div>
            <div className="block_date">
              <label>Конечная дата</label>
              <input type="date" className='datepicker'/>
            </div>
          </div>
          <table>
            <thead>
            <tr>
              <th>Вид</th>
              <th>Аромат</th>
              <th>Кол-во</th>
              <th>Причина</th>
              <th>Дата</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Archive;