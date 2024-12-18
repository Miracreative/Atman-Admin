import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import { getOneNews, deleteNews } from '../../hooks/http.hook';
import './_editNews.scss';
const EditNews = () => {
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
        title: ''
    });
    const [news, setNews] = useState({
        id: 0,
        title: '',
        content: '',
        descr: '',
        imagessrc: [],
        files: ''
    });
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
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    //отправляем запрос получния данных об админе
    useEffect(() => {
        getOneNews(id).then(res => {
            setNews(res);
        });
    }, []);
    const checkForm = () => {
        if (news.title && news.content) {
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
        setNews((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${news.id}`);
        axios.put('https://api.atman-auto.ru/api/news', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новость была успешно обновлена');
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
    const removeNews = (id) => {
        setShowConfirm(false);
        deleteNews(id);
        setDel(true);
        setShowAlert(true);
        setTextAlert('Новость успешно удалена');
    };
    // показываем окно подтверждения
    const onConfirmDelete = (id, title) => {
        setShowConfirm(true);
        setTargetConfirm({ id, title });
    };
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    const imagesItemsFromBackend = (arr) => {
        const images = arr.map((_, i) => {
            return (_jsxs("div", { className: "create-news__image-container", children: [_jsx("img", { src: fileImage, alt: "image" }), _jsx("span", { children: arr[i].replace(regular, '') })] }, i));
        });
        return (images);
    };
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
    imagesItemsFromBackend(news.imagessrc);
    let images;
    images = (fileInput?.current?.files?.length) > 0 ? imagesItemsFromUpload() : ((news?.imagessrc?.length > 0) ? imagesItemsFromBackend(news.imagessrc) : 'нет картинок');
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C", children: null, showBackBtn: true }), spinner, _jsxs("form", { className: "create-news", id: "create-news", ref: form, acceptCharset: 'utf-8', children: [_jsxs("div", { className: "create-news__box", children: [_jsxs("label", { className: "create-news__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" }), _jsx("input", { className: `input ${errors.title ? 'input--error' : ''}`, type: "text", name: "title", value: news.title, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.title })] }), _jsxs("label", { className: "create-news__label", children: [_jsx("span", { children: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" }), _jsx("input", { className: `input ${errors.descr ? 'input--error' : ''}`, type: "text", name: "descr", value: news.descr, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.descr })] }), _jsxs("label", { className: "create-knowlege__label", children: [_jsx("span", { children: "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" }), _jsx("textarea", { className: `input input--textarea ${errors.content ? 'input--error' : ''}`, name: "content", value: news.content, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.content })] }), _jsxs("label", { className: "create-news__label create-news__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B, \u0435\u0441\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435" }), _jsx("input", { className: '', type: "file", name: "files", multiple: true, onChange: handleChange, ref: fileInput }), _jsx("button", { className: 'button', type: "button", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B" })] }), _jsx("div", { className: "create-news__image-wrapper", children: images })] }), _jsxs("div", { className: "create-news__btns", children: [_jsx("button", { type: "button", className: "create-news__btn button button--orange", onClick: () => onConfirmDelete(news.id, news.title), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C" }), _jsx("button", { type: "button", className: "create-news__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                }, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C" })] })] }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C?', text1: targetConfirm.title, text2: '', showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removeNews(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => del ?
                    navigate('/news') :
                    console.log('edit') })] }));
};
export default EditNews;
