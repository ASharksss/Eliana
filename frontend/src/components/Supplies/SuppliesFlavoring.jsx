import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchSuppliesFlavoring} from "../../redux/slices/slices";

const SuppliesFlavoring = () => {

  const dispatch = useDispatch()
  const {suppliesFlavoring} = useSelector(state => state.suppliesFlavoring)

  const isLoading = suppliesFlavoring.status === 'loading'

  useEffect(() => {
    let id = document.location.search
    dispatch(fetchSuppliesFlavoring(id))
  }, [])

  return (
    <div className='container'>
      <h1>{!isLoading ? suppliesFlavoring.items[0].supply.name : ''}</h1>
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
        {(isLoading ? [...Array(5)] : suppliesFlavoring.items.map((obj) => isLoading ? 'loading'
          :
          <tr key={obj.id}>
            <td>{obj.flavoringVendorCode}</td>
            <td>{obj.flavoring.name}</td>
            <td>{obj.count}</td>
            <td>{obj.flavoring.typeFlavoring.name}</td>
          </tr>
        ))}

        </tbody>
      </table>
    </div>
  );
};

export default SuppliesFlavoring;