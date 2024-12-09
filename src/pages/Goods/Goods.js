import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllGoods, getSearchGoods, getGoodsOnMainParameters } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import Spinner from "../../components/Spinner/Spinner";
import attention from "../../assets/icons/attention.svg";
import checked from "./../../assets/icons/checked.svg";
import { filtersData } from "../../data";
import './_goods.scss';
const Goods = () => {
    const [goods, setGoods] = useState([]);
    // const [favourites, setFavourites] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    // const [isFavourite, setIsFavourite] = useState<any[]>([])
    const [process, setProcess] = useState('loading');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchForBackend, setSearchForBackend] = useState('');
    const [filterArray, setFilterArray] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [parametersForBackend, setParametersForBackend] = useState([]);
    const [checkedAll, setCheckedAll] = useState(true);
    let spinner = loading ? _jsx(Spinner, { active: true }) : null;
    const inputRef = useRef(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getGoods(currentPage);
        inputRef.current?.focus();
    };
    const updateSearchValue = useCallback(debounce((str) => {
        setSearchForBackend(str);
    }, 1000), []);
    const updateParameters = useCallback(debounce((filters) => {
        setParametersForBackend(filters);
    }, 1000), []);
    const changePage = (step) => {
        getGoods(+currentPage + step);
        setCurrentPage(state => +state + step);
    };
    const getGoods = (currentPage) => {
        setSearch('');
        setLoading(true);
        setSearchForBackend('');
        setCheckedAll(true);
        getAllGoods(currentPage).then(response => {
            setGoods(response.result);
            setTotalPages(response.pages);
        }).then(() => getAllGoods(currentPage).then(response => {
            setGoods(response.result);
        }).then(() => {
            setProcess('confirmed');
            setFlag(true);
            setLoading(false);
        }));
        // .then(
        //     () => getAllFavouriteGoods().then(res => {
        //         setFavourites(res.favourite);
        //         // createIsFavouritesArray(res.favourite)
        //     }).then(
        //         () => getAllGoods(currentPage).then(response => {
        //             setGoods(response.result) 
        //         }).then(
        //             () => {setProcess('confirmed');
        //                 setFlag(true);
        //                 setLoading(false)
        //             }
        //         )
        //     )
        // )
    };
    const getSearch = (searchForBackend) => {
        setLoading(true);
        setCheckedAll(false);
        getSearchGoods(searchForBackend).then(res => {
            setGoods(res);
            setTotalPages(1);
        }).then(() => {
            setProcess('confirmed');
            setLoading(false);
        });
        // .then(
        //     () => getAllFavouriteGoods().then(res => {
        //         setFavourites(res.favourite);
        //         // createIsFavouritesArray(res.favourite)
        //     }).then(
        //         () => {setProcess('confirmed');
        //             setLoading(false)
        //         }
        //     )
        // )
    };
    const getParameters = (parametersForBackend) => {
        setCheckedAll(false);
        setSearch('');
        setSearchForBackend('');
        getGoodsOnMainParameters(parametersForBackend).then(res => {
            setGoods(res);
            setTotalPages(1);
        }).then(() => {
            setProcess('confirmed');
            setLoading(false);
            setCheckedAll(false);
        });
        // .then(
        //     () => getAllFavouriteGoods().then(res => {
        //         setFavourites(res.favourite);
        //         // createIsFavouritesArray(res.favourite)
        //         // setFlag(!flag);
        //     }).then(
        //         () => {setProcess('confirmed');
        //             setLoading(false);
        //             setCheckedAll(false);
        //         }
        //     )
        // )
    };
    // const createIsFavouritesArray = (favourites: any) => {
    //     let arr:Boolean[] = [];
    //     let favorietsId:number[] = [];
    //     favourites?.forEach((item: {good_id: number}) => {
    //         favorietsId.push(item.good_id)
    //     })
    //     goods?.forEach((good: {id:number}) => {
    //         if(favorietsId.indexOf(good.id) != -1) {
    //             arr.push(true)
    //         } else {
    //             arr.push(false)
    //         }
    //     })
    //     setIsFavourite(arr)
    // }
    const changeFlag = () => {
        setCheckedAll(true);
        setFlag(flag => !flag);
    };
    useEffect(() => {
        if (search == '' && checkedAll) {
            getGoods(currentPage);
        }
        else if (search == '' && !checkedAll) {
            getParameters(parametersForBackend);
        }
        else {
            getSearch(searchForBackend);
        }
    }, [searchForBackend, parametersForBackend, flag]);
    const onSearch = (e) => {
        setSearch(e.target.value);
        updateSearchValue(e.target.value);
    };
    // const handleChangeIsFavourite = (i: number, favourite: boolean, id:number) => {
    //     favourite ? (
    //         deleteFavourite(id)
    //     ) : (
    //         createFavourite(id)
    //     )
    //     const newFavourite = isFavourite;
    //     let newItem;
    //     if(newFavourite[i] == true) {
    //         newItem = false
    //     } else {
    //         newItem = true
    //     }
    //     let newArr = [...newFavourite.slice(0, i), newItem, ...newFavourite.slice(i + 1, newFavourite.length)]
    //     setIsFavourite(newArr)
    // }
    const hendleChoiseAllGoods = () => {
        onClickClear();
        setCheckedAll(true);
        setFilterArray([0, 0, 0, 0, 0, 0, 0, 0]);
    };
    const renderItems = (arr) => {
        const goodsList = arr.map((item, i) => {
            const { id, name, description } = item;
            return (_jsxs("li", { className: 'rows-list__box goods__box', children: [_jsx("span", { children: i + 1 }), _jsx("span", { children: name }), _jsx("span", { children: description }), _jsx(Link, { className: "rows-list__btn button button--red  goods__btn", to: `/edit-goods/${id}`, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] }, id));
        });
        return (_jsx("ul", { className: "rows-list", children: goodsList }));
    };
    const onFilters = (id) => {
        setCheckedAll(false);
        setFlag(flag => !flag);
        let newFilterArray = filterArray;
        let newItem;
        if (newFilterArray[id] == 1) {
            newItem = 0;
        }
        else {
            newItem = 1;
        }
        let newArr = [...newFilterArray.slice(0, id), newItem, ...newFilterArray.slice(id + 1, newFilterArray.length)];
        setFilterArray(newArr);
        updateParameters(newArr);
        setFlag(flag => !flag);
    };
    const renderFilterPanel = (arr) => {
        const filtersList = arr.map((item, i) => {
            const { id, title } = item;
            return (_jsxs("li", { className: 'filters__item', children: [_jsx("div", { className: "filters__check", onClick: () => { onFilters(id); }, children: filterArray[i] ? _jsx("img", { src: checked, alt: "checked" }) : null }), _jsx("span", { className: "filters__title", children: title })] }, id));
        });
        return (filtersList);
    };
    return (_jsxs(_Fragment, { children: [_jsx(PanelHeader, { title: "\u0422\u043E\u0432\u0430\u0440\u044B", children: _jsxs("div", { className: "search", children: [_jsx("input", { type: "text", ref: inputRef, placeholder: "Search", value: search, onChange: (e) => onSearch(e) }), search && _jsx("img", { onClick: onClickClear, src: attention, alt: "search" })] }), showBackBtn: false }), spinner, _jsxs("ul", { className: "filters", children: [_jsxs("li", { className: 'filters__item', children: [_jsx("div", { className: "filters__check", onClick: () => { hendleChoiseAllGoods(); }, children: checkedAll ?
                                    _jsx("img", { src: checked, alt: "checked" }) : null }), _jsx("span", { className: "filters__title", children: "\u0412\u0441\u0435" })] }, 8), _jsx(SetContent, { process: process, component: renderFilterPanel(filtersData) })] }), goods?.length > 0 ? _jsx(SetContent, { process: process, component: renderItems(goods) }) :
                _jsx("li", { className: 'goods__box', children: _jsx("p", { children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443" }) }), _jsxs("div", { className: "goods__wrapper", children: [_jsx(Link, { className: "button  goods__btn goods__btn--add", to: `/create-goods/`, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, changePage: changePage, setFlag: changeFlag })] })] }));
};
export default Goods;
