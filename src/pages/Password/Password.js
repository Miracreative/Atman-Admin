import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import generatePass from '../../services/GeneratePass';
import title from './../../assets/icons/logo-atman.svg';
import unsecret from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { pass, editAdmin } from './../../hooks/http.hook';
import Spinner from "../../components/Spinner/Spinner";
import "./_password.scss";
const Password = () => {
    const { token } = useParams();
    const [admin, setAdmin] = useState({
        role: '',
        password: '',
        name: '',
        email: '',
        id: 0
    });
    const [password, setPassword] = useState({
        password: '',
        repeatPass: ''
    });
    useLayoutEffect(() => {
        document.title = "Смена пароля - ATMAN Admin";
        pass(token).then((res) => {
            setAdmin({ ...res, password: password.password });
            if (res.code !== 1) {
                setTextAlert(res.message);
                setShowAlert(true);
            }
        }).catch(() => {
            setTextAlert('Что-то пошло не так');
            setShowAlert(true);
        });
    }, []);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    let spinner;
    loading ? spinner = _jsx(Spinner, { active: true }) : spinner = _jsx(Spinner, { active: false });
    const button = useRef(0);
    const [errors, setErrors] = useState({});
    const [showPass, setShowPass] = useState({
        password: false,
        repeatPass: false
    });
    const validateValues = (inputName, inputValue) => {
        let error = {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        };
        switch (inputName) {
            case 'password':
                if (inputValue.length < 6) {
                    error.password = "Пароль очень короткий";
                }
                else {
                    error.password = "";
                }
                break;
            case 'repeatPass':
                if (inputValue !== password.password) {
                    error.repeatPassword = "Пароли не совпадают";
                }
                else {
                    error.repeatPassword = "";
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    const checkForm = () => {
        if (password && password.repeatPass) {
            for (let key in errors) {
                if (errors[key] !== '') {
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((state) => ({ ...state, [name]: value }));
        setAdmin(state => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const sendNewPassword = (admin) => {
        // setLoading(true);
        // setAdmin(state => ({...state, password: password.password}))
        console.log(admin);
        editAdmin(admin).then(() => {
            setLoading(false);
            setTextAlert('Письмо отправлено, пароль изменен');
            setShowAlert(true);
        }).catch((e) => {
            console.log(e);
            setTextAlert('Письмо не отправлено');
            setShowAlert(true);
            setLoading(false);
        });
    };
    return (_jsxs("div", { className: "recovery__container", children: [_jsxs("div", { className: "recovery__wrapper", children: [_jsx("div", { className: "title", children: _jsx("img", { src: title, alt: "tummies" }) }), _jsx("p", { className: "subtitle", children: "\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u0430\u0440\u043E\u043B\u044F" })] }), _jsxs("form", { className: "login__form", children: [spinner, _jsxs("label", { className: "label label--pass", children: [_jsx("span", { children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), _jsx("input", { className: `input ${errors.password ? 'input--error' : ''}`, name: "password", type: showPass.password ? 'text' : 'password', value: password.password, autoComplete: 'off', onChange: handleChange }), _jsx("div", { className: 'error', children: errors.password }), _jsx("img", { onClick: () => setShowPass(state => ({ ...state, password: !state.password })), src: showPass.password ? unsecret : secret, alt: "show pass" }), _jsx("button", { className: "create-admin__gen", type: "button", onClick: () => {
                                    setPassword((state) => ({ ...state, password: generatePass() }));
                                    setErrors((state) => ({ ...state, password: '' }));
                                }, children: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438" })] }), _jsxs("label", { className: "label label--pass", children: [_jsx("span", { children: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" }), _jsx("input", { className: `input ${errors.repeatPassword ? 'input--error' : ''}`, name: "repeatPass", type: showPass.repeatPass ? 'text' : 'password', value: password.repeatPass, autoComplete: 'off', onChange: handleChange }), _jsx("div", { className: 'error', children: errors.repeatPassword }), _jsx("img", { onClick: () => setShowPass(state => ({ ...state, repeatPass: !state.repeatPass })), src: showPass.repeatPass ? unsecret : secret, alt: "show pass" })] }), _jsx("button", { ref: button, className: "button", type: "button", disabled: checkForm(), onClick: () => sendNewPassword(admin), children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => setShowAlert(false) })] }));
};
export default Password;
