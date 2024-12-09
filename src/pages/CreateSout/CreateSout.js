import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import SoutForm from '../../components/SoutForm/SoutForm';
const CreateSout = () => {
    const [sout, setSout] = useState({
        name: '',
        file: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0421\u041E\u0423\u0422", children: null, showBackBtn: false }), _jsx(SoutForm, { sout: sout, setSout: setSout, buttonTitle: "\u0421\u043E\u0437\u0430\u0434\u0430\u0442\u044C \u0421\u041E\u0423\u0422", form: form })] }));
};
export default CreateSout;
