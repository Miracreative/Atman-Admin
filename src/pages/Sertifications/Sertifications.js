import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllSertifications, getSearchSertifications } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_sertifications.scss';
const Sertifications = () => {
    const [sertifications, setSertifications] = useState([]);
    const [process, setProcess] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchForBackend, setSearchForBackend] = useState('');
    const inputRef = useRef(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getSertifications(currentPage);
        inputRef.current?.focus();
    };
    const updateSearchValue = useCallback(debounce((str) => {
        setSearchForBackend(str);
    }, 1000), []);
    const changePage = (step) => {
        getSertifications(+currentPage + step);
        setCurrentPage(state => +state + step);
    };
    const getSertifications = (currentPage) => {
        getAllSertifications(currentPage).then(res => {
            setSertifications(res.result);
            setTotalPages(res.pages);
        }).then(() => { setProcess('confirmed'); });
    };
    useEffect(() => {
        getSertifications(currentPage);
    }, []);
    useEffect(() => {
        if (searchForBackend == '') {
            getSertifications(currentPage);
        }
        else {
            getSearchSertifications(searchForBackend).then(res => {
                console.log(res);
                setSertifications(res);
                setTotalPages(1);
            }).then(() => { setProcess('confirmed'); });
        }
    }, [searchForBackend]);
    const onSearch = (e) => {
        setSearch(e.target.value);
        updateSearchValue(e.target.value);
    };
    const renderItems = (arr) => {
        const sertificationsList = arr.map((item, i) => {
            const { id, title } = item;
            return (_jsxs("li", { className: 'rows-list__box sertifications__box', children: [_jsx("span", { children: i + 1 }), _jsx("span", { children: title }), _jsxs("span", { children: [_jsx("img", { src: fileImage, alt: "file" }), _jsx("span", { children: "\u0424\u0430\u0439\u043B \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u0430" })] }), _jsx(Link, { className: "rows-list__btn button button--red  sertifications__btn", to: `/edit-sertifications/${id}`, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] }, id));
        });
        return (_jsx("ul", { className: "rows-list", children: sertificationsList }));
    };
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B", children: _jsxs("div", { className: "search", children: [_jsx("input", { type: "text", ref: inputRef, placeholder: "Search", value: search, onChange: (e) => onSearch(e) }), search && _jsx("img", { onClick: onClickClear, src: attention, alt: "search" })] }), showBackBtn: false }), sertifications?.length > 0 ? _jsx(SetContent, { process: process, component: renderItems(sertifications) }) :
                _jsx("li", { className: 'sertifications__box', children: _jsx("p", { children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443" }) }), _jsxs("div", { className: "sertifications__wrapper", children: [_jsx(Link, { className: "button  sertifications__btn sertifications__btn--add", to: `/create-sertifications/`, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, changePage: changePage, setFlag: () => console.log(true) })] })] }));
};
export default Sertifications;
