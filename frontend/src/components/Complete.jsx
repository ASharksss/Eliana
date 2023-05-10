import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addComplete, fetchComplete} from "../redux/slices/slices";

const Complete = () => {
  const dispatch = useDispatch()
  const {completeProducts} = useSelector(state => state.complete)
  const [typeFlavoring, setTypeFlavoring] = useState('Фитиль')
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)

  const isCompleteLoading = completeProducts.status === 'loading'

  useEffect(() => {
    dispatch(fetchComplete())
  }, [])


  let resultSearch = (completeProducts.items).filter(item => item.flavoring.name.toLowerCase().includes(search.toLowerCase()))

  const getCount = () => {
    let array = []
    setCount(0)
    resultSearch.map((obj, item) => {
      if (typeFlavoring === obj.flavoring.typeFlavoring.name) {
        array.push(obj.count)
      }
    })
    setCount(array.reduce((a, b) => a + b, 0))
  }
  useEffect(() => {
    getCount()
  }, [typeFlavoring, resultSearch])

  const createBodyTable = () => {
    return (
      <>
        <tbody>
        {
          (isCompleteLoading ? [...Array(5)] : resultSearch).map((obj, index) => isCompleteLoading ? 'loading'
            :
            typeFlavoring === obj.flavoring.typeFlavoring.name ?
              <tr key={index}>
                <td>
                  {obj.flavoring.typeFlavoring.name}
                </td>
                <td>
                  {obj.flavoringVendorCode}
                </td>
                <td>
                  {obj.flavoring.name}
                </td>
                <td>
                  {obj.count}
                </td>
              </tr> : ''
          )
        }
        </tbody>
      </>
    )
  }

  return (
    <div className='wrapper'>
      <div className="container">
        <div className="complete">
          <div className="table_header">
            <h2>Готовая продукция</h2>
            <NavLink to='/addComplete' className='complete_btn'>
              <button>
                Пополнить
              </button>
            </NavLink>
            <div className='space'></div>
            <NavLink to='/sendOrder'>
              <button>
                Отправить
              </button>
            </NavLink>
          </div>
          <div className="row">
            <button onClick={() => setTypeFlavoring('Фитиль')} className='filter_btn'>Фитиля</button>
            <button onClick={() => setTypeFlavoring('Спрей')} className='filter_btn'>Спреи</button>
            <button onClick={() => setTypeFlavoring('Аттрактант')} className='filter_btn'>Аттрактанты</button>
            <div className="count">
              <h2>Количество {count}</h2>
            </div>
          </div>

          <input type="text" placeholder='Поиск' className='search' onChange={event => setSearch(event.target.value)}/>

          <table>
            <thead>
            <tr>
              <th>Вид</th>
              <th>Артикул</th>
              <th>Аромат</th>
              <th>Кол-во</th>
            </tr>
            </thead>
            {createBodyTable()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complete;