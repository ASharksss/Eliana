import React, { useEffect, useState } from 'react';
import axios from '../axios';

export const History = () => {
  const [data, setData] = useState([])
  const [preload, setPreload] = useState(false)
  useEffect(() => {
    setPreload(true)
    axios.get('/api/user/history')
      .then(res => {
        setPreload(false)
        setData(res.data)
      })
      .catch(err => {
        setPreload(false)
        console.log(err)
      })
  }, [])
  return (
    <div className='history'>
      <div className="container">
        {preload ? <p>Загрзка...</p> :
          <table>
            <thead>
              <th>Описание</th>
              <th>Сколько было</th>
              <th>Сколько стало</th>
              <th>Количество</th>
              <th>Время</th>
              <th>Пользователь</th>
            </thead>
            <tbody>
              {data.length < 0 ? '0' :
                data.map(item => (
                  <tr>
                    <td>{item.description}</td>
                    <td>{parseFloat(item.was_count).toFixed(2)}</td>
                    <td>{parseFloat(item.become_count).toFixed(2)}</td>
                    <td>{item.count}</td>
                    <td>{new Date(item.createdAt).toLocaleString('ru-RU').slice(0, -3).split(', ')[1]} / {new Date(item.createdAt).toLocaleString('ru-RU').slice(0, -3).split(', ')[0]}</td>
                    <td>{item.user.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>}
      </div>

    </div>
  );
};
