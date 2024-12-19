import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg';
import axios from 'axios';
import './_newsForm.scss';
const NewsForm = ({ news, setNews, buttonTitle, form }) => {
    const fileInput = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [errors, setErrors] = useState({});
    const validateValues = (inputName, inputValue) => {
        let error = {
            title: '',
            content: '',
            descr: '',
            files: ''
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
            case 'descr':
                if (inputValue.length < 2) {
                    error.descr = "Описание слишком короткое";
                }
                else {
                    error.descr = "";
                }
                break;
            case 'content':
                if (inputValue.length < 2) {
                    error.content = "Новость слишком короткая";
                }
                else {
                    error.content = "";
                }
                break;
            case 'files':
                if (!inputValue) {
                    error.files = "Прикрепите файлы";
                }
                else {
                    error.files = "";
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    const checkForm = () => {
        if (news.title && news.content && news.files) {
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
        setNews((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const clearForm = () => {
        form.current.reset();
        setNews((state) => {
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
        axios.post('https://api.atman-auto.ru/api/news', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новая новость была успешно создана');
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
    const imagesItemsFromUpload = () => {
        let arrayForIteration = [];
        for (let key in fileInput?.current?.files) {
            if (Number.isInteger(Number(key))) {
                arrayForIteration.push(fileInput?.current?.files[key].name);
            }
        }
        const images = arrayForIteration.map((_, i) => {
            return (_jsxs("div", { className: "create-news__image-container", children: [_jsx("img", { src: fileImage, alt: "image" }), _jsx("span", { children: arrayForIteration[i].replace(regular, '') })] }, i));
        });
        return (images);
    };
    let images;
    images = (fileInput?.current?.files?.length) > 0 ? imagesItemsFromUpload() : _jsx("span", { className: "create-news__span", children: "\u041F\u043E\u043A\u0430 \u0435\u0449\u0435 \u043D\u0435\u0442 \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A" });
    return (_jsxs(_Fragment, { children: [spinner, _jsxs("form", { className: "create-news", id: "create-news", ref: form, acceptCharset: 'utf-8', children: [_jsxs("div", { className: "create-news__box", children: [_jsxs("label", { className: "create-news__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" }), _jsx("input", { className: `input ${errors.title ? 'input--error' : ''}`, type: "text", name: "title", value: news.title, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.title })] }), _jsxs("label", { className: "create-news__label", children: [_jsx("span", { children: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" }), _jsx("input", { className: `input ${errors.descr ? 'input--error' : ''}`, type: "text", name: "descr", value: news.descr, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.descr })] }), _jsxs("label", { className: "create-knowlege__label", children: [_jsx("span", { children: "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" }), _jsx("textarea", { className: `input input--textarea ${errors.content ? 'input--error' : ''}`, name: "content", value: news.content, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.content })] }), _jsxs("label", { className: "create-news__label create-news__input", children: [_jsx("input", { className: '', type: "file", name: "files", multiple: true, onChange: handleChange, ref: fileInput }), _jsx("button", { className: 'button', type: "button", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B" }), _jsx("div", { className: 'error', children: errors.files })] }), _jsx("div", { className: "create-news__image-wrapper", children: images })] }), _jsxs("div", { className: "create-knowlege__btns", children: [_jsx("button", { type: "button", className: "create-knowlege__btn button button--orange", onClick: clearForm, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443" }), _jsx("button", { type: "button", className: "create-knowlege__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                    clearForm();
                                }, children: buttonTitle })] })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default NewsForm;
