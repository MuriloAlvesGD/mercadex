import {useEffect, useState} from "react"
import {RiHome6Fill, RiDiscountPercentFill} from "react-icons/ri";
import {AiFillProduct} from "react-icons/ai";
import {IoIosRadioButtonOn} from "react-icons/io";
import { PiTrashFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import "./Controller.css"
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import {useNavigate} from "react-router-dom";
import ProductTable from "../pages/ProductTable/ProductTable.jsx";
import axios from "axios";
import NewEnterprise from "../pages/Register/Enterprise/newEnterprise.jsx";
import PromotionTable from "../pages/Promotion/PromotionTable.jsx";

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
                    <RiDiscountPercentFill className="btn" onClick={() => setView(3)}/>
                    {/*<PiTrashFill className="btn" onClick={() => setView(2)}/>*/}
                </>
            )
        }
        return (<></>)
    }

    const auth = async() => {
        try {
            const response = await axios.get('http://localhost:3333/auth/', {
                withCredentials: true,
            })
            const access = response.data.assignment.accessLevel
            if (access === null) {
                navigate("/Login", {replace: true});
            }
            else {
                setAccessLevel(access)
            }
        }
        catch (e){
            !e.response.data.assignment ? navigate("/Login", {replace: true}) : console.error(e);
        }
    }

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:3333/auth/logout', {withCredentials: true})

            if (response.status === 200) {
                navigate("./login", {replace: true})
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        auth()

    }, [])
    return(
        <div id="controller">
            <div id="top-bar">
                <input type="checkbox" id="menuBtn"></input>
                <label id='labelMenu' htmlFor="menuBtn"><ImCross/></label>
                <nav id="navBtn">
                    {accessButtons(accessLevel)}
                    <IoLogOut className="btn" onClick={() => logout()}/>
                </nav>
            </div>
            <div id="content">
                {view === 1 && accessLevel > 0 ? <Dashboard/> : ""}
                {view === 2 && accessLevel > 0 ? <ProductTable/> : ""}
                {view === 3 && accessLevel > 0 ? <PromotionTable/> : ""}
                {accessLevel === 0 ? <NewEnterprise/> : ""}
            </div>
        </div>
    )
}

export default Controller;