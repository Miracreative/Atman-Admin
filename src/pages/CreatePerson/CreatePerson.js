import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import PersonForm from '../../components/PersonForm/PersonForm';
const CreatePerson = () => {
    const [person, setPerson] = useState({
        name: '',
        file: '',
        watsapp: '',
        email: '',
        descr: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430", children: null, showBackBtn: false }), _jsx(PersonForm, { person: person, setPerson: setPerson, buttonTitle: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430", form: form })] }));
};
export default CreatePerson;
