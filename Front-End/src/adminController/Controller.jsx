import {useState} from "react"
import {RiHome6Fill} from "react-icons/ri";
import {AiFillProduct} from "react-icons/ai";
import {IoIosRadioButtonOn} from "react-icons/io";
import { PiTrashFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import "./Controller.css"
import Dashboard from "../pages/Dashboard/DashBoard.jsx";
import {useNavigate} from "react-router-dom";

function Controller() {
    const navigate = useNavigate();

    const [view, setView] = useState(1);
    return(
        <div id="controller">
            <div id="top-bar">
                <input type="checkbox" id="menuBtn"></input>
                <label htmlFor="menuBtn"><ImCross/></label>
                <nav id="navBtn">
                    <RiHome6Fill class="btn" onClick={() => setView(1)}/>
                    <AiFillProduct class="btn" onClick={() => setView(2)}/>
                    <IoIosRadioButtonOn class="btn" onClick={() => setView(2)}/>
                    <PiTrashFill class="btn" onClick={() => setView(2)}/>
                    <IoLogOut class="btn" onClick={() => navigate("./login")}/>
                </nav>
            </div>
            <div id="content">
            {view === 1 ? <Dashboard/> : ""}
            </div>
        </div>
    )
}

export default Controller;