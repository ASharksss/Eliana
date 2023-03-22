import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addComplete, fetchSelectsForComplete } from "../redux/slices/slices";
import axios from "../axios";

const AddComplete = () => {
  const navigate = useNavigate()

  const { selectsForComplete } = useSelector(state => state.selectsForComplete)

  const [typeFlavoring, setTypeFlavoring] = useState('')
  const [vendorCode, setVendorCode] = useState('')
  const [solution, setSolution] = useState('')
  const [count, setCount] = useState('')
  const [sId, setSId] = useState('')

  const isLoading = selectsForComplete.status === 'loading'


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSelectsForComplete())
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      typeFlavoringId: typeFlavoring,
      flavoringVendorCode: vendorCode,
      solutionId: solution,
      count: count
    }
    const send = await dispatch(addComplete(data))
    if (send)
      navigate(-1)
  }

  const addToSolutionLiter = () => {
    axios.get("api/user/addToSolutionLiter?sId=" + sId)
    dispatch(fetchSelectsForComplete())
    console.log(sId)
  }

  return (
    <div className='wrapper'>
      <div className="container">
        <div className="add_complete">
          <form onSubmit={event => handleSubmit(event)}>
            <div className="complete_inputs">

              <h2>Формирование ароматизаторов</h2>
              <button className='addSolutionLiter' type='button'
                      onClick={addToSolutionLiter}>Увеличить раствор</button>
              <div className="complete_input">

                <label>Вид ароматизатора</label>
                <select onChange={e => {
                  setTypeFlavoring(e.target.value)
                  setVendorCode('')
                  }}>
                  <option>Выбрите вид ароматизатора...</option>
                  {(isLoading ? [...Array(5)] : selectsForComplete.items.typesFlavoring).map((obj, index) => isLoading ? 'Загрузка'
                    :
                    <option key={index} value={obj.id}>{obj.name}</option>
                  )}

                </select>
                <label>Артикул</label>
                <input type="text" disabled value={vendorCode} />

                <label>Название</label>
                <select onChange={e => setVendorCode(e.target.value)}>
                  <option hidden>Выберите ароматизатор</option>

                  {(isLoading ? [...Array(5)] : selectsForComplete.items.flavorings).map((obj, index) => isLoading ? 'Загрузка'
                    : typeFlavoring == obj.typeFlavoring.id &&
                    <option key={index} value={obj.vendor_code}>{obj.name}</option>
                  )}
                </select>

              </div>
              <div className="complete_input">
                <label>Раствор</label>
                <select onChange={e => {
                  setSolution(e.target.value)
                  setSId(e.target.value)

                }}>
                  <option>Выберите раствор</option>
                  {(isLoading ? [...Array(5)] : selectsForComplete.items.solutions).map((obj, index) => isLoading ? 'Загрузка'
                    :
                    <option key={index} value={obj.id}>
                      <span>{obj.percent_solution + '%, ' + obj.aroma + ', ' + obj.liter + 'л'}</span></option>
                  )}
                </select>
              </div>
              <div className="complete_input">
                <label>Количество</label>
                <input value={count} onChange={e => setCount(e.target.value)} type="text" placeholder='Количество' />
              </div>
              <div className="complete_input">

              </div>
              <button type='submit' className="submit solute_btn">
                Добавить
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AddComplete;