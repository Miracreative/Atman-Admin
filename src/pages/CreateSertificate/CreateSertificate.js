import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import SertificationForm from '../../components/SertificateForm/SertificateForm';
const CreateSertificate = () => {
    const [sertificate, setSertificate] = useState({
        title: '',
        type: '',
        file: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442", children: null, showBackBtn: false }), _jsx(SertificationForm, { sertificate: sertificate, setSertificate: setSertificate, buttonTitle: "\u0421\u043E\u0437\u0430\u0434\u0430\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442", form: form })] }));
};
export default CreateSertificate;
