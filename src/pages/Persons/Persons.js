import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllPerson, getSearchPerson } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import Spinner from "../../components/Spinner/Spinner";
import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_persons.scss';
const Persons = () => {
    const [person, setPerson] = useState([]);
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchForBackend, setSearchForBackend] = useState('');
    const inputRef = useRef(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getPerson(currentPage);
        inputRef.current?.focus();
    };
    const updateSearchValue = useCallback(debounce((str) => {
        setSearchForBackend(str);
    }, 1000), []);
    const changePage = (step) => {
        getPerson(+currentPage + step);
        setCurrentPage(state => +state + step);
    };
    const getPerson = (currentPage) => {
        setLoading(true);
        getAllPerson(currentPage).then(res => {
            setPerson(res.result);
            setTotalPages(res.pages);
        }).then(() => {
            setProcess('confirmed');
            setLoading(false);
        });
    };
    useEffect(() => {
        getPerson(currentPage);
    }, []);
    useEffect(() => {
        if (searchForBackend == '') {
            getPerson(currentPage);
        }
        else {
            setLoading(true);
            getSearchPerson(searchForBackend).then(res => {
                setPerson(res);
                setTotalPages(1);
            }).then(() => { setProcess('confirmed'); setLoading(false); });
        }
    }, [searchForBackend]);
    const onSearch = (e) => {
        setSearch(e.target.value);
        updateSearchValue(e.target.value);
    };
    const renderItems = (arr) => {
        const personList = arr.map((item, i) => {
            const { id, name, watsapp, email } = item;
            return (_jsxs("li", { className: 'rows-list__box person__box', children: [_jsx("span", { children: i + 1 }), _jsx("span", { children: name }), _jsx("span", { children: email }), _jsx("span", { children: watsapp }), _jsx("span", { children: _jsx("img", { src: fileImage, alt: "file" }) }), _jsx(Link, { className: "rows-list__btn button button--red  person__btn", to: `/edit-person/${id}`, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] }, id));
        });
        return (_jsx("ul", { className: "rows-list", children: personList }));
    };
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438", children: _jsxs("div", { className: "search", children: [_jsx("input", { type: "text", ref: inputRef, placeholder: "Search", value: search, onChange: (e) => onSearch(e) }), search && _jsx("img", { onClick: onClickClear, src: attention, alt: "search" })] }), showBackBtn: false }), spinner, person?.length > 0 ? _jsx(SetContent, { process: process, component: renderItems(person) }) :
                _jsx("li", { className: 'person__box', children: _jsx("p", { children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443" }) }), _jsxs("div", { className: "person__wrapper", children: [_jsx(Link, { className: "button  person__btn person__btn--add", to: `/create-person/`, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, changePage: changePage, setFlag: () => console.log(true) })] })] }));
};
export default Persons;
