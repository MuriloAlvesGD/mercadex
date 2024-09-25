import "./Login.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoMdClose} from "react-icons/io";
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [email, setEmail] = useState({value: '', dirty: false});
    const [password, setPassword] = useState("")

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

    const signin = async (email, password) => {
        // Codifica as credenciais em Base64
        const credentials = btoa(`${email}:${password}`)

        try {
            const response = await axios.post('http://localhost:3333/auth/signin/', null, {
                headers: {
                    Authorization: `Basic ${credentials}`
                },
                withCredentials: true // Necessário para armazenar o cookie
            });
            console.log('Login realizado com sucesso:', response.data);
            if(response.data.login){
                navigate("/Admin", {replace: true});
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error.response ? error.response.data : error.message);
        }
    }

    const handleSignIn = async () => {
        signin(email.value, password);
    }


    const handleEmailChange = (e) => {
        setEmail({value: e.target.value, dirty: true})
    }
    return (
        <>
            <div className="login-container">
                <div id="loginForm">
                    <IoMdClose id="closeBtn" onClick={() => navigate("/home")}/>
                    <h1>SEJA BEM-VINDO</h1>
                    <form id="forms" action="">
                        <input className="email" value={email.value} onChange={(e) => handleEmailChange(e)} type="text"
                               name="email" placeholder="Email"/>
                        <h6>{loginValidate()}</h6>
                        <input className="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                               name="password" placeholder="Senha"/>
                    </form>
                    <section id="controllers">
                        <div id="texts">
                            <h4>Esqueceu a Senha?</h4>
                            <Link id="recoverPassword"><h5>CLIQUE AQUI</h5></Link>
                        </div>
                        <div id="buttons">
                            <button onClick={handleSignIn} id='loginBtn'>
                                <h1>ENTRAR</h1>
                            </button>
                            <Link to={'/Register'} id='registerLink'><h5>CRIAR CONTA</h5></Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Login;