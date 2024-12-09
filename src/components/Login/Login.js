import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import showPass from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';
import logoAtman from './../../assets/icons/logo-atman.svg';
import './_login.scss';
const Login = ({ login, loginError }) => {
    const [logName, setLogName] = useState('');
    const [pass, setPass] = useState('');
    const [show, setShow] = useState(false);
    const [typeInput, setTypeInput] = useState("password");
    let clazz;
    loginError ? clazz = "input input--error" : clazz = "input";
    const button = useRef(0);
    useEffect(() => {
        if (button?.current !== null) {
            button.current.setAttribute('disabled', true);
        }
    }, []);
    const onLogNameChange = (e) => {
        setLogName(e.target.value);
    };
    const onPasswordChange = (e) => {
        setPass(e.target.value);
    };
    const onToggleVisiblePassword = () => {
        setShow(show => !show);
        if (typeInput === 'password') {
            setTypeInput('text');
        }
        else {
            setTypeInput("password");
        }
    };
    const onCheckDisable = (e, stateAnotherInput) => {
        if (e.target.value && stateAnotherInput) {
            button.current.removeAttribute("disabled");
        }
        else {
            button.current.setAttribute("disabled", true);
        }
    };
    return (_jsx("div", { className: "login__container", children: _jsxs("div", { className: "login__wrap", children: [_jsx("div", { className: "login__wrapper", children: _jsx("div", { className: "login__yammy", children: _jsx("img", { src: logoAtman, alt: "logotyp" }) }) }), _jsxs("div", { className: "login__form", children: [_jsxs("label", { className: "label", children: ["Login", _jsx("input", { type: "text", name: "login", className: clazz, value: logName, onChange: (e) => { onLogNameChange(e); }, onInput: (e) => onCheckDisable(e, pass) })] }), _jsxs("label", { className: "label", children: ["Password", _jsx("input", { type: `${typeInput}`, name: "password", className: clazz, value: pass, onChange: (e) => { onPasswordChange(e); }, onInput: (e) => onCheckDisable(e, logName) }), _jsx("img", { onClick: () => onToggleVisiblePassword(), src: show ? showPass : secret })] }), _jsx(Link, { to: "/recovery/", className: "login__fogot", children: "Fogot your password?" }), _jsx("button", { ref: button, className: "button", type: "button", onClick: () => login(logName, pass), children: "Enter" })] })] }) }));
};
export default Login;
