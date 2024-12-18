import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { getOnePerson, deletePerson } from '../../hooks/http.hook';
import './_editPerson.scss';
const EditPerson = () => {
    const form = useRef(null);
    const fileInput = useRef(null);
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
        name: ''
    });
    const [person, setPerson] = useState({
        id: 0,
        name: '',
        descr: '',
        watsapp: '',
        email: '',
        imagesrc: '',
        file: ''
    });
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let personFile;
    personFile = (fileInput?.current?.value.length > 0) ? fileInput.current.value.replace(regular, '') : (person.imagesrc ? person.imagesrc.replace(regular, '') : 'Файл не выбран');
    const validateValues = (inputName, inputValue) => {
        let error = {
            name: '',
            email: '',
            watsapp: '',
            descr: ''
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
            case 'watsapp':
                if (inputValue.length < 15) {
                    error.watsapp = "Телефон слишком короткий";
                }
                else {
                    error.watsapp = '';
                }
                break;
            case 'descr':
                if (inputValue.length < 10) {
                    error.name = "Описание слишком короткое";
                }
                else {
                    error.name = '';
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    //отправляем запрос получния данных об админе
    useEffect(() => {
        getOnePerson(id).then(res => {
            setPerson(res);
        });
    }, []);
    const checkForm = () => {
        if (person.name) {
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
        const { name, value } = e.target;
        setPerson((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${person.id}`);
        axios.put('https://api.atman-auto.ru/api/person', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Сотрудник был успешно обновлен');
        })
            .catch(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Что-то пошло не так');
        }).finally(() => {
            setLoading(false);
            setShowAlert(true);
        });
    };
    const removePerson = (id) => {
        setShowConfirm(false);
        deletePerson(id);
        setDel(true);
        setShowAlert(true);
        setTextAlert('Сотрудник успешно удален');
    };
    // показываем окно подтверждения
    const onConfirmDelete = (id, name) => {
        setShowConfirm(true);
        setTargetConfirm({ id, name });
    };
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430", children: null, showBackBtn: true }), spinner, _jsxs("form", { className: "create-person", id: "create-person", ref: form, acceptCharset: 'utf-8', children: [_jsx("div", { className: 'create-person__inner', children: _jsxs("div", { className: "create-person__right", children: [_jsxs("div", { className: "create-person__col-box", children: [_jsxs("div", { className: "create-person__col", children: [_jsxs("label", { className: "create-person__label", children: [_jsx("span", { children: "\u0418\u043C\u044F \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "name", value: person.name, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.name })] }), _jsxs("label", { className: "create-person__label create-person__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", ref: fileInput, onChange: handleChange }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: personFile })] })] }), _jsxs("div", { className: "create-person__col", children: [_jsxs("label", { className: "create-person__label", children: [_jsx("span", { children: "E-mail" }), _jsx("input", { className: `input ${errors.email ? 'input--error' : ''}`, type: "text", name: "email", value: person.email, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.email })] }), _jsxs("label", { className: "create-person__label", children: [_jsx("span", { children: "WhatsApp" }), _jsx(InputMask, { mask: "8-999-999-99-99", maskChar: " ", className: "input", value: person.watsapp, name: "watsapp", onChange: handleChange }), _jsx("div", { className: 'error', children: errors.watsapp })] })] })] }), _jsxs("label", { className: "create-person__label create-person--textarea", children: [_jsx("span", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), _jsx("textarea", { className: `input input--textarea  ${errors.descr ? 'input--error' : ''}`, name: "descr", value: person.descr, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.descr })] })] }) }), _jsxs("div", { className: "create-person__btns", children: [_jsx("button", { type: "button", className: "create-person__btn button button--orange", onClick: () => onConfirmDelete(person.id, person.name), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" }), _jsx("button", { type: "button", className: "create-person__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                }, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" })] })] }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430?', text1: targetConfirm.name, text2: '', showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removePerson(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => del ?
                    navigate('/persons') :
                    console.log('edit') })] }));
};
export default EditPerson;
