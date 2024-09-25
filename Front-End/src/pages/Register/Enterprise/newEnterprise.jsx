import "./newEnterprise.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {ImCross} from "react-icons/im";

function NewEnterprise() {
    const [hiddenForm, setHiddenForm] = useState(false);
    const [enterprises, setEnterprises] = useState([]);
    const [filteredEnterprises, setFilteredEnterprises] = useState([]);
    const [name, setName] = useState('')
    const [CPF, setCPF] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState({value: '', dirty: false});
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    const handleFilterEnterprise = (e) => {
        const query = e.toLowerCase();
        setFilteredEnterprises(enterprises.filter(enterprise => enterprise.name.toLowerCase().includes(query)));
    };

    useEffect(() => {
        const getAllEnterprises = async () => {
            try {
                const response = await axios.get('http://localhost:3333/enterprise/all', {withCredentials: true});
                setEnterprises(response.data);
                setFilteredEnterprises(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        getAllEnterprises();
    }, []);
    return (
        <div className="view-container">
            {enterprises.length > 0 ?
                <>
                    <h1>Procurar Empresa</h1>
                    <input id="enterprise-search" onChange={(e) => handleFilterEnterprise(e.target.value)} type="text"
                           placeholder="Pesquisar Empresa"/>
                    <div className="form-container">
                        <h1>Empresas Cadastradas</h1>
                        {filteredEnterprises.length > 0 ? filteredEnterprises.map((enterprise) => (
                            <div key={enterprise.CNPJ}>
                                <h3>
                                    <img src={enterprise.profileImage}/>
                                    Empresa: {enterprise.name} | CNPJ: {enterprise.CNPJ}
                                </h3>
                                <button>PEDIR ACESSO</button>
                            </div>
                        )) : <div>Empresa Não Encontrada</div>}
                    </div>
                </> : " "}
            <div className="form-container">
                <h1 onClick={() => setHiddenForm(!hiddenForm)}>CADASTRAR EMPRESA <ImCross id="close"/></h1>
                {hiddenForm ? <>
                        <form id="forms" action="">
                            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)}
                                   type="text"
                                   name="name" placeholder="Nome"/>
                            <input className="form-input" value={CPF} onChange={(e) => setCPF(e.target.value)}
                                   type="Number"
                                   name="CPF" placeholder="CNPJ"/>
                            <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)}
                                   type="tel"
                                   name="Phone" placeholder="Contato"/>
                            <input className="form-input" value={email.value}
                                   onChange={(e) => setEmail({value: e.target.value, dirty: true})} type="text"
                                   name="email" placeholder="Email"/>
                        </form>
                        <div id="adress">
                            <input className="form-input" value={street} onChange={(e) => setStreet(e.target.value)}
                                   type="text"
                                   name="street" placeholder="Rua"/>
                            <input className="form-input" value={number} onChange={(e) => setNumber(e.target.value)}
                                   type="text"
                                   name="number" placeholder="Numero"/>
                            <input className="form-input" value={city} onChange={(e) => setCity(e.target.value)}
                                   type="text"
                                   name="city" placeholder="Cidade"/>
                            <input className="form-input" value={state} onChange={(e) => setState(e.target.value)}
                                   type="text"
                                   name="state" placeholder="Estado"/>
                            <input className="form-input" value={zip} onChange={(e) => setZip(e.target.value)}
                                   type="text"
                                   name="zipCode" placeholder="Código Postal | CEP"/>
                        </div>
                    </> : ""}
            </div>
        </div>
    )
}

export default NewEnterprise