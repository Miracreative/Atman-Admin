import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import GoodsForm from '../../components/GoodsForm/GoodsForm';
const CreateGoods = () => {
    const [good, setGood] = useState({
        imageurl: '',
        material: '',
        goodspersonalimages: [],
        goodsindustrialimages: [],
        parameter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mainparameter: [0, 0, 0, 0, 0, 0, 0, 0],
        recommendparameter: [0, 0, 0, 0, 0, 0, 0, 0],
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
        dencity: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0442\u043E\u0432\u0430\u0440", children: null, showBackBtn: false }), _jsx(GoodsForm, { good: good, setGood: setGood, buttonTitle: "\u0421\u043E\u0437\u0430\u0434\u0430\u0442\u044C \u0442\u043E\u0432\u0430\u0440", form: form })] }));
};
export default CreateGoods;
