import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

//components
import Layout from "./components/Layout";
import Resume from "./components/Resume";
import Solute from "./components/Solute";
import Complete from "./components/Complete";
import Archive from "./components/Archive";
import AddResume from "./components/AddResume";
import AddSolute from "./components/AddSolute";
import AddComplete from "./components/AddComplete";
import SendOrder from "./components/SendOrder";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Resume/>}/>
            <Route path='/solute' element={<Solute/>}/>
            <Route path='/completeProducts' element={<Complete/>}/>
            <Route path='/archive' element={<Archive/>}/>
            <Route path='/addResume' element={<AddResume/>}/>
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
