import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addSolutions, fetchPerfumes} from "../redux/slices/slices";
import InputsPerfume from "./InputsPerfume";

const AddSolute = () => {

  const [percentSolution, setPercentSolution] = useState('')
  const [aroma, setAroma] = useState('')
  const [perfume, setPerfume] = useState([])
  const [countPg, setCountPg] = useState('')
  const [countPag, setCountPag] = useState('')
  const [literSolution, setLiterSolution] = useState('')
  const [send, setSend] = useState(false)
  const [inputList, setInputList] = useState([]);
  const [inputData, setInputData] = useState({})

  const addInputsPerfume = () => {
    if (inputData) {
      setPerfume(state => [...state, inputData])
      setInputData({})
    }
    setInputList(inputList.concat(<InputsPerfume
      setData={setInputData}
      isLoading={isLoading}
      perfumes={perfumes}
      key={inputList.length}/>));
  }
  const {perfumes} = useSelector(state => state.perfumes)
  const isLoading = perfumes.status === 'loading'

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPerfumes())
  }, [])

  useEffect(() => {
    if (inputData && send === true) {
      setPerfume(state => [...state, inputData])
    }
  }, [send])

  const handleSubmit = (e) => {
    e.preventDefault()// Не обновление
    setSend(true)
    const data = {
      percent_solution: percentSolution,
      aroma: aroma,
      perfumes: perfume.shift(),
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
    console.log(data)
    //dispatch(addSolutions(data))
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
                <input onChange={e => setPercentSolution(e.target.value)} type="text"/>
              </div>
              <div className="solute_input">
                <label>Аромат</label>
                <input onChange={e => setAroma(e.target.value)} type="text"/>

              </div>
              {inputList}
              <button type='button' onClick={addInputsPerfume}>Еще отдушка</button>
              <div className="solute_input">
                <label>ПГ(г)</label>
                <input onChange={e => setCountPg(e.target.value)} type="text" placeholder='Введите количество'/>
              </div>
              <div className="solute_input">
                <label>ПЭГ(г)</label>
                <input onChange={e => setCountPag(e.target.value)} type="text" placeholder='Введите количество'/>
              </div>
              <div className="solute_input">
                <label>Литры</label>
                <input onChange={e => setLiterSolution(e.target.value)} type="text" placeholder='Введите количество'/>
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