import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ClientController from './clientController/ClientController.jsx'
import Login from './pages/Login/Login.jsx'
import Controller from "./adminController/Controller.jsx";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes> {/*Lado do cliente*/}
                <Route path="/Home" element={<ClientController/>}></Route>
                <Route path="/Login" element={<Login/>}></Route>
                <Route path="*" element={<Navigate to="/Login"/>}></Route>
                <Route path="/Admin" element={<Controller/>}></Route>
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes;