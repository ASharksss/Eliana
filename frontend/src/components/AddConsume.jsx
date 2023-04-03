import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addConsumable, addPerfumes, fetchConsumablesName, fetchPerfumes} from "../redux/slices/slices";

const AddConsume = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {state} = location

  const {perfumes} = useSelector(state => state.perfumes)
  const {user} = useSelector(state => state.user)

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: selected,
      count: countResume,
      userId: user.data.id
    }
    if (state.stock == 'perfumes'){
      const send = await dispatch((addPerfumes(data)))
      if (send)
        navigate(-1)
    }else{
      const send = await dispatch(addConsumable(data))
      if (send)
        navigate(-1)
    }
  }
  return (
    <div className='wrapper'>
      <div className="container">
        <h1 className='stock_title'>Пополнение склада</h1>
        <form onSubmit={event => handleSubmit(event)}>
          <div className="resume_add">
            {state.stock == 'perfumes' ?
              <select onChange={e => setSelected(e.target.value)} required>
                <option hidden>Выберите...</option>
                {(isPerfumeLoading ? [...Array(5)] : perfumes.items).map((obj, index) => isPerfumeLoading ? 'loading'
                  :
                  <option key={obj.index} value={obj.name}>{obj.name}</option>
                )}
              </select> :
              <select onChange={e => setSelected(e.target.value)} required>
                <option hidden>Выберите...</option>
                {(isLoading ? [...Array(5)] : consumablesName.items).map((obj, index) => isLoading ? 'loading'
                  : obj.typeConsumable.name == state.stock &&
                      <option key={obj.index} value={obj.name}>{obj.name}</option>
                )}
              </select>
            }
            <input value={countResume} type="number" onChange={e => setCountResume(e.target.value.replace(',', '.'))}
                   placeholder='Введите количество' required/>
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