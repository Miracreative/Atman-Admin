import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg';
import axios from 'axios';
import './_knowlegeForm.scss';
const KnowlegeForm = ({ knowledge, setKnowlege, buttonTitle, form }) => {
    const [loading, setLoading] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});
    const validateValues = (inputName, inputValue) => {
        let error = {
            title: '',
            content: '',
            file: ''
        };
        switch (inputName) {
            case 'title':
                if (inputValue.length < 2) {
                    error.title = "Название слишком короткое";
                }
                else {
                    error.title = '';
                }
                break;
            case 'content':
                if (inputValue.length < 10) {
                    error.content = "Текста слишком мало";
                }
                else {
                    error.content = '';
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
    const checkForm = () => {
        if (knowledge.title && knowledge.content && knowledge.file) {
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
        setKnowlege((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const clearForm = () => {
        form.current.reset();
        setKnowlege((state) => {
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
        axios.post('https://api.atman-auto.ru/api/base', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новая база была успешно создана');
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
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [spinner, _jsxs("form", { acceptCharset: 'utf-8', className: "create-knowlege", id: "create-knowlege", ref: form, children: [_jsxs("div", { className: "create-knowlege__box", children: [_jsxs("label", { className: "create-knowlege__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439" }), _jsx("input", { className: `input ${errors.title ? 'input--error' : ''}`, type: "text", name: "title", value: knowledge.title, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.title })] }), _jsxs("label", { className: "create-knowlege__label", children: [_jsx("span", { children: "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0431\u0430\u0437\u044B" }), _jsx("textarea", { className: `input input--textarea ${errors.content ? 'input--error' : ''}`, name: "content", value: knowledge.content, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.content })] }), _jsxs("label", { className: "create-knowlege__label create-knowlege__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", onChange: handleChange }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: knowledge.file ? knowledge.file.replace(regular, '') : 'Файл не выбран' }), _jsx("div", { className: 'error', children: errors.file })] })] }), _jsxs("div", { className: "create-knowlege__btns", children: [_jsx("button", { type: "button", className: "create-knowlege__btn button button--orange", onClick: clearForm, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443" }), _jsx("button", { type: "button", className: "create-knowlege__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                    clearForm();
                                }, children: buttonTitle })] })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default KnowlegeForm;
