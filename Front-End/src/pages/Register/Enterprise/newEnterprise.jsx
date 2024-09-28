import "./newEnterprise.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {ImCross} from "react-icons/im";
import { CiImageOn } from "react-icons/ci";

function NewEnterprise() {
    const [hiddenForm, setHiddenForm] = useState(false);
    const [enterprises, setEnterprises] = useState([]);
    const [filteredEnterprises, setFilteredEnterprises] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [name, setName] = useState('')
    const [CNPJ, setCNPJ] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState({value: '', dirty: false});
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [errorMensage, setErrorMensage] = useState('')

    const handleFilterEnterprise = (e) => {
        const query = e.toLowerCase();
        setFilteredEnterprises(enterprises.filter(enterprise => enterprise.name.toLowerCase().includes(query)));
    };

    const handleSetProfileImg = (e) => {
        const file = e.target.files[0]; // Pega o primeiro arquivo

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Lê o arquivo como URL de dados
            reader.onload = function (e) {
                const imageUrl = e.target.result; // URL da imagem
                const imageType = imageUrl.split(":")[1].split(";")[0]

                if (imageType === "image/jpeg" || imageType === "image/png") {
                    setErrorMensage("")
                    setProfileImg(imageUrl);
                }
                else {
                    setErrorMensage("Adicione um arquivo do tipo JPEG ou PNG")
                }
            };
        }
        else {
            setErrorMensage("")
        }
    }

    const getAllEnterprises = async () => {
        try {
            const response = await axios.get('http://localhost:3333/enterprise/all', {withCredentials: true});
            setEnterprises(response.data);
            setFilteredEnterprises(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    const createEnterprise = async (e) => {
        e.preventDefault()
        if ([
            name === '',
            CNPJ === '',
            profileImg === '',
            phone === '',
            email.value === '',
            street === '',
            number === '',
            city === '',
            state === '',
            zip === '',
        ].includes(true)){
            setErrorMensage('Preencha todos os Campos Corretamente')
        } else {
            setErrorMensage('')
            try {
                const response = await axios.post('http://localhost:3333/enterprise/create', {
                    name: name,
                    CNPJ: CNPJ,
                    profileImg: profileImg,
                    address: {
                        street: street,
                        number: number,
                        city: city,
                        state: state,
                        zipCode: zip,
                    },
                    contact: {
                        phone: phone,
                    },
                    enterpriseEmail: email.value,
                }, {
                    withCredentials: true
                })
                setErrorMensage("Empresa criada com sucesso")
                setRefresh((prev) => prev + 1)
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        getAllEnterprises();
    }, [refresh]);
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
                                <button className="submit-btn">PEDIR ACESSO</button>
                            </div>
                        )) : <div>Empresa Não Encontrada</div>}
                    </div>
                </> : " "}
            <div className="form-container">
                <h1>CADASTRAR EMPRESA <ImCross id={hiddenForm ? "close" : "open"} onClick={() => setHiddenForm(!hiddenForm)}/>{errorMensage}</h1>
                {hiddenForm ? <>

                    <form id="forms" action="">
                        <label htmlFor="profile-img-input" id="img-input-label">{profileImg ? <img src={profileImg}/> : <CiImageOn/>}<h3>foto de perfil</h3>
                        </label>
                        <input id="profile-img-input" onChange={(e) => handleSetProfileImg(e)} type='file' style={{"display": "none"}}/>
                        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)}
                               type="text"
                               name="name" placeholder="Nome"/>
                        <input className="form-input" value={CNPJ} onChange={(e) => setCNPJ(e.target.value)}
                               type="Number"
                               name="CNPJ" placeholder="CNPJ"/>
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
                        <button className="submit-btn" onClick={(e) => createEnterprise(e)}>CADASTRAR</button>
                    </> : ""}
            </div>
        </div>
    )
}

export default NewEnterprise