import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import title from './../../assets/icons/logo-atman.svg';
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { reset } from './../../hooks/http.hook';
import Spinner from "../../components/Spinner/Spinner";
import { NavLink } from "react-router-dom";
import "./_recovery.scss";
const Recovery = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(true);
    const [sendEmailOnApi, setSendEmailOnApi] = useState(false);
    const [confirmCode, setConfirmCode] = useState(false);
    const [confirmError, setConfirmError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    let clazz;
    valid ? clazz = "input" : clazz = "input input--error";
    let spinner;
    loading ? spinner = _jsx(Spinner, { active: true }) : spinner = _jsx(Spinner, { active: false });
    const button = useRef(0);
    useEffect(() => {
        if (button?.current !== null) {
            button.current.setAttribute('disabled', true);
        }
    }, []);
    const onLogEmailChange = (e) => {
        setEmail(e.target.value);
    };
    // const onLogCodeChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    //     setCode(e.target.value);
    // }
    const onCheckDisable = (e) => {
        let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\.[a-z]{2,6}$/i;
        let res = emailRegExp.test(e.target.value);
        console.log(res);
        if (res) {
            button.current.removeAttribute("disabled");
            setValid(true);
        }
        else {
            button.current.setAttribute("disabled", true);
            setValid(false);
        }
    };
    // const onCheckDisableConfirm = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    //     if (e.target.value.length === 5) {
    //         button.current.removeAttribute( "disabled" );
    //         setValid(true);
    //     } else {
    //         button.current.setAttribute( "disabled", true );
    //         setValid(false)
    //     }
    // }
    const sendEmailAddress = (email) => {
        setLoading(true);
        reset(email).then(() => {
            setLoading(false);
            setTextAlert('Письмо отправлено');
            setShowAlert(true);
        }).catch((e) => {
            console.log(e);
            setTextAlert('Письмо не отправлено');
            setShowAlert(true);
            setLoading(false);
        });
    };
    // const sendCode = () => {
    //     // setLoading(true);
    // }
    // let setContent;
    // setContent = sendEmailOnApi ? ( confirmCode ? <NewPassword setConfirmCode={setConfirmCode}/> : <Confirmation clazz={clazz} code={code} onLogCodeChange={onLogCodeChange} setSendEmailOnApi={setSendEmailOnApi} onCheckDisableConfirm={onCheckDisableConfirm} button={button} sendCode={sendCode} confirmError={confirmError} email={email} sendEmailAddress={sendEmailAddress}  />) : <InputEmail clazz={clazz} email={email} onLogEmailChange={onLogEmailChange} onCheckDisable={onCheckDisable} button={button} sendEmailAddress={sendEmailAddress}/>
    return (_jsxs("div", { className: "recovery__container", children: [_jsxs("div", { className: "recovery__wrapper", children: [_jsx("div", { className: "title", children: _jsx("img", { src: title, alt: "tummies" }) }), _jsx("p", { className: "subtitle", children: "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0440\u043E\u043B\u044F" })] }), _jsxs("form", { className: "login__form", children: [spinner, _jsx(InputEmail, { clazz: clazz, email: email, onLogEmailChange: onLogEmailChange, onCheckDisable: onCheckDisable, button: button, sendEmailAddress: sendEmailAddress })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => setShowAlert(false) })] }));
};
export default Recovery;
const InputEmail = ({ clazz, email, onLogEmailChange, onCheckDisable, button, sendEmailAddress }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("label", { className: "label", children: ["Email", _jsx("input", { type: "email", name: "login", className: clazz, value: email, onChange: (e) => {
                            onLogEmailChange(e);
                            onCheckDisable(e);
                        } })] }), _jsx("p", { className: "description", children: "\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 email c\u043E \u0441\u0441\u044B\u043B\u043A\u043E\u0439 \u043D\u0430 \u0441\u0431\u0440\u043E\u0441 \u043F\u0430\u0440\u043E\u043B\u044F" }), _jsx("button", { ref: button, className: "button", type: "button", onClick: () => sendEmailAddress(email), children: "\u0421\u0431\u0440\u043E\u0441 \u043F\u0430\u0440\u043E\u043B\u044F" }), _jsx(NavLink, { to: "/", className: "navlink", children: _jsx("button", { className: "button", children: "\u041D\u0430\u0437\u0430\u0434" }) })] }));
};
