import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ClientController from './clientController/ClientController.jsx'
import Login from './pages/Login/Login.jsx'
import Controller from "./adminController/Controller.jsx";
import Register from "./pages/Register/Functionary/Register.jsx";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Home" element={<ClientController/>}></Route>
                <Route path="/Login" element={<Login/>}></Route>
                <Route path="/Register" element={<Register/>}></Route>
                <Route path="*" element={<Navigate to="/Login"/>}></Route>
                <Route path="/Admin" element={<Controller/>}></Route>
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;