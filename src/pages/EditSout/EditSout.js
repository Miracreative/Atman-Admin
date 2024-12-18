import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import { getOneSout, deleteSout } from '../../hooks/http.hook';
import './_editSout.scss';
const EditSout = () => {
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
    const [sout, setSout] = useState({
        id: 0,
        name: '',
        url: '',
        file: ''
    });
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let soutFile;
    soutFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : (sout.url ? sout.url.replace(regular, '') : 'Файл не выбран');
    const validateValues = (inputName, inputValue) => {
        let error = {
            name: '',
            url: ''
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
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    //отправляем запрос получния данных об админе
    useEffect(() => {
        getOneSout(id).then(res => {
            setSout(res);
        });
    }, []);
    const checkForm = () => {
        if (sout.name) {
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
        setSout((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${sout.id}`);
        axios.put('https://api.atman-auto.ru/api/sout', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('СОУТ был успешно обновлен');
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
    const removeSout = (id) => {
        setShowConfirm(false);
        deleteSout(id);
        setDel(true);
        setShowAlert(true);
        setTextAlert('СОУТ успешно удален');
    };
    // показываем окно подтверждения
    const onConfirmDelete = (id, name) => {
        setShowConfirm(true);
        setTargetConfirm({ id, name });
    };
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0421\u041E\u0423\u0422", children: null, showBackBtn: true }), spinner, _jsxs("form", { className: "create-sout", id: "create-sout", ref: form, acceptCharset: 'utf-8', children: [_jsxs("div", { className: "create-sout__box", children: [_jsxs("label", { className: "create-sout__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0421\u041E\u0423\u0422" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "name", value: sout.name, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.name })] }), _jsxs("label", { className: "create-sout__label create-sout__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u0430\u0439\u043B" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", ref: fileInput, onChange: handleChange }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: soutFile })] })] }), _jsxs("div", { className: "create-sout__btns", children: [_jsx("button", { type: "button", className: "create-sout__btn button button--orange", onClick: () => onConfirmDelete(sout.id, sout.name), children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0421\u041E\u0423\u0422" }), _jsx("button", { type: "button", className: "create-sout__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                }, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0421\u041E\u0423\u0422" })] })] }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0421\u041E\u0423\u0422?', text1: targetConfirm.name, text2: '', showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removeSout(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => del ?
                    navigate('/sout') :
                    console.log('edit') })] }));
};
export default EditSout;
