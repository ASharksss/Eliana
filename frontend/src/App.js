import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

//components
import Layout from "./components/Layout";
import Consumable from "./components/Consumable";
import Solute from "./components/Solute";
import Complete from "./components/Complete";
import Archive from "./components/Archive";
import AddConsume from "./components/AddConsume";
import AddSolute from "./components/AddSolute";
import AddComplete from "./components/AddComplete";
import SendOrder from "./components/SendOrder";
import Stock from "./components/Stock";
import Auth from "./components/auth";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Consumable/>}/>
            <Route path='/consumable' element={<Stock/>}/>
            <Route path='/chemistry' element={<Stock/>}/>
            <Route path='/stickers' element={<Stock/>}/>
            <Route path='/perfumes' element={<Stock/>}/>
            <Route path='/solute' element={<Solute/>}/>
            <Route path='/completeProducts' element={<Complete/>}/>
            <Route path='/archive' element={<Archive/>}/>
            <Route path='/addConsume' element={<AddConsume/>}/>
            <Route path='/addSolute' element={<AddSolute/>}/>
            <Route path='/addComplete' element={<AddComplete/>}/>
            <Route path='/sendOrder' element={<SendOrder/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>


  );
}

export default App;
