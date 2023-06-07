import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSupplies} from "../../redux/slices/slices";
import {useParams} from "react-router-dom";

const Supplies = () => {
  const dispatch = useDispatch()
  const {supplies} = useSelector(state => state.supplies)
  const {user} = useSelector(state => state.user)
  const [search, setSearch] = useState('')

  const isSuppliesLoading = supplies.status === 'loading'

  useEffect(() => {
    dispatch(fetchSupplies())
  }, [])


  let resultSearch = (supplies.items).filter(item => item.client.toLowerCase().includes(search.toLowerCase()))

  console.log(supplies)

  return (
    <div className='container'>
      <div className="supplies">
        <div className="supplies_header row alit-center">
          <h1>Отправленные заказы</h1>
          <NavLink to='addSupply'>
            <button>Новый заказ</button>
          </NavLink>
        </div>

        <table className="supplies_list">
          <thead>
          <tr>
            <th>Дата</th>
            <th>Название</th>
            <th>Клиент</th>
            <th>Пользователь</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {(isSuppliesLoading ? [...Array(5)] : resultSearch).map((obj) => isSuppliesLoading ? 'loading'
            :
            <tr key={obj.id}>
              <td>{obj.createdAt}</td>
              <td>{obj.name}</td>
              <td>{obj.client}</td>
              <td>{obj.user.name}</td>
              <td>
                <NavLink to={'supply/?id=' + obj.id}>
                  <button>Открыть</button>
                </NavLink>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Supplies;