import React from 'react';

const AddSolute = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="add_solute">

          <div className="solute_inputs">
            <h2>Создание раствора</h2>
            <div className="solute_input">
              <label>% раствора</label>
              <input type="text"/>
            </div>

            <div className="solute_input">
              <label>Вид отдушки</label>
              <select>
                <option>Отдушка...</option>
                <option>Boss</option>
                <option>Черный Лед</option>
                <option>Дыня</option>
              </select>
            </div>

            <div className="solute_input">
              <label>Отдушка (г)</label>
              <input type="text" placeholder='Введите количество'/>
            </div>

            <div className="solute_input">
              <label>ПГ(г)</label>
              <input type="text" placeholder='Введите количество'/>
            </div>

            <div className="solute_input">
              <label>ПЭГ(г)</label>
              <input type="text" placeholder='Введите количество'/>
            </div>

            <div className="solute_input">
              <label>Литры</label>
              <input type="text" placeholder='Введите количество'/>
            </div>
            <button className="submit solute_btn">Добавить</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSolute;