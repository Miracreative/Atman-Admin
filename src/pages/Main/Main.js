import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';
import AdminPanel from "../AdminPanel/AdminPanel";
import Admins from "../Admins/Admins";
import CreateAdmin from '../CreateAdmin/CreateAdmin';
import EditAdmin from "../EditAdmin/EditAdmin";
import Knowlege from "../Knowlege/Knowlege";
import CreateKnowlege from "../CreateKnowlege/CreateKnowlege";
import EditKnowlege from "../EditKnowlege/EditKnowlege";
import Sertifications from "../Sertifications/Sertifications";
import EditSertification from "../EditSertification/EditSertification";
import CreateSertificate from "../CreateSertificate/CreateSertificate";
import News from "../News/News";
import EditNews from "../EditNews/EditNews";
import CreateNews from "../CreateNews/CreateNews";
import Goods from "../Goods/Goods";
import EditGood from "../EditGoods/EditGoods";
import CreateGoods from "../CreateGoods/CreateGoods";
import Sout from "../Sout/Sout";
import EditSout from "../EditSout/EditSout";
import CreateSout from "../CreateSout/CreateSout";
import Persons from "../Persons/Persons";
import EditPerson from "../EditPerson/EditPerson";
import CreatePerson from "../CreatePerson/CreatePerson";
import CreateCompany from "../CreateCompany/CreateCompany";
import EditCompany from "../EditCompany/EditCompany";
import './_main.scss';
import logo from './../../assets/icons/logo.svg';
const Main = () => {
    const navigate = useNavigate();
    const { name } = JSON.parse(window.sessionStorage.getItem('admin') || '""');
    useEffect(() => {
        // getAllGoods().then(res => {
        //     console.log(res)
        // });
    }, []);
    const logOut = () => {
        window.sessionStorage.clear();
        navigate('/');
        window.location.reload();
    };
    return (_jsxs("div", { className: "main", children: [_jsxs("div", { className: "navigation", children: [_jsxs("div", { className: "navigation__top", children: [_jsx("img", { className: "navigation__logo", src: logo, alt: "logo" }), _jsx("div", { className: "navigation__user", children: _jsx("div", { className: "navigation__name", children: name ? name : 'Admin' }) })] }), _jsxs("ul", { className: "navigation__list", children: [_jsx("li", { className: "navigation__item", children: _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/admins-list", children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0410\u0434\u043C\u0438\u043D\u043E\u0432" }) }), _jsx("li", { className: "navigation__item", children: _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/admins-create", children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u0434\u043C\u0438\u043D\u0430" }) }), _jsx("li", { className: "navigation__item", children: _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/knowledge-list", children: "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439" }) }), _jsx("li", { className: "navigation__item", children: _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/sertifications-list", children: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u044B" }) }), _jsx("li", { className: "navigation__item", children: _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/news", children: "\u041D\u043E\u0432\u043E\u0441\u0442\u0438" }) }), _jsxs("li", { className: "navigation__item", children: [_jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/goods", children: "\u0422\u043E\u0432\u0430\u0440\u044B" }), _jsxs("li", { className: "navigation__item", children: [_jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/sout", children: "\u0421\u041E\u0423\u0422" }), _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/persons", children: "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438" }), _jsx(NavLink, { className: ({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`), to: "/edit-company", children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E" })] })] })] }), _jsx("div", { className: "navigation__bottom", children: _jsx(NavLink, { to: "/", className: "navigation__exit", children: _jsx("button", { className: "navigation__logout", onClick: logOut, children: "\u0412\u044B\u0445\u043E\u0434" }) }) })] }), _jsx("div", { className: "content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(AdminPanel, {}) }), _jsx(Route, { path: "/admins-list", element: _jsx(Admins, {}) }), _jsx(Route, { path: "/admins-create", element: _jsx(CreateAdmin, {}) }), _jsx(Route, { path: "/edit-admin/:id", element: _jsx(EditAdmin, {}) }), _jsx(Route, { path: "/knowledge-list", element: _jsx(Knowlege, {}) }), _jsx(Route, { path: "/create-knowlege", element: _jsx(CreateKnowlege, {}) }), _jsx(Route, { path: "/edit-knowlege/:id", element: _jsx(EditKnowlege, {}) }), _jsx(Route, { path: "/sertifications-list", element: _jsx(Sertifications, {}) }), _jsx(Route, { path: "/edit-sertifications/:id", element: _jsx(EditSertification, {}) }), _jsx(Route, { path: "/create-sertifications", element: _jsx(CreateSertificate, {}) }), _jsx(Route, { path: "/news", element: _jsx(News, {}) }), _jsx(Route, { path: "/edit-news/:id", element: _jsx(EditNews, {}) }), _jsx(Route, { path: "/create-news", element: _jsx(CreateNews, {}) }), _jsx(Route, { path: "/goods", element: _jsx(Goods, {}) }), _jsx(Route, { path: "/edit-goods/:id", element: _jsx(EditGood, {}) }), _jsx(Route, { path: "/create-goods", element: _jsx(CreateGoods, {}) }), _jsx(Route, { path: "/sout", element: _jsx(Sout, {}) }), _jsx(Route, { path: "/edit-sout/:id", element: _jsx(EditSout, {}) }), _jsx(Route, { path: "/create-sout/", element: _jsx(CreateSout, {}) }), _jsx(Route, { path: "/persons/", element: _jsx(Persons, {}) }), _jsx(Route, { path: "/edit-person/:id", element: _jsx(EditPerson, {}) }), _jsx(Route, { path: "/create-person", element: _jsx(CreatePerson, {}) }), _jsx(Route, { path: "/create-company", element: _jsx(CreateCompany, {}) }), _jsx(Route, { path: "/edit-company", element: _jsx(EditCompany, {}) })] }) })] }));
};
export default Main;
