import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import './App.css';

//components
import Layout from "./components/Layout";
import Consumable from "./components/Consumable";
import Solute from "./components/Solute/Solute";
import Complete from "./components/Complete/Complete";
import Archive from "./components/Archive";
import AddConsume from "./components/AddConsume";
import AddSolute from "./components/AddSolute";
import AddCompleteFlavoring from "./components/Complete/AddCompleteFlavoring";
import SendOrder from "./components/SendOrder";
import Stock from "./components/Stock";
import Auth from "./components/auth";
import {fetchNewToken, fetchProtect} from "./redux/slices/authSlice";
import {History} from "./components/History";
import Supplies from "./components/Supplies/Supplies";
import SuppliesFlavoring from "./components/Supplies/SuppliesFlavoring";
import AddSupply from "./components/Supplies/addSupply";
import AddSuppliesFlavoring from "./components/Supplies/addSuppliesFlavoring";


function App() {
  const {isAuth} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    let life = localStorage.getItem('life')
    let user = localStorage.getItem('user')
    console.log(new Date(Date.parse(life)) > new Date(new Date() - 600 * 1000))
    if (life && (new Date(Date.parse(life)) > new Date(new Date() - 600 * 1000))) {
      dispatch(fetchProtect(JSON.parse(user)))
    }
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {!isAuth ? <Route path='*' element={<Auth/>}/> :
            <Route path='/' element={<Layout/>}>
              <Route path='/' element={<Consumable/>}/>
              <Route path='/consumable' element={<Stock/>}/>
              <Route path='/chemistry' element={<Stock/>}/>
              <Route path='/stickers' element={<Stock/>}/>
              <Route path='/perfumes' element={<Stock/>}/>
              <Route path='/solute' element={<Solute/>}/>
              <Route path='/completeProducts' element={<Complete/>}/>
              <Route path='/supplies' element={<Supplies/>}/>
              <Route path='supplies/supply' element={<SuppliesFlavoring/>}/>
              <Route path='supplies/addSupply' element={<AddSupply/>}/>
              <Route path='/supplies/supply/addSupplyFlavoring' element={<AddSuppliesFlavoring/>}/>
              <Route path='/archive' element={<Archive/>}/>
              <Route path='/addConsume' element={<AddConsume/>}/>
              <Route path='/addSolute' element={<AddSolute/>}/>
              <Route path='/addCompleteFlavoring' element={<AddCompleteFlavoring/>}/>
              <Route path='/sendOrder' element={<SendOrder/>}/>
              <Route path='/history' element={<History/>}/>
            </Route>}
        </Routes>
      </div>
    </BrowserRouter>


  );
}

export default App;
