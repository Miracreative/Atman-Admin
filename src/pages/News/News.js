import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllNews, getSearchNews } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_news.scss';
const News = () => {
    const [news, setNews] = useState([]);
    const [process, setProcess] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchForBackend, setSearchForBackend] = useState('');
    const inputRef = useRef(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getNews(currentPage);
        inputRef.current?.focus();
    };
    const updateSearchValue = useCallback(debounce((str) => {
        setSearchForBackend(str);
    }, 1000), []);
    const changePage = (step) => {
        getNews(+currentPage + step);
        setCurrentPage(state => +state + step);
    };
    const getNews = (currentPage) => {
        getAllNews(currentPage).then(res => {
            setNews(res.result);
            setTotalPages(res.pages);
        }).then(() => { setProcess('confirmed'); });
    };
    useEffect(() => {
        getNews(currentPage);
    }, []);
    useEffect(() => {
        if (searchForBackend == '') {
            getNews(currentPage);
        }
        else {
            getSearchNews(searchForBackend).then(res => {
                setNews(res);
                setTotalPages(1);
            }).then(() => { setProcess('confirmed'); });
        }
    }, [searchForBackend]);
    const onSearch = (e) => {
        setSearch(e.target.value);
        updateSearchValue(e.target.value);
    };
    const renderItems = (arr) => {
        const newsList = arr.map((item, i) => {
            const { id, title, content, imagessrc } = item;
            const imagesItems = (arr) => {
                const images = arr.map((_, i) => {
                    return (_jsx("img", { src: fileImage, alt: "image" }, i));
                });
                return (images);
            };
            return (_jsxs("li", { className: 'rows-list__box news__box', children: [_jsx("span", { children: i + 1 }), _jsx("span", { children: title }), _jsx("span", { children: content }), _jsx("span", { children: imagesItems(imagessrc) }), _jsx(Link, { className: "rows-list__btn button button--red  news__btn", to: `/edit-news/${id}`, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] }, id));
        });
        return (_jsx("ul", { className: "rows-list", children: newsList }));
    };
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u041D\u043E\u0432\u043E\u0441\u0442\u0438", children: _jsxs("div", { className: "search", children: [_jsx("input", { type: "text", ref: inputRef, placeholder: "Search", value: search, onChange: (e) => onSearch(e) }), search && _jsx("img", { onClick: onClickClear, src: attention, alt: "search" })] }), showBackBtn: false }), news?.length > 0 ? _jsx(SetContent, { process: process, component: renderItems(news) }) :
                _jsx("li", { className: 'news__box', children: _jsx("p", { children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443" }) }), _jsxs("div", { className: "news__wrapper", children: [_jsx(Link, { className: "button  news__btn news__btn--add", to: `/create-news/`, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u044C" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, changePage: changePage, setFlag: () => console.log(true) })] })] }));
};
export default News;
