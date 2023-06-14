import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import {fetchSupplies, fetchSuppliesFlavoring} from "../../redux/slices/slices";

const SuppliesFlavoring = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const {state} = location
  const {suppliesFlavoring} = useSelector(state => state.suppliesFlavoring)
  const {supplies} = useSelector(state => state.supplies)

  const isLoading = suppliesFlavoring.status === 'loading'

  useEffect(() => {
    let id = document.location.search
    dispatch(fetchSuppliesFlavoring(id))
    dispatch(fetchSupplies)
  }, [])

  return (
    <div className='container'>
      <div className="row">
        <div>
          <h1>{!isLoading && suppliesFlavoring.items.length > 0 ? suppliesFlavoring.items[0].supply.name : state.name}</h1>
          <h2>Клиент: {!isLoading && suppliesFlavoring.items.length > 0 ? suppliesFlavoring.items[0].supply.client : 'не указан'}</h2>
          <h2>Сформирован: {!isLoading && suppliesFlavoring.items.length > 0 ? new Intl.DateTimeFormat().format(new Date(suppliesFlavoring.items[0].supply.createdAt)) : 'не указан'}</h2>
        </div>
        <NavLink to='addSupplyFlavoring'>
          <button>
            Добавить в заказ
          </button>
        </NavLink>
      </div>

      <table>
        <thead>
        <tr>
          <th>Артикул</th>
          <th>Аромат</th>
          <th>Количество</th>
          <th>Вид</th>
        </tr>
        </thead>
        <tbody>

        {
          (isLoading ? [...Array(5)] : suppliesFlavoring.items.map((obj) => isLoading ? 'loading'
            :
            <tr key={obj.id}>
              <td>{obj.flavoringVendorCode}</td>
              <td>{obj.flavoring.name}</td>
              <td>{obj.count}</td>
              <td>{obj.flavoring.typeFlavoring.name}</td>
            </tr>
          ))}
        {
          suppliesFlavoring.items.length === 0 &&
          <tr>
            <td>Пусто</td>
          </tr>
        }
        </tbody>
      </table>
    </div>
  );
};

export default SuppliesFlavoring;