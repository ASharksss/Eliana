import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {fetchConsumables, fetchSolutions} from "../redux/slices/slices";
import {useDispatch, useSelector} from "react-redux";

const Solute = () => {
  const dispatch = useDispatch()
  const {solutions} = useSelector(state => state.solutions)
  const [search, setSearch] = useState('')

  const isSolutionsLoading = solutions.status === 'loading'

  useEffect(() => {
    dispatch(fetchSolutions())
  }, [])

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
          <input type="text" placeholder='Поиск' className='search' onChange={e => setSearch(e.target.value)}/>
          <table>
            <thead>
            <tr>
              <th>%</th>
              <th>Аромат</th>
              <th>Отдушка</th>
              <th>ПГ и ПЭГ</th>
              <th>Литры</th>
              <th>Дата</th>
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
                <td>{obj.liter}</td>
                <td>
                  {new Intl.DateTimeFormat().format(new Date(obj.createdAt))}
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Solute;