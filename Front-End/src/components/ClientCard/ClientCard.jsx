// import { FaRegUserCircle } from "react-icons/fa";
import {useEffect, useState} from 'react';
import './ClientCard.css'

function ClientCard(client) {
    const [hour, setHour] = useState();

    useEffect(() => {
        setHour(new Date().toLocaleString('pt-BR'));
    },[])

    return(
        <div id="client-container">
            <header>
                {/*<FaRegUserCircle/>*/}
                <span>client name</span>
                <span>{hour}</span>
            </header>
            <section>
                <p>5 und.</p>
                <p>R$50,00</p>
                <p>A vista</p>
            </section>
            <button>DETAILS</button>
        </div>
    )
}

export default ClientCard;