import React from 'react';

const SendOrder = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="send_order">
          <div className="order_input">
            <label>Вид ароматизатора</label>
            <select>
              <option>Фитиль</option>
              <option>Спрей</option>
              <option>Саше</option>
            </select>
            <label>Аромат</label>
            <select>
              <option>Черный Лед</option>
              <option>Boss</option>
              <option>Мята и Ваниль</option>
            </select>
            <label>Количество</label>
            <input type="text"/>
          </div>

          <div className="order_input">
            <label>Куда</label>
            <input type="text"/>
          </div>

          <button className="submit solute_btn">
            Отправить
          </button>
        </div>
      </div>

    </div>
  );
};

export default SendOrder;