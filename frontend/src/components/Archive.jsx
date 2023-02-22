import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArchive} from "../redux/slices/slices";


const Archive = () => {

  const dispatch = useDispatch()
  const {archive} = useSelector(state => state.archive)

  const isArchiveLoading = archive.status === 'loading'

  useEffect(() => {
    dispatch(fetchArchive())
  }, [])

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
              <th>Артикул</th>
              <th>Аромат</th>
              <th>Кол-во</th>
              <th>Куда</th>
              <th>Дата</th>
              <th>Пользователь</th>
            </tr>
            </thead>
            <tbody>
            {(isArchiveLoading ? [...Array(5)] : archive.items).map((obj, index) => isArchiveLoading ? 'loading'
              :
              <tr key={index}>
                <td>{obj.flavoring.typeFlavoring.name}</td>
                <td>{obj.flavoring.vendor_code}</td>
                <td>{obj.flavoring.name}</td>
                <td>{obj.count}</td>
                <td>{obj.client}</td>
                <td>{new Intl.DateTimeFormat().format(new Date(obj.createdAt))}</td>
                <td>{obj.user.name}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Archive;