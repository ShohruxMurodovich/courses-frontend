import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/login";
import Register from "./Pages/Register/register";
import Home from "./Pages/Home/home"
import Create from "./Pages/Create/create";
import Web from "./Pages/Web/web";
import Mobile from "./Pages/Mobile/mobile";
import Design from "./Pages/Design/design";
import List from "./Pages/List/list";
import Admin from "./Pages/admin/admin";

import "./main.css"
function App() {
  return (
    <>
    	<Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home/:id' element={<Home />} />
        <Route path='/create/:id' element={<Create />} />
        <Route path='/web/:id' element={<Web />} />
        <Route path='/mobile/:id' element={<Mobile />} />
        <Route path='/design/:id' element={<Design />} />
        <Route path='/list/:id' element={<List />} />
        <Route path='/admin' element={<Admin />} />
			</Routes>
    </>
  );
}

export default App;
