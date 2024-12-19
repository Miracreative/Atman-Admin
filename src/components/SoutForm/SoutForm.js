import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg';
import axios from 'axios';
import './_soutForm.scss';
const SoutForm = ({ sout, setSout, buttonTitle, form }) => {
    const [loading, setLoading] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});
    const validateValues = (inputName, inputValue) => {
        let error = {
            name: '',
            file: ''
        };
        switch (inputName) {
            case 'name':
                if (inputValue.length < 2) {
                    error.name = "Название слишком короткое";
                }
                else {
                    error.name = '';
                }
                break;
            case 'file':
                if (!inputValue) {
                    error.file = "Прикрепите файл";
                }
                else {
                    error.file = "";
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    const fileInput = useRef(null);
    let soutFile;
    soutFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : 'Файл не выбран';
    const checkForm = () => {
        if (sout.name && fileInput?.current?.value.length > 0) {
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
        setSout((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const clearForm = () => {
        form.current.reset();
        setSout((state) => {
            let newState = { ...state };
            for (let key in newState) {
                newState[key] = '';
            }
            return newState;
        });
    };
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target.form);
        console.log(e.target.form);
        axios.post('https://api.atman-auto.ru/api/sout', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новый СОУТ был успешно создан');
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
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [spinner, _jsxs("form", { acceptCharset: 'utf-8', className: "create-sout", id: "create-sout", ref: form, children: [_jsxs("div", { className: "create-sout__box", children: [_jsxs("label", { className: "create-sout__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0421\u041E\u0423\u0422" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "name", value: sout.name, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.name })] }), _jsxs("label", { className: "create-sout__label create-sout__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", onChange: handleChange, ref: fileInput }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: soutFile }), _jsx("div", { className: 'error', children: errors.file })] })] }), _jsxs("div", { className: "create-sout__btns", children: [_jsx("button", { type: "button", className: "create-sout__btn button button--orange", onClick: clearForm, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443" }), _jsx("button", { type: "button", className: "create-sout__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                    clearForm();
                                }, children: buttonTitle })] })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default SoutForm;
