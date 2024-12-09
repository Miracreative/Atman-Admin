import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import CompanyForm from '../../components/CompanyForm/CompanyForm';
const CreateCompany = () => {
    const [company, setCompany] = useState({
        fullname: '',
        shortname: '',
        actualaddress: '',
        postaladdress: '',
        legaladdress: '',
        director: '',
        phone: '',
        email: '',
        website: '',
        inn: '',
        kpp: '',
        okpo: '',
        ogrn: '',
        okved: '',
        bankname: '',
        accountnumber: '',
        correspondentaccount: '',
        bic: '',
        file: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E", children: null, showBackBtn: false }), _jsx(CompanyForm, { company: company, setCompany: setCompany, buttonTitle: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E", form: form })] }));
};
export default CreateCompany;
