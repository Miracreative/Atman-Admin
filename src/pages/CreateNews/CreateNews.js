import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import NewsForm from '../../components/NewsForm/NewsForm';
const CreateNews = () => {
    const [news, setNews] = useState({
        id: 0,
        title: '',
        content: '',
        descr: '',
        imagessrc: [],
        files: ''
    });
    const form = useRef(0);
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C", children: null, showBackBtn: false }), _jsx(NewsForm, { news: news, setNews: setNews, buttonTitle: "\u0421\u043E\u0437\u0430\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C", form: form })] }));
};
export default CreateNews;
