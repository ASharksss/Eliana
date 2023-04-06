import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { fetchSolutions } from "../redux/slices/slices";
import { useDispatch, useSelector } from "react-redux";
import axios from '../axios'

const Solute = () => {
  const dispatch = useDispatch()
  const { solutions } = useSelector(state => state.solutions)
  const { user } = useSelector(state => state.user)
  const [search, setSearch] = useState('')

  const isSolutionsLoading = solutions.status === 'loading'

  useEffect(() => {
    dispatch(fetchSolutions())
  }, [])

  const removeSolute = (id, name, percent) => {
    const check = window.confirm('Точно хотите обнулить - ' + name + ' ' + percent + '%')
    if (check) {
      axios.delete('/api/user/zeroingSolutionLiter?sId=' + id + '&userId=' + user.data.id)
        .then(res => {
          dispatch(fetchSolutions())
          alert('Значение обнулено')
        })
        .catch(err => {
          alert('Ошибка обработки')
          console.log(err)
        })
    }
  }

  let resultSearch = (solutions.items).filter(item => item.aroma.toLowerCase().includes(search.toLowerCase()))


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
          <input type="text" placeholder='Поиск' className='search' onChange={e => setSearch(e.target.value)} />
          <table>
            <thead>
              <tr>
                <th>%</th>
                <th>Аромат</th>
                <th>Отдушка</th>
                <th>ПГ и ПЭГ</th>
                <th>Литры</th>
                <th>Дата</th>
                <th>Действия</th>
              </tr>

            </thead>
            <tbody>
              {(isSolutionsLoading ? [...Array(5)] : resultSearch).map((obj, index) => isSolutionsLoading ? 'loading'
                :

                <tr key={index}>
                  <td>{obj.percent_solution}</td>
                  <td>{obj.aroma}</td>
                  <td>{JSON.parse(obj.perfume).map((item, index_perfume) => (
                    <tr key={index_perfume}>
                      <td>{item.name}</td>
                      <td>{item.count} кг.</td>
                    </tr>
                  ))}</td>
                  <td>{JSON.parse(obj.consumable).map((item, index_consumable) => (
                    <tr key={index_consumable}>
                      <td>{item.name}</td>
                      <td>{item.count} кг.</td>
                    </tr>
                  ))}</td>
                  <td>{parseFloat(obj.liter).toFixed(2)}</td>
                  <td>
                    {new Intl.DateTimeFormat().format(new Date(obj.createdAt))}
                  </td>
                  <td><button onClick={() => removeSolute(obj.id, obj.aroma, obj.percent_solution)}
                    style={{
                      cursor: 'pointer',
                      border: 'none',
                      padding: '5px',
                      borderRadius: '2px'
                    }} type='button'>Обнулить</button></td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Solute;