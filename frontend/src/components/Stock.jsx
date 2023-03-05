import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchConsumables, fetchConsumablesChemistry, fetchConsumablesStickers } from "../redux/slices/slices";


const Consumable = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [preloader, setPreloader] = useState(true)
  const { consumable } = useSelector(state => state.consumable)
  const { consumableChemistry } = useSelector(state => state.consumableChemistry)
  const { consumableStickers } = useSelector(state => state.consumableStickers)
  // const {consumablePerfume} = useSelector(state => state.perfume)

  const isLoading = data.status === 'loading'
  const loadData = () => {
    switch (location) {     //в кейсах идет проверка по названию
      case 'consumable':
        if (consumable.status === 'loaded') {
          setData(consumable)
          setPreloader(false)
        }
        break
      case 'chemistry':
        if (consumableChemistry.status === 'loaded') {
          setData(consumableChemistry) //записываем в общий state чтобы в дальнейшем использовать
          setPreloader(false)
        }
        break
      case 'stickers':
        if (consumableStickers.status === 'loaded') {
          setData(consumableStickers)
          setPreloader(false)
        }
        break
    }
  }

  useEffect(() => {
    console.log('start')
    let pend
    let locationName = window.location.pathname.split('/')[1] //тут получаем названия склада по урлу http://localhost:3000/stickers => stickers
    setLocation(locationName)
    switch (locationName) {     //в кейсах идет проверка по названию
      case 'consumable':
        dispatch(fetchConsumables())
        break
      case 'chemistry':
        dispatch(fetchConsumablesChemistry())
        break
      case 'stickers':
        dispatch(fetchConsumablesStickers())
        break
    }
  }, [])

  if (preloader) {
    return (
      <>
        {loadData()}
        <p>Загрузка</p>
      </>
    )//заглушка, чтобы преждевременно не строить таблицу
  }
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="resume">
          <div className="table_header">
            <h2>Cклад</h2>
            <NavLink to='/addConsume'>
              <button>
                Пополнить
              </button>
            </NavLink>
          </div>
          <input type="text" placeholder='Поиск' className='search' />
          {console.log(consumable)}
          <table>
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {(isLoading ? [...Array(5)] : data.items).map((obj, index) =>
              isLoading ? 'loading'
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