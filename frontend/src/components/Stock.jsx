import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {fetchConsumables, fetchConsumablesChemistry, fetchConsumablesStickers} from "../redux/slices/slices";


const Consumable = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const [preloader, setPreloader] = useState(true)
  const {consumable} = useSelector(state => state.consumable)
  const {consumableChemistry} = useSelector(state => state.consumableChemistry)
  const {consumableStickers} = useSelector(state => state.consumableStickers)
  // const {consumablePerfume} = useSelector(state => state.perfume)

  const isConsumableLoading = data.status === 'loading'

  useEffect(() => {
    setInterval(() =>  // таймер заглужка, чтобы компонеты успели прогрузиться
    setPreloader(false), 500) //интервал выставил в 0.5с если что, можно увеличить до 1с (1с = 1000мс)0
  }, [])

  useEffect(() => {
    let location = window.location.pathname.split('/')[1] //тут получаем названия склада по урлу http://localhost:3000/stickers => stickers
    switch (location) {     //в кейсах идет проверка по названию
      case 'consumable':
        dispatch(fetchConsumables())
        if (consumable.status === 'loaded')
          setData(consumable)
        break
      case 'chemistry':
        dispatch(fetchConsumablesChemistry())
        if (consumableChemistry.status === 'loaded')
          setData(consumableChemistry) //записываем в общий state чтобы в дальнейшем использовать
        break
      case 'stickers':
        dispatch(fetchConsumablesStickers())
        if (consumableStickers.status === 'loaded')
          setData(consumableStickers)
        break
    }
  }, [])

  if (preloader) {
    return <p>Загрузка</p> //заглушка, чтобы преждевременно не строить таблицу
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
          <input type="text" placeholder='Поиск' className='search'/>
          <table>
            <thead>
            <tr>
              <th>Наименование</th>
              <th>Количество</th>
            </tr>
            </thead>
            <tbody>
            {(isConsumableLoading ? [...Array(5)] : data.items).map((obj, index) =>
              isConsumableLoading ? 'loading'
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