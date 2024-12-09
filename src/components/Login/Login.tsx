import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import showPass from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';
import logoAtman from './../../assets/icons/logo-atman.svg';
import  './_login.scss';



const Login = ({login, loginError}: {
    login: (login: string, password: string) => void,
    loginError: boolean
}) =>  {

    const [logName, setLogName] = useState('');
    const [pass, setPass] = useState('');
    const [show, setShow] = useState(false);
    const [typeInput, setTypeInput] = useState("password");
    let clazz;
    loginError ? clazz = "input input--error" : clazz = "input";

    const button = useRef<any>(0);

    useEffect(() => {
        if (button?.current !== null) {
            button.current.setAttribute('disabled', true)
        }
    }, [])

    const onLogNameChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        setLogName(e.target.value);
    }

    const onPasswordChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        setPass(e.target.value);
    }
    
    const onToggleVisiblePassword = () => {
        setShow(show => !show);
        if( typeInput === 'password') {
            setTypeInput('text')
        } else {
            setTypeInput("password")
        }
    }

    const onCheckDisable = (e: React.ChangeEvent<HTMLInputElement>, stateAnotherInput: string) => {
        if (e.target.value && stateAnotherInput) {
            button.current.removeAttribute("disabled");
        } else {
            button.current.setAttribute( "disabled", true);
        }
    }
    
    return (      
        <div className="login__container">
            <div className="login__wrap">
                <div className="login__wrapper">
                    <div className="login__yammy">
                    <img src={logoAtman} alt="logotyp"/>
                    </div>
                </div>
                
                <div className="login__form">
                    <label className="label">
                        Login
                        <input 
                        type="text" 
                        name="login" 
                        className={clazz}
                        value={logName}
                        onChange={(e) => {onLogNameChange(e)}}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => onCheckDisable(e, pass)}/>
                    </label>
                    <label className="label">
                        Password
                        <input 
                            type={`${typeInput}`}
                            name="password" 
                            className={clazz}
                            value={pass}
                            onChange={(e) => {onPasswordChange(e)}}
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => onCheckDisable(e, logName)} />
                            <img onClick={() => onToggleVisiblePassword()} src={show ? showPass : secret}/>
                    </label>
                        <Link to="/recovery/" className="login__fogot">Fogot your password?</Link>
                    <button 
                        ref={button}
                        className="button" 
                        type="button"
                        onClick={() => login(logName, pass)}
                        >Enter</button>
                </div>
            </div>
        </div>
    )
}

export default Login;