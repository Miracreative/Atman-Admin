import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import generatePass from '../../services/GeneratePass';
import './_adminForm.scss';
import unsecret from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';
const AdminForm = ({ admin, setAdmin, buttonTitle, sendData, form }) => {
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
            case 'name':
                if (inputValue.length < 2) {
                    error.name = "Имя слишком короткое";
                }
                else {
                    error.name = '';
                }
                break;
            case 'email':
                let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\.[a-z]{2,6}$/i;
                if (!emailRegExp.test(inputValue)) {
                    error.email = "Email некорректный";
                }
                else {
                    error.email = "";
                }
                break;
            case 'password':
                if (inputValue.length < 6) {
                    error.password = "Пароль очень короткий";
                }
                else {
                    error.password = "";
                }
                break;
            case 'repeatPass':
                if (inputValue !== admin.password) {
                    error.repeatPassword = "Пароли не совпадают";
                }
                else {
                    error.repeatPassword = "";
                }
                break;
            default:
                console.error('Чекнули тип админа');
        }
        return error;
    };
    const checkForm = () => {
        if (admin.name && admin.email && admin.password && admin.repeatPass && admin.role) {
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
        setAdmin((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const clearForm = () => {
        setAdmin((state) => {
            let newState = { ...state };
            for (let key in newState) {
                newState[key] = '';
            }
            return newState;
        });
    };
    return (_jsxs("form", { className: "create-admin", ref: form, children: [_jsxs("div", { className: "create-admin__box", children: [_jsxs("label", { className: "create-admin__label", children: [_jsx("span", { children: "\u0418\u043C\u044F" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "name", value: admin.name, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.name })] }), _jsxs("label", { className: "create-admin__label", children: [_jsx("span", { children: "E-mail" }), _jsx("input", { className: `input ${errors.email ? 'input--error' : ''}`, type: "text", name: "email", value: admin.email, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.email })] }), _jsxs("label", { className: "create-admin__label", children: [_jsx("span", { children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), _jsx("input", { className: `input ${errors.password ? 'input--error' : ''}`, name: "password", type: showPass.password ? 'text' : 'password', value: admin.password, autoComplete: 'off', onChange: handleChange }), _jsx("div", { className: 'error', children: errors.password }), _jsx("img", { onClick: () => setShowPass(state => ({ ...state, password: !state.password })), src: showPass.password ? unsecret : secret, alt: "show pass" }), _jsx("button", { className: "create-admin__gen", type: "button", onClick: () => {
                                    setAdmin((state) => ({ ...state, password: generatePass() }));
                                    setErrors((state) => ({ ...state, password: '' }));
                                }, children: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438" })] }), _jsxs("label", { className: "create-admin__label", children: [_jsx("span", { children: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" }), _jsx("input", { className: `input ${errors.repeatPassword ? 'input--error' : ''}`, name: "repeatPass", type: showPass.repeatPass ? 'text' : 'password', value: admin.repeatPass, autoComplete: 'off', onChange: handleChange }), _jsx("div", { className: 'error', children: errors.repeatPassword }), _jsx("img", { onClick: () => setShowPass(state => ({ ...state, repeatPass: !state.repeatPass })), src: showPass.repeatPass ? unsecret : secret, alt: "show pass" })] })] }), _jsx("div", { className: "create-admin__box", children: _jsxs("label", { className: "create-admin__label", children: [_jsx("span", { children: "\u0420\u043E\u043B\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430" }), _jsxs("div", { className: "create-admin__checkboxes", children: [_jsxs("label", { className: "create-admin__checkbox", children: [_jsx("input", { className: "sr-only", type: "radio", name: "role", value: "admin", checked: admin.role === 'admin' ? true : false, onChange: handleChange }), _jsx("span", { children: "\u0421\u0443\u043F\u0435\u0440-\u0430\u0434\u043C\u0438\u043D" })] }), _jsxs("label", { className: "create-admin__checkbox", children: [_jsx("input", { className: "sr-only", type: "radio", name: "role", value: "user", checked: admin.role === 'user' ? true : false, onChange: handleChange }), _jsx("span", { children: "\u0410\u0434\u043C\u0438\u043D" })] })] })] }) }), _jsxs("div", { className: "create-admin__btns", children: [_jsx("button", { type: "button", className: "create-admin__btn button button--orange", onClick: clearForm, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443" }), _jsx("button", { type: "button", className: "create-admin__btn button", disabled: checkForm(), onClick: () => {
                            sendData();
                            clearForm();
                        }, children: buttonTitle })] })] }));
};
export default AdminForm;
