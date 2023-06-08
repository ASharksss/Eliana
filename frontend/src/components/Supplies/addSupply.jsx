import React, {useState} from 'react';
import './supplies.css'
import {useDispatch, useSelector} from "react-redux";
import {addSupply} from "../../redux/slices/slices";
import {NavLink} from "react-router-dom";

const AddSupply = () => {

  const dispatch = useDispatch()
  const [supplyName, setSupplyName] = useState('')
  const [client, setClient] = useState('')
  const {user} = useSelector(state => state.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      name: supplyName,
      client: client,
      userId: user.data.id
    }
    await dispatch(addSupply(data))
  }

  return (
    <div className='container'>
      <form className="addSupply" onSubmit={event => handleSubmit(event)}>
        <h1 className='addSupply_title'>Создание заказа</h1>
        <input type="text" className='addSupply_input' placeholder='Введите название' onChange={(e) => setSupplyName(e.target.value) }/>
        <input type="text" className='addSupply_input' placeholder='Введите клиента' onChange={(e) => setClient(e.target.value) }/>
          <button type='submit' className='addSupply_submit noBtn'>Создать</button>
        <NavLink to='addSupplyFlavoring'>
          <button type='submit' className='addSupply_submit noBtn'>Дальше</button>
        </NavLink>
      </form>
    </div>
  );
};

export default AddSupply;