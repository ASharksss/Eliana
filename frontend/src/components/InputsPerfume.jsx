import React, {useEffect, useState} from 'react';

const InputsPerfume = ({isLoading, perfumes, setData}) => {
  const [name, setName] = useState('')
  const [count, setCount] = useState('')
  const [data, setInData] = useState({})
  useEffect(() => {
    if (name !== '') {
      setInData({name: name})
    }
    if (name !== '' && count !== '') {
      setInData(state => ({
        ...state,
        count: count
      }))
    }
  }, [name, count])
  useEffect(() => {
    if (name !== '' && count !== '') {
      setData(data)
    }
  }, [data])
  return (
    <div>
      <div className="solute_input">
        <label>Вид отдушки</label>
        <select onChange={e => setName(e.target.value)}>
          <option hidden>Выберите отдушку...</option>
          {(isLoading ? [...Array(5)] : perfumes.items).map((obj) => isLoading ? 'loading'
            :
            <option value={obj.name}>{obj.name}</option>
          )}
        </select>
      </div>

      <div className="solute_input">
        <label>Отдушка (г)</label>
        <input onChange={e => {
          setCount(e.target.value)
        }}
               type="text" placeholder='Введите количество'/>
      </div>
    </div>
  );
};

export default InputsPerfume;