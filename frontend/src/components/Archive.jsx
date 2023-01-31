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
            <tr>
              <td>Спрей</td>
              <td>BOSS</td>
              <td>10</td>
              <td>Поставка Фурошоп</td>
              <td>2023-01-27 в 10:49</td>
            </tr>
            <tr>
              <td>Фитиль</td>
              <td>Ваниль</td>
              <td>20</td>
              <td>Поставка Татнефть</td>
              <td>2023-01-27 в 10:49</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Archive;