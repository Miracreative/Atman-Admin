import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import KnowlegeForm from '../../components/KnowlegeForm/KnowlegeForm';
const CreateKnowlege = () => {
    const [knowledge, setKnowlege] = useState({
        title: '',
        content: '',
        file: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0431\u0430\u0437\u0443", children: null, showBackBtn: false }), _jsx(KnowlegeForm, { knowledge: knowledge, setKnowlege: setKnowlege, buttonTitle: "\u0421\u043E\u0437\u0430\u0434\u0430\u0442\u044C \u0431\u0430\u0437\u0443", form: form })] }));
};
export default CreateKnowlege;
