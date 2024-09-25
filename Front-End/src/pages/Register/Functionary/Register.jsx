import "./Register.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [errorMensage, setErrorMensage] = useState('')
    const [name, setName] = useState('')
    const [CPF, setCPF] = useState('')
    const [bornDate, setBornDate] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState({value: '', dirty: false});
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [street, setStreet] = useState("")
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

    const loginValidate = () => {
        if (!email.value && email.dirty) {
            return (
                "Campo Obrigatório"
            )
        } else if (!!email.value && !regex.test(email.value)) {
            return (
                "Email Invalido!"
            )
        }
        return ""
    }


    const handleEmailChange = (e) => {
        setEmail({value: e.target.value, dirty: true})
        loginValidate()
    }

    const registerNewFunctionary = async(e) => {
        e.preventDefault()
        if ([
            name === '',
            CPF === '',
            bornDate === '',
            phone === '',
            email.value === '',
            password === '',
            confirmPassword === '',
            street === '',
            number === '',
            city === '',
            state === '',
            zip === '',
        ].includes(true)){
            setErrorMensage('Preencha todos os Campos Corretamente')
        } else if(password === confirmPassword) {
            setErrorMensage('')
            try {
                const response = await axios.post('http://localhost:3333/functionarys/register', {
                    name: name,
                    CPF: CPF,
                    bornDate: bornDate,
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
                    login: email.value,
                    password: password
                })
                setErrorMensage("conta criada com sucesso")
                navigate("/Login", {replace: true})
            }
            catch(e) {
                setErrorMensage(e.response.data.error)
            }
        }
        else {
            setErrorMensage('Senhas Diferem')
        }
    }

    return (
        <>
            <div className="login-container">
                <div id="loginForm">
                    <h1>CRIAR CONTA</h1>
                    <form id="forms" action="">
                        <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} type="text" 
                               name="name" placeholder="Nome"/>
                        <input className="form-input" value={CPF} onChange={(e) => setCPF(e.target.value)} type="Number" 
                               name="CPF" placeholder="CPF"/>
                        <input className="form-input" value={bornDate} onChange={(e) => setBornDate(e.target.value)} type="Date" 
                               name="bornDate" placeholder="Ano de Nascimento"/>
                        <input className="form-input" value={phone} onChange={(e) => setPhone(e.target.value)}  type="tel" 
                               name="Phone" placeholder="Contato"/>
                        <input className="form-input" value={email.value} onChange={(e) => handleEmailChange(e)} type="text" 
                               name="email" placeholder="Email"/>
                        <input className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} type="text" 
                               name="password" placeholder="Senha"/>
                        <input className="form-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  type="text" 
                               name="confirmPassword" placeholder="Confirme a Senha"/>
                    </form>
                    <div id="adress">
                        <input className="form-input" value={street} onChange={(e) => setStreet(e.target.value)}  type="text" 
                               name="street" placeholder="Rua"/>
                        <input className="form-input" value={number} onChange={(e) => setNumber(e.target.value)}  type="text" 
                               name="number" placeholder="Numero"/>
                        <input className="form-input" value={city} onChange={(e) => setCity(e.target.value)}  type="text" 
                               name="city" placeholder="Cidade"/>
                        <input className="form-input" value={state} onChange={(e) => setState(e.target.value)} type="text" 
                               name="state" placeholder="Estado"/>
                        <input className="form-input" value={zip} onChange={(e) => setZip(e.target.value)}  type="text" 
                               name="zipCode" placeholder="Código Postal | CEP"/>
                    </div>
                    <section id="controllers">
                        <div id="texts-register">
                            <h4 id="error-mensages">{errorMensage}</h4>
                            <div>
                                <h4>Já Possui uma Conta?</h4>
                                <Link to={"Login"} id="recoverPassword"><h5>FAZER LOGIN</h5></Link>
                            </div>
                        </div>
                        <div id="buttons">
                            <button id='loginBtn' onClick={registerNewFunctionary}>
                                <h1>CRIAR CONTA</h1>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Register;