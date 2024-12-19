import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import Spinner from '../Spinner/Spinner';
import checked from "../../assets/icons/checked.svg";
import SetContent from "./../../utils/SetContent";
import ModalAlert from '../ModalAlert/ModalAlert';
import { filtersData, recommendData, parametersData } from "../../data";
import fileImage from '../../assets/icons/file.svg';
import axios from 'axios';
import './_goodsForm.scss';
const GoodsForm = ({ good, setGood, buttonTitle, form }) => {
    const [loading, setLoading] = useState(false);
    const [textAlert, setTextAlert] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState({});
    const [mainParametersArray, setMainParametersArray] = useState(good?.mainparameter);
    const [recommendParametersArray, setRecommendParametersArray] = useState(good?.recommendparameter);
    const [parametersArray, setParametersArray] = useState(good?.parameter);
    const [process, setProcess] = useState('confirmed');
    const validateValues = (inputName, inputValue) => {
        let error = {
            imageurl: '',
            material: '',
            goodspersonalimages: '',
            goodsindustrialimages: '',
            parameter: '',
            mainparameter: '',
            recommendparameter: '',
            article: '',
            advantages: '',
            basetype: '',
            heatresistance: '',
            name: '',
            description: '',
            type: '',
            brand: '',
            pdfurl: ''
        };
        switch (inputName) {
            case 'imageurl':
                if (!inputValue) {
                    error.imageurl = "Изображение не выбрано";
                }
                else {
                    error.imageurl = '';
                }
                break;
            case 'goodspersonalimages':
                if (!inputValue) {
                    error.goodspersonalimages = "Изображения не выбраны";
                }
                else {
                    error.goodspersonalimages = '';
                }
                break;
            case 'goodsindustrialimages':
                if (!inputValue) {
                    error.goodsindustrialimages = "Изображения не выбраны";
                }
                else {
                    error.goodsindustrialimages = '';
                }
                break;
            case 'parameter':
                if (parametersArray.includes(1)) {
                    error.parameter = "Не указаны характеристики";
                }
                else {
                    error.parameter = '';
                }
                break;
            case 'mainparameter':
                if (mainParametersArray.includes(1)) {
                    error.mainparameter = "Не указаны характеристики";
                }
                else {
                    error.mainparameter = '';
                }
                break;
            case 'recommendparameter':
                if (mainParametersArray.includes(1)) {
                    error.recommendparameter = "Не указаны характеристики";
                }
                else {
                    error.recommendparameter = '';
                }
                break;
            case 'name':
                if (inputValue.length < 2) {
                    error.name = "Название товара слишком короткое";
                }
                else {
                    error.name = '';
                }
                break;
            case 'type':
                if (inputValue.length < 2) {
                    error.name = "Название товара слишком короткое";
                }
                else {
                    error.name = '';
                }
                break;
            case 'basetype':
                if (inputValue.length < 2) {
                    error.name = "Название товара слишком короткое";
                }
                else {
                    error.name = '';
                }
                break;
            case 'material':
                if (inputValue.length < 2) {
                    error.material = "Название материала слишком короткое";
                }
                else {
                    error.material = '';
                }
                break;
            case 'article':
                if (inputValue.length < 2) {
                    error.article = "Артикул слишком короткий";
                }
                else {
                    error.article = '';
                }
                break;
            case 'brand':
                if (inputValue.length < 2) {
                    error.brand = "Бренд слишком короткий";
                }
                else {
                    error.brand = '';
                }
                break;
            case 'description':
                if (inputValue.length < 10) {
                    error.description = "Текста слишком мало";
                }
                else {
                    error.description = '';
                }
                break;
            default:
                console.error('Неизвестное поле');
        }
        return error;
    };
    const checkForm = () => {
        if (good.name && good.description && good.article && good.material && good.brand && fileInputMaterial.current.value && good.mainparameter.length > 0 && good.recommendparameter.length > 0 && good.parameter.length > 0 && good.advantages.length > 0 && fileInputIndustrial.current.files.length > 0 && fileInputPersonal.current.files.length > 0 && good.type && good.basetype && fileInputPdf.current.value) {
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
        setGood((state) => ({ ...state, [name]: value }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const handleChangeAdvantages = (e, i) => {
        const { value } = e.target;
        const newGood = good;
        newGood.advantages[i] = value;
        setGood((state) => ({ ...state, advantages: newGood.advantages }));
        setErrors((state) => ({ ...state, ...validateValues(e.target.name, e.target.value) }));
    };
    const deleteEmptyAdvantages = () => {
        let newGood = good;
        newGood.advantages = newGood.advantages.filter((item) => item !== '');
        setGood((state) => ({ ...state, advantages: newGood.advantages }));
    };
    const clearForm = () => {
        form.current.reset();
        setGood((state) => {
            let newState = { imageurl: '',
                material: '',
                goodspersonalimages: [],
                goodsindustrialimages: [],
                parameter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                mainparameter: [0, 0, 0, 0, 0, 0, 0, 0],
                renderparameter: [0, 0, 0, 0, 0, 0, 0],
                article: '',
                advantages: [''],
                thickness: '',
                volume: '',
                pcs: '',
                basetype: '',
                color: '',
                heatresistance: '',
                name: '',
                description: '',
                type: '',
                size: '',
                brand: '',
                linertype: '',
                pdfurl: '',
                typeglue: '',
                dencity: '' };
            return newState;
        });
    };
    const submitForm = async (e) => {
        e.preventDefault();
        deleteEmptyAdvantages();
        const formData = new FormData(e.target.form);
        formData.delete('type');
        formData.append('type', `${good.type}`);
        formData.delete('basetype');
        formData.append('baseType', `${good.basetype}`);
        formData.delete('linertype');
        formData.append('linerType', `${good.linertype}`);
        formData.delete('typeglue');
        formData.append('typeGlue', `${good.typeglue}`);
        formData.delete('heatresistance');
        formData.append('heatResistance', `${good.heatresistance}`);
        formData.append('advantages', JSON.stringify(good.advantages).replace('[', '{')
            .replace(']', '}'));
        formData.append('mainParameter', JSON.stringify(good.mainparameter).replace('[', '{')
            .replace(']', '}'));
        formData.append('recommendparameter', JSON.stringify(good.mainparameter).replace('[', '{')
            .replace(']', '}'));
        formData.append('parameter', JSON.stringify(good.parameter).replace('[', '{')
            .replace(']', '}'));
        axios.post('https://api.atman-auto.ru/api/goods', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Товар был успешно создан');
            clearForm();
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
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    const fileInputPersonal = useRef(null);
    const fileInputIndustrial = useRef(null);
    const fileInputPdf = useRef(null);
    const fileInputMaterial = useRef(null);
    const imagesItemsFromUpload = (input) => {
        let arrayForIteration = [];
        for (let key in input?.current?.files) {
            if (Number.isInteger(Number(key))) {
                arrayForIteration.push(input?.current?.files[key].name);
            }
        }
        const images = arrayForIteration.map((_, i) => {
            return (_jsxs("div", { className: "create-news__image-container", children: [_jsx("img", { src: fileImage, alt: "image" }), _jsx("span", { children: arrayForIteration[i].replace(regular, '') })] }, i));
        });
        return (images);
    };
    let imagesPersonal;
    imagesPersonal = (fileInputPersonal?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputPersonal) : 'нет картинок';
    let imagesIndustrial;
    imagesIndustrial = (fileInputIndustrial?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputIndustrial) : 'нет картинок';
    let imagePdf;
    imagePdf = (fileInputPdf?.current?.value.length > 0) ? fileInputPdf?.current?.value.replace(regular, '') : (good.pdfurl ? good.pdfurl.replace(regular, '') : 'Файл не выбран');
    let imageMaterial;
    imageMaterial = (fileInputMaterial?.current?.value.length > 0) ? fileInputMaterial?.current?.value.replace(regular, '') : (good.imageurl ? good.imageurl.replace(regular, '') : 'Файл не выбран');
    const handleAddAdvantages = (e) => {
        e.preventDefault();
        const newGood = good;
        if (!Array.isArray(newGood.advantages)) {
            newGood.advantages = [];
        }
        newGood.advantages.push('');
        setGood(newGood);
        setFlag(flag => !flag);
    };
    const [flag, setFlag] = useState(false);
    const rendererAdvantages = (advantages) => {
        const inputsForAdv = advantages?.map((_, i) => {
            return (_jsx("input", { type: "text", className: `input ${errors.advantages ? 'input--error' : ''}`, value: advantages[i], onChange: (e) => handleChangeAdvantages(e, i) }, i));
        });
        return (inputsForAdv);
    };
    let advantagesList;
    advantagesList = rendererAdvantages(good?.advantages);
    useEffect(() => {
        advantagesList = rendererAdvantages(good?.advantages);
    }, [flag]);
    const onMainParameters = (id) => {
        let newArray = good;
        let newItem;
        if (newArray.mainparameter[id] == 1) {
            newItem = 0;
        }
        else {
            newItem = 1;
        }
        let newArr = [...newArray.mainparameter.slice(0, id), newItem, ...newArray.mainparameter.slice(id + 1, newArray.mainparameter.length)];
        newArray.mainparameter = newArr;
        setGood(newArray);
        let newFilterArray = mainParametersArray;
        let newItem1;
        if (newFilterArray[id] == 1) {
            newItem1 = 0;
        }
        else {
            newItem1 = 1;
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)];
        setMainParametersArray(newArr1);
    };
    const onRecommendParameters = (id) => {
        let newArray = good;
        let newItem;
        if (newArray.recommendparameter[id] == 1) {
            newItem = 0;
        }
        else {
            newItem = 1;
        }
        let newArr = [...newArray.recommendparameter.slice(0, id), newItem, ...newArray.recommendparameter.slice(id + 1, newArray.recommendparameter.length)];
        newArray.recommendparameter = newArr;
        setGood(newArray);
        let newFilterArray = recommendParametersArray;
        let newItem1;
        if (newFilterArray[id] == 1) {
            newItem1 = 0;
        }
        else {
            newItem1 = 1;
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)];
        setRecommendParametersArray(newArr1);
    };
    const onParameters = (id) => {
        let newArray = good;
        let newItem;
        if (newArray.parameter[id] == 1) {
            newItem = 0;
        }
        else {
            newItem = 1;
        }
        let newArr = [...newArray.parameter.slice(0, id), newItem, ...newArray.parameter.slice(id + 1, newArray.parameter.length)];
        newArray.parameter = newArr;
        setGood(newArray);
        console.log(newArray.parameter);
        let newFilterArray = parametersArray;
        let newItem1;
        if (newFilterArray[id] == 1) {
            newItem1 = 0;
        }
        else {
            newItem1 = 1;
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)];
        setParametersArray(newArr1);
    };
    const renderMainParameters = (arr) => {
        const filtersList = arr.map((item, i) => {
            const { id, title } = item;
            return (_jsxs("li", { className: 'filters__item', children: [_jsx("div", { className: "filters__check", onClick: () => { onMainParameters(id); }, children: good.mainparameter[i] ? _jsx("img", { src: checked, alt: "checked" }) : null }), _jsx("span", { className: "filters__title", children: title })] }, id));
        });
        return (filtersList);
    };
    const renderRecommendParameters = (arr) => {
        const filtersList = arr.map((item, i) => {
            const { id, title } = item;
            return (_jsxs("li", { className: 'filters__item', children: [_jsx("div", { className: "filters__check", onClick: () => { onRecommendParameters(id); }, children: good.recommendparameter[i] ? _jsx("img", { src: checked, alt: "checked" }) : null }), _jsx("span", { className: "filters__title", children: title })] }, id));
        });
        return (filtersList);
    };
    const renderParameters = (arr) => {
        const filtersList = arr.map((item, i) => {
            const { id, title } = item;
            // console.log(good.parameter)
            return (_jsxs("li", { className: 'parameters__item', children: [_jsx("div", { className: "parameters__check", onClick: () => { onParameters(id); }, children: good.parameter && good.parameter[i] ? _jsx("img", { src: checked, alt: "checked" }) : null }), _jsx("span", { className: "parameters__title", children: title })] }, id));
        });
        return (filtersList);
    };
    return (_jsxs(_Fragment, { children: [spinner, _jsxs("form", { className: "create-goods", id: "create-goods", ref: form, acceptCharset: 'utf-8', children: [_jsxs("div", { className: "create-goods__box", children: [_jsxs("div", { className: "create-goods__wrapper", children: [_jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0410\u0440\u0442\u0438\u043A\u0443\u043B" }), _jsx("input", { className: `input ${errors.article ? 'input--error' : ''}`, type: "text", name: "article", value: good.article, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.article })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430" }), _jsx("input", { className: `input ${errors.name ? 'input--error' : ''}`, type: "text", name: "name", value: good.name, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.name })] })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430" }), _jsx("textarea", { className: `input input--textarea ${errors.description ? 'input--error' : ''}`, name: "description", value: good.description, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.description })] }), _jsxs("label", { className: "create-goods__label create-goods__input", children: [_jsx("span", { children: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043E \u0442\u043E\u0432\u0430\u0440\u0435" }), _jsx("input", { className: '', type: "file", name: "pdfUrl", id: "pdf", onChange: handleChange, ref: fileInputPdf }), _jsx("button", { className: 'button', type: "button", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B" }), _jsx("img", { className: 'create-goods__image', src: fileImage, alt: "file_image" }), _jsx("span", { className: 'create-goods__image--span', children: imagePdf })] }), _jsxs("label", { className: "create-goods__label create-goods__input", children: [_jsx("span", { children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430" }), _jsx("input", { className: '', type: "file", name: "imageUrl", id: "file", onChange: handleChange, ref: fileInputMaterial }), _jsx("button", { className: 'button', type: "button", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0443" }), _jsx("img", { className: 'create-goods__image', src: fileImage, alt: "file_image" }), _jsx("span", { className: 'create-goods__image--span', children: imageMaterial })] }), _jsxs("label", { className: "create-goods__label create-goods__input", children: [_jsx("span", { children: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B" }), _jsx("input", { className: '', type: "file", name: "goodsPersonalImages", multiple: true, onChange: handleChange, ref: fileInputPersonal }), _jsx("button", { className: 'button', type: "button", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438" })] }), _jsx("div", { className: "create-goods__image-wrapper", children: imagesPersonal }), _jsxs("label", { className: "create-goods__label create-goods__input", children: [_jsx("span", { children: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B" }), _jsx("input", { className: '', type: "file", name: "goodsIndustrialImages", multiple: true, onChange: handleChange, ref: fileInputIndustrial }), _jsx("button", { className: 'button', type: "button", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B" })] }), _jsx("div", { className: "create-news__image-wrapper", children: imagesIndustrial })] }), _jsxs("div", { className: "create-goods__wrap", children: [_jsx("h3", { className: 'create-goods__title', children: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438" }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0422\u0438\u043F \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430" }), _jsx("input", { className: `input ${errors.type ? 'input--error' : ''}`, type: "text", name: "type", value: good.type, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0411\u0440\u0435\u043D\u0434" }), _jsx("input", { className: `input ${errors.brand ? 'input--error' : ''}`, type: "text", name: "brand", value: good.brand, onChange: handleChange }), _jsx("div", { className: 'error', children: errors.brand })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0426\u0432\u0435\u0442" }), _jsx("input", { className: `input ${errors.color ? 'input--error' : ''}`, type: "text", name: "color", value: good.color, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0422\u043E\u043B\u0449\u0438\u043D\u0430" }), _jsx("input", { className: `input ${errors.thickness ? 'input--error' : ''}`, type: "text", name: "thickness", value: good.thickness, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0422\u0438\u043F \u043B\u0430\u0439\u043D\u0435\u0440\u0430" }), _jsx("input", { className: `input ${errors.linertype ? 'input--error' : ''}`, type: "text", name: "linertype", value: good.linertype, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0422\u0438\u043F \u043E\u0441\u043D\u043E\u0432\u044B" }), _jsx("input", { className: `input ${errors.type ? 'input--error' : ''}`, type: "text", name: "basetype", value: good.basetype, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u041F\u043B\u043E\u0442\u043D\u043E\u0441\u0442\u044C" }), _jsx("input", { className: `input ${errors.dencity ? 'input--error' : ''}`, type: "text", name: "dencity", value: good.dencity, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B" }), _jsx("input", { className: `input ${errors.material ? 'input--error' : ''}`, type: "text", name: "material", value: good.material, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u041E\u0431\u044A\u0435\u043C" }), _jsx("input", { className: `input ${errors.volume ? 'input--error' : ''}`, type: "text", name: "volume", value: good.volume, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E" }), _jsx("input", { className: `input ${errors.pcs ? 'input--error' : ''}`, type: "text", name: "pcs", value: good.pcs, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0422\u0435\u043C\u043F. \u0443\u0441\u0442\u043E\u0439\u0447." }), _jsx("input", { className: `input ${errors.heatResistance ? 'input--error' : ''}`, type: "text", name: "heatresistance", value: good.heatresistance, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0420\u0430\u0437\u043C\u0435\u0440" }), _jsx("input", { className: `input ${errors.size ? 'input--error' : ''}`, type: "text", name: "size", value: good.size, onChange: handleChange })] }), _jsxs("label", { className: "create-goods__label", children: [_jsx("span", { children: "\u0422\u0438\u043F \u043A\u043B\u0435\u044F" }), _jsx("input", { className: `input ${errors.typeGlue ? 'input--error' : ''}`, type: "text", name: "typeglue", value: good.typeglue, onChange: handleChange })] })] }), _jsxs("div", { className: "create-goods__wrap create-goods__wrap--advantages", children: [_jsx("h3", { className: 'create-goods__title', children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430" }), advantagesList, _jsx("button", { className: 'button button--plus button--red', onClick: (e) => handleAddAdvantages(e), children: "+" })] }), _jsxs("div", { className: "create-goods__wrap", children: [_jsx("h3", { className: 'create-goods__title', children: "\u041A \u043A\u0430\u043A\u0438\u043C \u0433\u0440\u0443\u043F\u043F\u0430\u043C \u0442\u043E\u0432\u0430\u0440\u0430\u043C \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u0434\u0430\u043D\u043D\u044B\u0439 \u0442\u043E\u0432\u0430\u0440" }), _jsx(SetContent, { process: process, component: renderMainParameters(filtersData) })] }), _jsxs("div", { className: "create-goods__wrap", children: [_jsx("h3", { className: 'create-goods__title', children: "\u041A \u043A\u0430\u043A\u0438\u043C \u0433\u0440\u0443\u043F\u043F\u0430\u043C \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0439 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u0434\u0430\u043D\u043D\u044B\u0439 \u0442\u043E\u0432\u0430\u0440" }), _jsx(SetContent, { process: process, component: renderRecommendParameters(recommendData) })] }), _jsxs("div", { className: "create-goods__wrap", children: [_jsx("h3", { className: 'create-goods__title', children: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0442\u043E\u0432\u0430\u0440\u0430" }), _jsx("div", { className: "parameters", children: _jsx(SetContent, { process: process, component: renderParameters(parametersData) }) })] }), _jsxs("div", { className: "create-goods__btns", children: [_jsx("button", { type: "button", className: "create-goods__btn button button--orange", onClick: clearForm, children: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443" }), _jsx("button", { type: "button", className: "create-goods__btn button", disabled: checkForm(), onClick: (e) => {
                                    submitForm(e);
                                }, children: buttonTitle })] })] }), _jsx(ModalAlert, { showAlert: showAlert, setShowAlert: setShowAlert, message: textAlert, alertConfirm: () => console.log('alert') })] }));
};
export default GoodsForm;
