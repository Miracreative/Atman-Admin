import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import { getOneKnowlege, deleteKnowlege } from '../../hooks/http.hook';
import './_editKnowlege.scss';
const EditKnowlege = () => {
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
        title: ''
    });
    const [knowledge, setKnowledge] = useState({
        id: 0,
        title: '',
        content: '',
        file: '',
        file_name: ''
    });
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
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    //отправляем запрос получния данных об админе
    useEffect(() => {
        getOneKnowlege(id).then(res => {
            setKnowledge(res);
        });
    }, []);
    const checkForm = () => {
        if (knowledge.title && knowledge.content) {
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
        setKnowledge((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${knowledge.id}`);
        axios.put('https://api.atman-auto.ru/api/base', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('База была успешно обновлена');
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
    const removeKnowlege = (id) => {
        setShowConfirm(false);
        deleteKnowlege(id);
        setDel(true);
        setShowAlert(true);
        setTextAlert('База успешно удалена');
    };
    // показываем окно подтверждения
    const onConfirmDelete = (id, title) => {
        setShowConfirm(true);
        setTargetConfirm({ id, title });
    };
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0431\u0430\u0437\u0443", children: null, showBackBtn: true }), spinner, _jsxs("form", { className: "create-knowlege", id: "create-knowlege", ref: form, acceptCharset: 'utf-8', children: [_jsxs("div", { className: "create-knowlege__box", children: [_jsxs("label", { className: "create-knowlege__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0430\u0437\u044B \u0437\u043D\u0430\u043D\u0438\u0439" }), _jsx("input", { className: `input ${errors.title ? 'input--error' : ''}`, type: "text", name: "title", value: knowledge.title, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.title })] }), _jsxs("label", { className: "create-knowlege__label", children: [_jsx("span", { children: "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435 \u0431\u0430\u0437\u044B" }), _jsx("textarea", { className: `input input--textarea ${errors.content ? 'input--error' : ''}`, name: "content", value: knowledge.content, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.content })] }), _jsxs("label", { className: "create-knowlege__label create-knowlege__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", onChange: handleChange }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: knowledge.file ? knowledge.file.replace(regular, '') : 'Файл не выбран' })] })] }), _jsxs("div", { className: "create-knowlege__btns", children: [_jsx("button", { type: "button", className: "create-knowlege__btn button button--orange", onClick: () => onConfirmDelete(knowledge.id, knowledge.title), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0430\u0437\u0443" }), _jsx("button", { type: "button", className: "create-knowlege__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                }, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0431\u0430\u0437\u0443" })] })] }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0431\u0430\u0437\u0443?', text1: targetConfirm.title, text2: '', showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removeKnowlege(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => del ?
                    navigate('/knowledge-list') :
                    console.log('edit') })] }));
};
export default EditKnowlege;
