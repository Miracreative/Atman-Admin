import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllGoods } from "../../hooks/http.hook";


import AdminPanel from "../AdminPanel/AdminPanel";
import Admins from "../Admins/Admins";
import CreateAdmin from '../CreateAdmin/CreateAdmin'
// import AdminList from "../AdminsList/AdminsList";
// import Transaction from "../Transaction/Transaction";
// import DishList from "../DishList/DishList";
// import EditDish from "../EditDish/EditDish";
// import CreateDish from "../CreateDish/CreateDish";
// import MainSlider from "../MainSlider/MainSlider";
// import Rate from "../Rate/Rate";
// import Youtube from "../Youtube/Youtube";
// import Children from "../Children/Children";
// import EditChild from "../EditChild/EditChild";
// import Parents from "../Parents/Parents";
// import EditParent from "../EditParent/EditParent";
// import OrderList from "../OrderList/OrderList";
// import Order from "../Order/Order";
// import Kitchen from "../Kitchen/Kitchen";
// import Promocode from "../Promocode/Promocode";
// import Settings from "../Settings/Settings";

// import Editor from "../Editor/Editor";
import './_main.scss'

import logo from './../../assets/icons/logo.svg';




const Main = () =>  {
    const navigate = useNavigate();
    const {name} = JSON.parse(window.sessionStorage.getItem('admin') || '""')
    useEffect(() => {
        // getAllGoods().then(res => {
        //     console.log(res)
        // });
    }, [])
    
    const logOut = () => {
        window.sessionStorage.clear();
        navigate('/');
        window.location.reload();
    }
   return (
        <div className="main">
            <div className="navigation">
                <div className="navigation__top">
                    <img className="navigation__logo" src={logo} alt="logo" />
                    <div className="navigation__user">
                        <div className="navigation__name">{name ? name : 'to A'}</div>
                        {/* <div className="navigation__login">{login}</div> */}
                    </div>
                </div>
                <ul className="navigation__list">
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/admins-list">
                            Список Админов
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/admins-create">
                            Создать админа
                        </NavLink>
                    </li>
                    {/* <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/admins-list">
                            List of admins
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/transaction">
                            Transaction
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/dish-list">
                            Meals
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/rate">
                            Prices
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/main-slider">
                            Main Slider
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/youtube">
                            Entertainment
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/catering">
                            Catering
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/children">
                            Children
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/parents">
                            Parents
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/order-list">
                            List of orders
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/kitchen">
                            Kitchen
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/promocode">
                            Promo codes
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/settings">
                            Settings
                        </NavLink>
                    </li> */}
                </ul>
                <div className="navigation__bottom">
                    <NavLink to="/" className="navigation__exit">
                        <button className="navigation__logout" onClick={logOut}>
                            Выход
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className="content">
                <Routes>
                    <Route path="/" element={<AdminPanel/>}/>
                    <Route path="/admins-list" element={<Admins/>}/>
                    <Route path="/admins-create" element={<CreateAdmin/>}/>
                </Routes>
            </div>
        </div>
   )
}

export default Main;