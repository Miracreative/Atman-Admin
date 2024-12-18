import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import { getOneSertificate, deleteSertificate } from '../../hooks/http.hook';
import './_editSertification.scss';
const EditSertification = () => {
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
    const [sertificate, setSertificate] = useState({
        id: 0,
        title: '',
        type: '',
        imagesrc: '',
        file: ''
    });
    const validateValues = (inputName, inputValue) => {
        let error = {
            title: '',
            type: ''
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
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    //отправляем запрос получния данных об админе
    useEffect(() => {
        getOneSertificate(id).then(res => {
            setSertificate(res);
        });
    }, []);
    const checkForm = () => {
        if (sertificate.title && sertificate.type) {
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
        setSertificate((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${sertificate.id}`);
        axios.put('https://api.atman-auto.ru/api/sertificate', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Сертификат был успешно обновлен');
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
    const removeSertification = (id) => {
        setShowConfirm(false);
        deleteSertificate(id);
        setDel(true);
        setShowAlert(true);
        setTextAlert('Сертификат успешно удален');
    };
    // показываем окно подтверждения
    const onConfirmDelete = (id, title) => {
        setShowConfirm(true);
        setTargetConfirm({ id, title });
    };
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442", children: null, showBackBtn: true }), spinner, _jsxs("form", { className: "create-sertification", id: "create-sertification", ref: form, acceptCharset: 'utf-8', children: [_jsxs("div", { className: "create-sertification__box", children: [_jsxs("label", { className: "create-sertification__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430" }), _jsx("input", { className: `input ${errors.title ? 'input--error' : ''}`, type: "text", name: "title", value: sertificate.title, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.title })] }), _jsxs("label", { className: "create-sertification__label create-sertification__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B, \u0435\u0441\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", onChange: handleChange }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: sertificate.file ? sertificate.file.replace(regular, '') : (sertificate.imagesrc ? sertificate.imagesrc.replace(regular, '') : 'Файла нет') })] }), _jsxs("label", { className: "create-sertification__label", children: [_jsx("span", { children: "\u0422\u0438\u043F \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430" }), _jsxs("div", { className: "create-sertification__checkboxes", children: [_jsxs("label", { className: "create-sertification__checkbox", children: [_jsx("input", { className: "sr-only", type: "radio", name: "type", value: "album", checked: sertificate.type === 'album' ? true : false, onChange: handleChange }), _jsx("span", { children: "\u0410\u043B\u044C\u0431\u043E\u043C\u043D\u0430\u044F" })] }), _jsxs("label", { className: "create-sertification__checkbox", children: [_jsx("input", { className: "sr-only", type: "radio", name: "type", value: "portrait", checked: sertificate.type === 'portrait' ? true : false, onChange: handleChange }), _jsx("span", { children: "\u041F\u043E\u0440\u0442\u0440\u0435\u0442\u043D\u0430\u044F" })] })] })] })] }), _jsxs("div", { className: "create-sertification__btns", children: [_jsx("button", { type: "button", className: "create-sertification__btn button button--orange", onClick: () => onConfirmDelete(sertificate.id, sertificate.title), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" }), _jsx("button", { type: "button", className: "create-sertification__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                }, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" })] })] }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442?', text1: targetConfirm.title, text2: '', showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removeSertification(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => del ?
                    navigate('/sertifications-list') :
                    console.log('edit') })] }));
};
export default EditSertification;
