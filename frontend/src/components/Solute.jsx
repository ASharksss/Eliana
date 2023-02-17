import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {fetchConsumables, fetchSolutions} from "../redux/slices/slices";
import {useDispatch, useSelector} from "react-redux";

const Solute = () => {
  const dispatch = useDispatch()
  const {solutions} = useSelector(state => state.solutions)

  const isSolutionsLoading = solutions.status === 'loading'

  useEffect(() => {
    dispatch(fetchSolutions())
  }, [])


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
          <input type="text" placeholder='Поиск' className='search'/>
          <table>
            <thead>
            <tr>
              <th>% раствора</th>
              <th>Отдушка</th>
              <th>Литры</th>
              <th>Отдушка (г)</th>
              <th>ПГ (г)</th>
              <th>ПЭГ (г)</th>
            </tr>
            </thead>
            <tbody>
            {(isSolutionsLoading ? [...Array(5)] : solutions.items).map((obj, index) => isSolutionsLoading ? 'loading'
                :
                <tr>
                  <td>{obj.percent_solution}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Solute;