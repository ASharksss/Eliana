import React from 'react';

const AddComplete = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="add_complete">
          <div className="complete_inputs">
            <h2>Формирование ароматизаторов</h2>
            <div className="complete_input">
              <label>Вид ароматизатора</label>
              <select>
                <option>Фитиль</option>
                <option>Спрей</option>
                <option>Саше</option>
              </select>
            </div>
            <div className="complete_input">
              <label>Раствор</label>
              <select>
                <option>5% BOSS 10л</option>
                <option>Раствор 2</option>
                <option>Раствор 3</option>
              </select>
            </div>
            <div className="complete_input">
              <label>Количество</label>
              <input type="text" placeholder='Количество'/>
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
            <button className="submit solute_btn">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComplete;