import {useState} from "react"
import {RiHome6Fill} from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { IoLogOut } from "react-icons/io5";
import "./ClientController.css"
import Home from "../pages/Home/Home.jsx";
import {useNavigate} from "react-router-dom";
import loupeIcon from "../assets/loupeIcon.png";

function ClientController() {
    const navigate = useNavigate();

    const [view, setView] = useState(1);
    return(
        <div id="controller">
            <div id="top-bar">
                <input type="checkbox" id="menuBtn"></input>
                <label id='labelMenu' htmlFor="menuBtn"><ImCross/></label>
                <nav id="navBtn">
                    <form id="searchForm" onSubmit={e => e.preventDefault()}>
                        <input className="navbar-search" type="text" placeholder="Search"/>
                        <button type='submit' id="searchButton"><img src={loupeIcon} alt=""/></button>
                    </form>
                    <RiHome6Fill class="btn" onClick={() => setView(1)}/>
                    <IoLogOut class="btn" onClick={() => navigate("./login")}/>
                </nav>
            </div>
            <div id="content">
                {view === 1 ? <Home/> : ""}
            </div>
        </div>
    )
}

export default ClientController;