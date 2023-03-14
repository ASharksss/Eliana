import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addConsumable, addPerfumes, fetchConsumablesName, fetchPerfumes} from "../redux/slices/slices";
import stock from "./Stock";

const AddConsume = () => {
  const location = useLocation()
  const {state} = location

  const {perfumes} = useSelector(state => state.perfumes)

  const [countResume, setCountResume] = useState('')
  const [selected, setSelected] = useState('')
  const {consumablesName} = useSelector(state => state.consumablesName)
  const isLoading = consumablesName.status === 'loading'
  const isPerfumeLoading = perfumes.status === 'loading'
  const dispatch = useDispatch()
  useEffect(() => {
    if (state.stock == 'perfumes') {
      dispatch(fetchPerfumes())
    } else {
      dispatch(fetchConsumablesName())
    }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: selected,
      count: countResume
    }
    if (state.stock == 'perfumes'){
      dispatch((addPerfumes(data)))
    }else{
      dispatch(addConsumable(data))
    }
  }
  return (
    <div className='wrapper'>
      <div className="container">
        <form onSubmit={event => handleSubmit(event)}>
          <div className="resume_add">
            {state.stock == 'perfumes' ?
              <select onChange={e => setSelected(e.target.value)}>
                <option hidden>Выберите...</option>
                {(isPerfumeLoading ? [...Array(5)] : perfumes.items).map((obj, index) => isPerfumeLoading ? 'loading'
                  :
                  <option key={obj.index} value={obj.name}>{obj.name}</option>
                )}
              </select> :
              <select onChange={e => setSelected(e.target.value)}>
                <option hidden>Выберите...</option>
                {(isLoading ? [...Array(5)] : consumablesName.items).map((obj, index) => isLoading ? 'loading'
                  : obj.typeConsumable.name == state.stock &&
                      <option key={obj.index} value={obj.name}>{obj.name}</option>
                )}
              </select>
            }
            <input value={countResume} type="text" onChange={e => setCountResume(e.target.value)}
                   placeholder='Введите количество'/>
            <button type='submit' className='submit'>
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddConsume;