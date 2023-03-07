import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addConsumable, fetchConsumablesName} from "../redux/slices/slices";

const AddConsume = () => {
  const [countResume, setCountResume] = useState('')
  const [selected, setSelected] = useState('')
  const {consumablesName} = useSelector(state => state.consumablesName)
  const isLoading = consumablesName.status === 'loading'
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchConsumablesName())
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: selected,
      count: countResume
    }
    dispatch(addConsumable(data))
  }
  return (
    <div className='wrapper'>
      <div className="container">
        <form onSubmit={event => handleSubmit(event)}>
          <div className="resume_add">
            <select onChange={e => setSelected(e.target.value)}>
              <option>Выберите...</option>
              {(isLoading ? [...Array(5)] : consumablesName.items).map((obj, index) => isLoading ? 'loading'
                :
                <option key={obj.index} value={obj.name}>{obj.name}</option>
              )}
            </select>
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