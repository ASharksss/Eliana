import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchComplete} from "../redux/slices/slices";

const Complete = () => {

  const dispatch = useDispatch()
  const {completeProducts} = useSelector(state => state.complete)

  const isCompleteLoading = completeProducts.status === 'loading'

  useEffect(() => {
    dispatch(fetchComplete())
  }, [])


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
          <input type="text" placeholder='Поиск' className='search'/>
          <table>
            <thead>
            <tr>
              <th>Вид</th>
              <th>Артикул</th>
              <th>Аромат</th>
              <th>Кол-во</th>
              <th>Время создания</th>
            </tr>
            </thead>
            <tbody>
              {
                (isCompleteLoading ? [...Array(5)] : completeProducts.items).map((obj, index) => isCompleteLoading ? 'loading'
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
                    <td>
                      {new Intl.DateTimeFormat().format(new Date(obj.createdAt))}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complete;