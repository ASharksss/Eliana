import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSelectsForComplete} from "../redux/slices/slices";

const AddComplete = () => {

  const {selectsForComplete} = useSelector(state => state.selectsForComplete)

  const [typeFlavoring, setTypeFlavoring] = useState('')
  const [vendorCode, setVendorCode] = useState('')
  const [solution, setSolution] = useState('')
  const [count, setCount] = useState('')

  const isLoading = selectsForComplete.status === 'loading'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSelectsForComplete())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      typeFlavoringId: typeFlavoring,
      vendorCode: vendorCode,
      solutionId: solution,
      count: count
    }
  }

  return (
    <div className='wrapper'>
      <div className="container">
        <div className="add_complete">
          <div className="complete_inputs">
            <h2>Формирование ароматизаторов</h2>
            <div className="complete_input">

              <label>Вид ароматизатора</label>
              <select onChange={e => setTypeFlavoring(e.target.value)}>
                <option>Выбрите вид ароматизатора...</option>
                {(isLoading ? [...Array(5)] : selectsForComplete.items.typesFlavoring).map((obj, index) => isLoading ? 'Загрузка'
                  :
                  <option value={obj.id}>{obj.name}</option>
                )}

              </select>
              <label>Артикул</label>
              <input type="text" disabled value={vendorCode}/>

              <label>Название</label>
              <select onChange={e => setVendorCode(e.target.value)}>
                <option>Выберите ароматизатор</option>

                {(isLoading ? [...Array(5)] : selectsForComplete.items.flavorings).map((obj, index) => isLoading ? 'Загрузка'
                  :
                  <option value={obj.vendor_code}>{obj.name}</option>
                )}
              </select>

            </div>
            <div className="complete_input">
              <label>Раствор</label>
              <select  onChange={e => setSolution(e.target.value)}>
                <option>Выберите раствор</option>
                {(isLoading ? [...Array(5)] : selectsForComplete.items.solutions).map((obj, index) => isLoading ? 'Загрузка'
                  :
                  <option value={obj.id}><span>{obj.percent_solution + '%, '+ obj.aroma + ', ' + obj.liter + 'л'}</span></option>
                )}
              </select>
            </div>
            <div className="complete_input">
              <label>Количество</label>
              <input value={count} onChange={e => setCount(e.target.value)} type="text" placeholder='Количество'/>
            </div>
            <div className="complete_input">
              <label>Расход</label>
              <textarea cols="40" rows="5" defaultValue='Литры раствора: 0
                Крышки: 0
                Бутылки (фитиль): 0
                Передняя наклейка (фитиль): 0
                Задняя наклейка (фитиль): 0
                Наклейка (спрей): 0
                Фитиля: 0
                Распылитель: 0
                Бутылки (спрей): 0
                Коробки (спрей): 0'></textarea>
            </div>
            <button type='submit' className="submit solute_btn">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComplete;