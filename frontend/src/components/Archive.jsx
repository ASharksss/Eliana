import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchArchive } from "../redux/slices/slices";


const Archive = () => {

  const dispatch = useDispatch()
  const { archive } = useSelector(state => state.archive)

  const [search, setSearch] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  const isArchiveLoading = archive.status === 'loading'

  const [data, setData] = useState([])

  useEffect(() => {
    setData(archive.items)
  }, [isArchiveLoading])

  useEffect(() => {
    dispatch(fetchArchive())
  }, [])

  useEffect(() => {
    if (currentDate != '') {
      let resultSearchData = (archive.items).filter(item => item.client.toLowerCase().includes(search.toLowerCase()))
            .filter(item => new Intl.DateTimeFormat().format(new Date(item.createdAt)).includes(new Date(Date.parse(currentDate)).toLocaleDateString()))
      setData(resultSearchData)
    } else {
      let resultSearchData = (archive.items).filter(item => item.client.toLowerCase().includes(search.toLowerCase()))
      setData(resultSearchData)
    }
  }, [search])

  useEffect(() => {
    if (currentDate != '') {
      let resultSearchData = (archive.items).filter(item => item.client.toLowerCase().includes(search.toLowerCase()))
            .filter(item => new Intl.DateTimeFormat().format(new Date(item.createdAt)).includes(new Date(Date.parse(currentDate)).toLocaleDateString()))
      setData(resultSearchData)
    } else if (search != '') {
      let resultSearchData = (archive.items).filter(item => item.client.toLowerCase().includes(search.toLowerCase()))
      setData(resultSearchData)
    } else {
      setData(archive.items)
    }
  }, [currentDate])

  return (
    <div className='wrapper'>
      <div className="container">
        <div className="archive">
          <div className="table_header">
            <h2>Архив</h2>
          </div>
          <input type="text" placeholder='Поиск по заказчику' className='search'
            value={search} onChange={e => setSearch(e.target.value)} />
          <div className="filter_dates">
            <div className="block_date">
              <label>Дата</label>
              <input type="date" className='datepicker' value={currentDate} onChange={event => setCurrentDate(event.target.value)} />
              <button onClick={() => {
                setCurrentDate('')
                setSearch('')
              }}>Очистить</button>
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
              {(isArchiveLoading ? [...Array(5)] : data).map((obj, index) => isArchiveLoading ? 'loading'
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