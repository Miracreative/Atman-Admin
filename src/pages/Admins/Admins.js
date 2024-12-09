import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllAdmins, deleteAdmin } from "../../hooks/http.hook";
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import SetContent from "../../utils/SetContent";
import './_admins.scss';
import trash from "./../../assets/icons/trash.svg";
const Admins = () => {
    const [admins, setAdmins] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [targetConfirm, setTargetConfirm] = useState({
        id: 0,
        name: '',
        email: ''
    });
    const [process, setProcess] = useState('loading');
    const getUsers = () => {
        getAllAdmins().then(res => {
            setAdmins(res);
        }).then(() => { setProcess('confirmed'); });
    };
    useEffect(() => {
        getUsers();
    }, [showAlert]);
    const removeAdmin = (id) => {
        setShowConfirm(false);
        deleteAdmin(id);
        setShowAlert(true);
        setTextAlert("Админ успешно удален");
    };
    const onConfirmDelete = (id, name, email) => {
        setShowConfirm(true);
        setTargetConfirm({ id, name, email });
    };
    const renderItems = (arr) => {
        const adminsList = arr.map((item) => {
            const { id, name, email } = item;
            return (_jsxs("li", { className: "rows-list__item", children: [_jsxs("div", { className: 'rows-list__box parents__box', children: [_jsx("span", { children: id }), _jsx("span", { children: name }), _jsx("span", { children: email }), _jsx(Link, { className: "rows-list__btn button", to: `/edit-admin/${id}`, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] }), _jsx("button", { className: 'btn-trash', onClick: () => onConfirmDelete(id, name, email), children: _jsx("img", { src: trash, alt: "delete" }) })] }, id));
        });
        return (_jsx("ul", { className: "rows-list", children: adminsList }));
    };
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0410\u0434\u043C\u0438\u043D\u044B", children: null, showBackBtn: false }), _jsx(SetContent, { process: process, component: renderItems(admins) }), _jsx(ConfirmModal, { question: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0430?', text1: targetConfirm.name, text2: targetConfirm.email, showConfirm: showConfirm, setShowConfirm: setShowConfirm, actionConfirmed: () => removeAdmin(targetConfirm.id) }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default Admins;
