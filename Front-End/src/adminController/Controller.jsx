import {useEffect, useState} from "react"
import {RiHome6Fill} from "react-icons/ri";
import {AiFillProduct} from "react-icons/ai";
import {IoIosRadioButtonOn} from "react-icons/io";
import { PiTrashFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import "./Controller.css"
import Dashboard from "../pages/Dashboard/Admin.jsx";
import {useNavigate} from "react-router-dom";
import ProductTable from "../pages/ProductTable/ProductTable.jsx";
import axios from "axios";
import NewEnterprise from "../pages/Register/Enterprise/newEnterprise.jsx";

function Controller() {
    const navigate = useNavigate();
    const [view, setView] = useState(1);
    const [accessLevel, setAccessLevel] = useState(0)
    const accessButtons = (accessLevel) => {
        if (accessLevel > 0) {
            return (
                <>
                    <RiHome6Fill className="btn" onClick={() => setView(1)}/>
                    <AiFillProduct className="btn" onClick={() => setView(2)}/>
                    <IoIosRadioButtonOn className="btn" onClick={() => setView(2)}/>
                    <PiTrashFill className="btn" onClick={() => setView(2)}/>
                </>
            )
        }
        return (<></>)
    }

    useEffect(() => {
        const auth = async() => {
            try {
                const response = await axios.get('http://localhost:3333/auth/', {
                    withCredentials: true,
                })
                const access = JSON.parse(response.data.user).access.accessLevel
                if (access === null) {
                    navigate("/Login", {replace: true});
                }
                else {
                    setAccessLevel(access)
                }
            }
            catch (e){
                !e.response.data.access ? navigate("/Login", {replace: true}) : console.error(e);
            }
        }
        auth()

    }, [])
    return(
        <div id="controller">
            <div id="top-bar">
                <input type="checkbox" id="menuBtn"></input>
                <label id='labelMenu' htmlFor="menuBtn"><ImCross/></label>
                <nav id="navBtn">
                    {accessButtons(accessLevel)}
                    <IoLogOut className="btn" onClick={() => navigate("./login")}/>
                </nav>
            </div>
            <div id="content">
                {view === 1 && accessLevel > 0 ? <Dashboard/> : ""}
                {view === 2 && accessLevel > 0 ? <ProductTable/> : ""}
                {accessLevel === 0 ? <NewEnterprise/> : ""}
            </div>
        </div>
    )
}

export default Controller;