import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSelectsForComplete} from "../../redux/slices/slices";

const AddSuppliesFlavoring = () => {

  const {selectsForComplete} = useSelector(state => state.selectsForComplete)
  const {supply} = useSelector(state => state.supplies)


  const [typeFlavoring, setTypeFlavoring] = useState('')
  const [vendorCode, setVendorCode] = useState('')
  const [count, setCount] = useState('')

  const dispatch = useDispatch()

  const isLoading = selectsForComplete.status === 'loading'

  useEffect(() => {
    dispatch(fetchSelectsForComplete())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      flavoringVendorCode: vendorCode,
      count: count,
    }
    console.log(data)
  }

  return (
    <div className='container'>
      <form className="addSuppliesFlavoring" onSubmit={event => handleSubmit(event)}>
        <h1>Выберите товар</h1>
        <select onChange={e => {
          setVendorCode('')
          setTypeFlavoring(e.target.value)
        }}>
          <option>Выберите вид ароматизатора</option>
          {(isLoading ? [...Array(5)] : selectsForComplete.items.typesFlavoring).map((obj, index) => isLoading ? 'Загрузка'
            :
            <option key={index} value={obj.id}>{obj.name}</option>
          )}
        </select>
        <div className="row">
          <select onChange={e => {
            setVendorCode(e.target.value)
          }}>
            <option value="">Выберите ароматизатор</option>
            {(isLoading ? [...Array(5)] : selectsForComplete.items.flavorings).map((obj, index) => isLoading ? 'Загрузка'
              : typeFlavoring == obj.typeFlavoring.id &&
              <option key={index} value={obj.vendor_code}>{obj.name}</option>
            )}
          </select>
          <input type="text" placeholder='Введите количество' onChange={(e) => setCount(e.target.value)}/>
        </div>
        <button type='submit'>Добавить</button>
      </form>
    </div>
  );
};

export default AddSuppliesFlavoring;