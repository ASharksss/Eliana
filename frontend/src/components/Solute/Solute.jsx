import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {fetchSolutions} from "../../redux/slices/slices";
import {useDispatch, useSelector} from "react-redux";
import axios from '../../axios'
import '../../App.css'
import './solute.css'

const Solute = () => {
  const dispatch = useDispatch()
  const {solutions} = useSelector(state => state.solutions)
  const {user} = useSelector(state => state.user)
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
              <button className='add_solute-btn'>
                Пополнить
              </button>
            </NavLink>
          </div>
          <input type="text" placeholder='Поиск' className='search' onChange={e => setSearch(e.target.value)}/>


          <div className="solute_wrapper">
            {(isSolutionsLoading ? [...Array(5)] : resultSearch).map((obj, index) => isSolutionsLoading ? 'loading'
              :
              <div className="solute_block">
                <div className="row alit-center bb-1px ">
                  <p className="solute_title">% раствора</p>
                  <p className='solute_value'>{obj.percent_solution}</p>
                </div>
                <div className="row alit-center bb-1px">
                  <p className="solute_title">Аромат</p>
                  <p className='solute_value'>{obj.aroma}</p>
                </div>
                <div className="row alit-center bb-1px">
                  <p className="solute_title">Отдушкка</p>
                  <div className="solute_value">
                    {JSON.parse(obj.perfume).map((item, index_perfume) => (
                      <div className='row alit-center' key={index_perfume}>
                        <p className='mr-10px'>{item.name}</p>
                        <p>{item.count} кг.</p>
                      </div>
                    ))}
                  </div>

                </div>
                <div className="row alit-center bb-1px">
                  <p className="solute_title">Литры</p>
                  <p className="solute_value">{parseFloat(obj.liter).toFixed(2)}</p>

                </div>
                <div className="row alit-center">
                  <p className="solute_title">Дата</p>
                  <p className="solute_value">{new Intl.DateTimeFormat().format(new Date(obj.createdAt))}</p>
                </div>
                <div className="row alit-center">
                  <button className='solute_block_btn' onClick={() => removeSolute(obj.id, obj.aroma, obj.percent_solution)} type='button'>Обнулить</button>
                </div>
                <div className="row"></div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Solute;