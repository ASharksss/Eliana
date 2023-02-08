import React from 'react';

const AddConsume = () => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="resume_add">
          <select>
            <option>Бутылка</option>
            <option>Отдушка</option>
            <option>Наклейка</option>
          </select>
          <input type="text" placeholder='Введите количество'/>
          <button className='submit'>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddConsume;