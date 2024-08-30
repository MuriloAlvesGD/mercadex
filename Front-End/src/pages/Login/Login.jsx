import "./Login.css"
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IoMdClose} from "react-icons/io";

function Login() {
    const navigate = useNavigate();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [email, setEmail] = useState({value: '', dirty: false});

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
    }
    return (
        <>
            <div className="login-container">
                <div id="loginForm">
                    <IoMdClose id="closeBtn" onClick={() => navigate("/home")}/>
                    <h1>SEJA BEM-VINDO</h1>
                    <form id="forms" action="">
                        <input className="email" onChange={(e) => handleEmailChange(e)} type="text" required
                               name="email" placeholder="Email"/>
                        <h6>{loginValidate()}</h6>
                        <input className="password" type="text" required
                               name="password" placeholder="Senha"/>
                    </form>
                    <section id="controllers">
                        <div id="texts">
                            <h4>Esqueceu a Senha?</h4>
                            <Link id="recoverPassword"><h5>CLIQUE AQUI</h5></Link>
                        </div>
                        <div id="buttons">
                            <button form="forms" onClick={() => navigate("/Admin")} type="submit" id='loginBtn'>
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