import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import generatePass from '../../services/GeneratePass';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import { getOneAdmin, deleteAdmin, editAdmin } from '../../hooks/http.hook';
import './_editAdmin.scss';
const EditAdmin = () => {
    const form = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [del, setDel] = useState(false);
    const [errors, setErrors] = useState({});
    const [targetConfirm, setTargetConfirm] = useState({
        id: 0,
        name: '',
        email: '',
        role: '',
        password: ''
    });
    const [admin, setAdmin] = useState({
        id: 0,
        name: '',
        role: '',
        email: '',
        password: ''
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
            default:
                console.error('Чекнули тип админа');
        }
        return error;
    };
    //отправляем запрос получния данных об админе
    useEffect(() => {
        getOneAdmin(id).then(res => {
            setAdmin(res);
            setAdmin(state => ({ ...state, password: 'введите новый пароль' }));
        });
    }, []);
    const checkForm = () => {
        if (admin.name && admin.email && admin.password && admin.role) {
            for (let key in errors) {
                if (errors[key] !== '') {
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    //обработчик текстовых инпутов
    const handleChange = (e) => {
        setAdmin(state => ({ ...state, [e.target.name]: e.target.value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const onEditAdmin = (admin) => {
        setLoading(true);
        editAdmin(admin)
            .then((res) => {
            setDel(false);
            setLoading(false);
            setShowAlert(true);
            if (res.message) {
                setTextAlert(res.message);
            }
            else {
                setTextAlert('Данные были обновлены');
            }
        }).catch(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Что-то пошло не так');
        }).finally(() => {
            setLoading(false);
            setShowAlert(true);
        });
    };
    const removeAdmin = (id) => {
        setShowConfirm(false);
        deleteAdmin(id);
        setDel(true);
        setShowAlert(true);
        setTextAlert('Админ успешно удален');
    };
    // показываем окно подтверждения
    const onConfirmDelete = (id, name, email, role, password) => {
        setShowConfirm(true);
        setTargetConfirm({ id, name, role, email, password });
    };
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0430", children: null, showBackBtn: true }), spinner, _jsxs("form", { className: 'parent-form', ref: form, children: [_jsxs("div", { className: 'parent-form__inner', children: [_jsx("div", { className: "parent-form__left" }), _jsxs("div", { className: "parent-form__right", children: [_jsxs("div", { className: "parent-form__col-box", children: [_jsxs("div", { className: "parent-form__col", children: [_jsxs("label", { children: [_jsx("span", { className: 'create-admin__label', children: "E-Mail" }), _jsx("input", { className: `input ${errors.email ? 'input--error' : ''}`, type: "text", name: "email", value: admin.email, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.email })] }), _jsxs("label", { children: [_jsx("span", { className: 'create-admin__label', children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), _jsx("input", { className: `input ${errors.password ? 'input--error' : ''}`, name: "password", type: 'password', value: admin.password, autoComplete: 'off', onChange: handleChange }), _jsx("div", { className: 'error', children: errors.password }), _jsx("button", { className: "create-admin__gen", type: "button", onClick: () => {
                                                                    setAdmin((state) => ({ ...state, password: generatePass() }));
                                                                    setErrors((state) => ({ ...state, password: '' }));
                                                                }, children: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0437\u0434\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438" })] })] }), _jsx("div", { className: "parent-form__col", children: _jsxs("label", { children: [_jsx("span", { className: 'create-admin__label', children: "\u0418\u043C\u044F" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "name", value: admin.name, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.name })] }) })] }), _jsx("div", { className: "parent-form__row", children: _jsx("div", { className: "parent-form__payments", children: _jsxs("label", { className: "create-admin__label", children: [_jsx("span", { children: "\u0420\u043E\u043B\u044C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430" }), _jsxs("div", { className: "create-admin__checkboxes", children: [_jsxs("label", { className: "create-admin__checkbox", children: [_jsx("input", { className: "sr-only", type: "radio", name: "role", value: "admin", checked: admin.role === 'admin' ? true : false, onChange: handleChange }), _jsx("span", { children: "\u0421\u0443\u043F\u0435\u0440-\u0430\u0434\u043C\u0438\u043D" })] }), _jsxs("label", { className: "create-admin__checkbox", children: [_jsx("input", { className: "sr-only", type: "radio", name: "role", value: "user", checked: admin.role === 'user' ? true : false, onChange: handleChange }), _jsx("span", { children: "\u0410\u0434\u043C\u0438\u043D" })] })] })] }) }) })] })] }), _jsxs("div", { className: "parent-form__btns", children: [_jsx("button", { className: 'button button--red', type: 'button', onClick: () => onConfirmDelete(admin.id, admin.name, admin.email, admin.role, admin.password), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" }), _jsx("button", { className: 'button', type: "button", disabled: checkForm(), onClick: () => onEditAdmin(admin), children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })] })] }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0430?', text1: targetConfirm.name, text2: targetConfirm.email, showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removeAdmin(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => del ?
                    navigate('/admins-list') :
                    console.log('edit') })] }));
};
export default EditAdmin;
