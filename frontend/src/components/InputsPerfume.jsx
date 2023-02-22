import React from 'react';

const InputsPerfume = ({isLoading, perfumes, setName, setCount}) => {
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
        <input onChange={e => {setCount(e.target.value)}}
               type="text" placeholder='Введите количество' />
      </div>
    </div>
  );
};

export default InputsPerfume;