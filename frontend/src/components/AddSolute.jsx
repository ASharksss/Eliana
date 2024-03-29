import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addSolutions, fetchPerfumes } from "../redux/slices/slices";
import InputsPerfume from "./InputsPerfume";
import {useNavigate} from "react-router-dom";

const AddSolute = () => {
  const navigate = useNavigate()

  const [percentSolution, setPercentSolution] = useState('')
  const [aroma, setAroma] = useState('')
  const [perfume, setPerfume] = useState([])
  const [countPg, setCountPg] = useState('')
  const [countPag, setCountPag] = useState('')
  const [literSolution, setLiterSolution] = useState('')
  const [inputData, setInputData] = useState({})
  const [inputList, setInputList] = useState([]);
  const {user} = useSelector(state => state.user)
  const [sId, setSId] = useState('')

  const addInputsPerfume = () => {
    setInputList(inputList.concat(<InputsPerfume
      isLoading={isLoading}
      setData={setInputData}
      perfumes={perfumes}
      key={inputList.length} />));
  }
  const { perfumes } = useSelector(state => state.perfumes)
  const isLoading = perfumes.status === 'loading'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPerfumes())
  }, [])

  useEffect(() => {
    if (perfume.length === 0 && Object.keys(inputData).length > 0) {
      setPerfume([inputData])
    }
    if (perfume.length > 0) {
      let setted = false
      setPerfume(perfume.map(item => {
             if (item.name == inputData.name){
                 setted = true
                 return {...item, count: inputData.count}
             } else {
                 return item
             }
          }
      ))
      if (!setted) {
        setPerfume( [...perfume, inputData])
      }
    }
  }, [inputData])

  const handleSubmit = async (e) => {
    e.preventDefault()// Не обновление
    const data = {
      percent_solution: percentSolution,
      aroma: aroma,
      userId: user.data.id,
      perfumes: perfume,
      consumables: [{
        name: 'ПГ',
        count: countPg
      },
      {
        name: 'ПЭГ',
        count: countPag
      }
      ],
      liter: literSolution,
    }
    const send = await dispatch(addSolutions(data))
    if (send)
      navigate(-1)
  }



  return (
    <div className='wrapper'>
      <div className="container">
        <div className="add_solute">
          <div className="solute_inputs">
            <h2>Создание раствора</h2>
            <form onSubmit={event => handleSubmit(event)}>
              <div className="solute_input">
                <label>% раствора</label>
                <input value={percentSolution} onChange={e => setPercentSolution(e.target.value.replace(',', '.'))} type="number" required/>
              </div>
              <div className="solute_input">
                <label>Аромат</label>
                <input onChange={e => setAroma(e.target.value)} type="text" required/>
              </div>
              {inputList}
              <button type='button' onClick={addInputsPerfume}>Добавить отдушку</button>
              <div className="solute_input">
                <label>ПГ(кг.)</label>
                <input value={countPg} onChange={e => setCountPg(e.target.value.replace(',', '.'))} type="number" placeholder='Введите количество' required/>
              </div>
              <div className="solute_input">
                <label>ПЭГ(кг.)</label>
                <input value={countPag} onChange={e => setCountPag(e.target.value.replace(',', '.'))} type="number" placeholder='Введите количество' required/>
              </div>
              <div className="solute_input">
                <label>Литры</label>
                <input value={literSolution} onChange={e => setLiterSolution(e.target.value.replace(',', '.'))} type="number" placeholder='Введите количество' required/>
              </div>
              <button type='submit' className="submit solute_btn">Добавить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSolute;