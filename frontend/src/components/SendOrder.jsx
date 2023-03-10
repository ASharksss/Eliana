import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addArchive, fetchSelectsForComplete} from "../redux/slices/slices";

const SendOrder = () => {

  const {selectsForComplete} = useSelector(state => state.selectsForComplete)

  const [typeFlavoring, setTypeFlavoring] = useState('')
  const [vendorCode, setVendorCode] = useState('')
  const [count, setCount] = useState('')
  const [client, setClient] = useState('')

  const isLoading = selectsForComplete.status === 'loading'

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchSelectsForComplete())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      typeFlavoringId: typeFlavoring,
      flavoringVendorCode: vendorCode,
      count: count,
      client: client,
      userId: user.data.id
    }
    dispatch(addArchive(data))
  }

  return (
    <div className='wrapper'>
      <div className="container">
        <form onSubmit={event => handleSubmit(event)}>
          <div className="send_order">
            <div className="order_input">
              <label>Вид ароматизатора</label>
              <select onChange={e => {
                setVendorCode('')
                setTypeFlavoring(e.target.value)
              }}>
                <option>Выберите вид ароматизатора...</option>
                {(isLoading ? [...Array(5)] : selectsForComplete.items.typesFlavoring).map((obj, index) => isLoading ? 'Загрузка'
                  :
                  <option key={index} value={obj.id}>{obj.name}</option>
                )}
              </select>
              <label>Артикул</label>
              <input type="text" disabled value={vendorCode}/>
              <label>Аромат</label>

              <select onChange={e => setVendorCode(e.target.value)}>
                <option>Выберите аромат...</option>
                {(isLoading ? [...Array(5)] : selectsForComplete.items.flavorings).map((obj, index) => isLoading ? 'Загрузка'
                  : typeFlavoring == obj.typeFlavoring.id &&
                  <option key={index} value={obj.vendor_code}>{obj.name}</option>
                )}
              </select>
              <label>Количество</label>
              <input onChange={e => setCount(e.target.value)} type="text"/>
            </div>

            <div className="order_input">
              <label>Куда</label>
              <input onChange={e => setClient(e.target.value)} type="text"/>
            </div>

            <button type='submit' className="submit solute_btn">
              Отправить
            </button>
          </div>
        </form>


      </div>

    </div>
  );
};

export default SendOrder;