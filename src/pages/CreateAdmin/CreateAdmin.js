import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import AdminForm from '../../components/AdminForm/AdminForm';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import Spinner from '../../components/Spinner/Spinner';
import { createAdmin } from '../../hooks/http.hook';
const CreateAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        repeatPass: ''
    });
    const form = useRef(0);
    const onCreateAdmin = () => {
        setLoading(true);
        createAdmin(admin)
            .then((res) => {
            setLoading(false);
            setShowAlert(true);
            if (res.message) {
                setTextAlert(res.message);
            }
            else {
                setTextAlert('Новый администратор был успешно создан');
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
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0430", children: null, showBackBtn: false }), spinner, _jsx(AdminForm, { admin: admin, setAdmin: setAdmin, buttonTitle: "\u0421\u043E\u0437\u0430\u0434\u0430\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0430", sendData: onCreateAdmin, form: form }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default CreateAdmin;
