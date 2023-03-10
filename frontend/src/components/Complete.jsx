import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchComplete} from "../redux/slices/slices";

const Complete = () => {

  const dispatch = useDispatch()
  const {completeProducts} = useSelector(state => state.complete)
  const [search, setSearch] = useState('')

  const isCompleteLoading = completeProducts.status === 'loading'

  useEffect(() => {
    dispatch(fetchComplete())
  }, [])


  let resultSearch = (completeProducts.items).filter(item => item.flavoring.name.toLowerCase().includes(search.toLowerCase()))

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
            {console.log(completeProducts)}
            <tbody>
              {

                (isCompleteLoading ? [...Array(5)] : resultSearch).map((obj, index) => isCompleteLoading ? 'loading'
                  :
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
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complete;