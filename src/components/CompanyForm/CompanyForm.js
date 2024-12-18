import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg';
import InputMask from 'react-input-mask';
import axios from 'axios';
import './_companyForm.scss';
const CompanyForm = ({ company, setCompany, buttonTitle, form }) => {
    const [loading, setLoading] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});
    const validateValues = (inputName, inputValue) => {
        let error = {
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
        };
        switch (inputName) {
            case 'fullname':
                if (inputValue.length < 5) {
                    error.fullname = "Название слишком короткое";
                }
                else {
                    error.fullname = '';
                }
                break;
            case 'shortname':
                if (inputValue.length < 2) {
                    error.shortname = "Название слишком короткое";
                }
                else {
                    error.shortname = '';
                }
                break;
            case 'actualaddress':
                if (inputValue.length < 10) {
                    error.actualaddress = "Адрес слишком короткий";
                }
                else {
                    error.actualaddress = '';
                }
                break;
            case 'postaladdress':
                if (inputValue.length < 10) {
                    error.postaladdress = "Адрес слишком короткий";
                }
                else {
                    error.postaladdress = '';
                }
                break;
            case 'legaladdress':
                if (inputValue.length < 10) {
                    error.legaladdress = "Адрес слишком короткий";
                }
                else {
                    error.legaladdress = '';
                }
                break;
            case 'director':
                if (inputValue.length < 10) {
                    error.director = "Имя директора солишком короткое";
                }
                else {
                    error.director = '';
                }
                break;
            case 'email':
                let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\-+[a-z.]+\.[a-z]{2,6}$/i;
                if (!emailRegExp.test(inputValue)) {
                    error.email = "Email некорректный";
                }
                else {
                    error.email = "";
                }
                break;
            case 'phone':
                if (inputValue.length < 15) {
                    error.phone = "Телефон слишком короткий";
                }
                else {
                    error.phone = '';
                }
                break;
            case 'website':
                if (inputValue.length < 5) {
                    error.website = "Название web-сайта солишком короткое";
                }
                else {
                    error.website = '';
                }
                break;
            case 'inn':
                if (inputValue.length < 9) {
                    error.inn = "ИНН слишком короткий";
                }
                else {
                    error.inn = '';
                }
                break;
            case 'kpp':
                if (inputValue.length < 8) {
                    error.kpp = "КПП слишком короткий";
                }
                else {
                    error.kpp = '';
                }
                break;
            case 'okpo':
                if (inputValue.length < 7) {
                    error.okpo = "ОКПО слишком короткий";
                }
                else {
                    error.okpo = '';
                }
                break;
            case 'ogrn':
                if (inputValue.length < 11) {
                    error.ogrn = "ОГРН слишком короткий";
                }
                else {
                    error.ogrn = '';
                }
                break;
            case 'okved':
                if (inputValue.length < 3) {
                    error.okved = "ОКВЭД слишком короткий";
                }
                else {
                    error.okved = '';
                }
                break;
            case 'bankname':
                if (inputValue.length < 9) {
                    error.bankname = "Название банка слишком короткое";
                }
                else {
                    error.bankname = '';
                }
                break;
            case 'accountnumber':
                if (inputValue.length < 19) {
                    error.accountnumber = "Номер расчетного счета слишком короткий";
                }
                else {
                    error.accountnumber = '';
                }
                break;
            case 'correspondentaccount':
                if (inputValue.length < 19) {
                    error.correspondentaccount = "Номер корреспондетского счета слишком короткий";
                }
                else {
                    error.correspondentaccount = '';
                }
                break;
            case 'bic':
                if (inputValue.length < 9) {
                    error.bic = "БИК слишком короткий";
                }
                else {
                    error.bic = '';
                }
                break;
            case 'file':
                if (!inputValue) {
                    error.file = "Прикрепите файл";
                }
                else {
                    error.file = "";
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    const fileInput = useRef(null);
    let companyFile;
    companyFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : 'Файл не выбран';
    const checkForm = () => {
        if (company.fullname && fileInput?.current?.value.length > 0 && company.shortname && company.actualaddress && company.postaladdress && company.legaladdress && company.director && company.phone && company.email && company.website && company.inn && company.kpp && company.okpo && company.ogrn && company.okved && company.bankname && company.accountnumber && company.correspondentaccount && company.bic && company.file) {
            for (let key in errors) {
                if (errors[key] !== '') {
                    return true;
                }
            }
            return false;
        }
        return true;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const clearForm = () => {
        form.current.reset();
        setCompany((state) => {
            let newState = { ...state };
            for (let key in newState) {
                newState[key] = '';
            }
            return newState;
        });
    };
    const submitForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target.form);
        formData.delete('fullname');
        formData.append('fullName', `${company.fullname}`);
        formData.delete('shortname');
        formData.append('shortName', `${company.shortname}`);
        formData.delete('actualaddress');
        formData.append('actualAddress', `${company.actualaddress}`);
        formData.delete('postaladdress');
        formData.append('postalAddress', `${company.postaladdress}`);
        formData.delete('legaladdress');
        formData.append('legalAddress', `${company.legaladdress}`);
        formData.delete('inn');
        formData.append('INN', `${company.inn}`);
        formData.delete('kpp');
        formData.append('KPP', `${company.kpp}`);
        formData.delete('okpo');
        formData.append('OKPO', `${company.okpo}`);
        formData.delete('ogrn');
        formData.append('OGRN', `${company.ogrn}`);
        formData.delete('okved');
        formData.append('OKVED', `${company.okved}`);
        formData.delete('bankname');
        formData.append('bankName', `${company.bankname}`);
        formData.delete('accountnumber');
        formData.append('accountNumber', `${company.accountnumber}`);
        formData.delete('correspondentaccount');
        formData.append('correspondentAccount', `${company.correspondentaccount}`);
        formData.delete('bic');
        formData.append('BIC', `${company.bic}`);
        axios.post('https://api.atman-auto.ru/api/company', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новая компания была успешно создана');
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
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [spinner, _jsxs("form", { className: "create-company", id: "create-company", ref: form, acceptCharset: 'utf-8', children: [_jsx("div", { className: 'create-company__inner', children: _jsx("div", { className: "create-company__right", children: _jsxs("div", { className: "create-company__col-box", children: [_jsxs("div", { className: "create-company__col", children: [_jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u044F \u043F\u043E\u043B\u043D\u043E\u0435:" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "fullname", value: company.fullname, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.fullname })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u044F \u043A\u0440\u0430\u0442\u043A\u043E\u0435:" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "shortname", value: company.shortname, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.shortname })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0434\u0440\u0435\u0441:" }), _jsx("input", { className: `input ${errors.actualaddress ? 'input--error' : ''}`, type: "text", name: "actualaddress", value: company.actualaddress, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.actualaddress })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u0430\u0434\u0440\u0435\u0441:" }), _jsx("input", { className: `input ${errors.postaladdress ? 'input--error' : ''}`, type: "text", name: "postaladdress", value: company.postaladdress, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.postaladdress })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u042E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0434\u0440\u0435\u0441:" }), _jsx("input", { className: `input ${errors.legaladdress ? 'input--error' : ''}`, type: "text", name: "legaladdress", value: company.legaladdress, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.legaladdress })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0414\u0438\u0440\u0435\u043A\u0442\u043E\u0440:" }), _jsx("input", { className: `input ${errors.director ? 'input--error' : ''}`, type: "text", name: "director", value: company.director, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.director })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D:" }), _jsx(InputMask, { mask: "8-999-999-99-99", maskChar: " ", className: "input", value: company.phone, name: "phone", onChange: handleChange }), _jsx("div", { className: 'error', children: errors.phone })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "E-mail" }), _jsx("input", { className: `input ${errors.email ? 'input--error' : ''}`, type: "text", name: "email", value: company.email, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.email })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0412\u0435\u0431-\u0441\u0430\u0439\u0442:" }), _jsx("input", { className: `input ${errors.website ? 'input--error' : ''}`, type: "text", name: "website", value: company.website, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.website })] }), _jsxs("label", { className: "create-company__label create-company__input", children: [_jsx("span", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438" }), _jsx("input", { className: '', type: "file", name: "file", id: "file", ref: fileInput, onChange: handleChange }), _jsx("img", { src: fileImage, alt: "file_image" }), _jsx("span", { children: companyFile })] })] }), _jsxs("div", { className: "create-company__col", children: [_jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0418\u041D\u041D:" }), _jsx("input", { className: `input ${errors.inn ? 'input--error' : ''}`, type: "text", name: "inn", value: company.inn, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.inn })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041A\u041F\u041F:" }), _jsx("input", { className: `input ${errors.kpp ? 'input--error' : ''}`, type: "text", name: "kpp", value: company.kpp, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.kpp })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041E\u041A\u041F\u041E:" }), _jsx("input", { className: `input ${errors.okpo ? 'input--error' : ''}`, type: "text", name: "okpo", value: company.okpo, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.okpo })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041E\u0413\u0420\u041D:" }), _jsx("input", { className: `input ${errors.ogrn ? 'input--error' : ''}`, type: "text", name: "ogrn", value: company.ogrn, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.ogrn })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041E\u041A\u0412\u042D\u0414:" }), _jsx("input", { className: `input ${errors.okved ? 'input--error' : ''}`, type: "text", name: "okved", value: company.okved, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.okved })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0430\u043D\u043A\u0430:" }), _jsx("input", { className: `input ${errors.bankname ? 'input--error' : ''}`, type: "text", name: "bankname", value: company.bankname, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.bankname })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0420\u0430\u0441\u0447\u0435\u0442\u043D\u044B\u0439 \u0441\u0447\u0435\u0442:" }), _jsx("input", { className: `input ${errors.accountnumber ? 'input--error' : ''}`, type: "text", name: "accountnumber", value: company.accountnumber, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.accountnumber })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u041A\u043E\u0440\u0440\u0435\u0441\u043F\u043E\u043D\u0434\u0435\u043D\u0442\u0441\u043A\u0438\u0439 \u0441\u0447\u0435\u0442:" }), _jsx("input", { className: `input ${errors.correspondentaccount ? 'input--error' : ''}`, type: "text", name: "correspondentaccount", value: company.correspondentaccount, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.correspondentaccount })] }), _jsxs("label", { className: "create-company__label", children: [_jsx("span", { children: "\u0411\u0418\u041A:" }), _jsx("input", { className: `input ${errors.bic ? 'input--error' : ''}`, type: "text", name: "bic", value: company.bic, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.bic })] })] })] }) }) }), _jsxs("div", { className: "create-company__btns", children: [_jsx("button", { type: "button", className: "create-company__btn button button--orange", onClick: clearForm, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443" }), _jsx("button", { type: "button", className: "create-company__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                    clearForm();
                                }, children: buttonTitle })] })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default CompanyForm;
