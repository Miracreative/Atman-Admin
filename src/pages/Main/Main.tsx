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
                        <div className="navigation__name">{name ? name : 'Admin'}</div>
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
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/knowledge-list">
                            База знаний
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/sertifications-list">
                            Сертификаты
                        </NavLink>
                    </li>
                    {/* 
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
                    <Route path="/edit-admin/:id" element={<EditAdmin />}/>
                    <Route path="/knowledge-list" element={<Knowlege />}/>
                    <Route path="/create-knowlege" element={<CreateKnowlege />}/>
                    <Route path="/edit-knowlege/:id" element={<EditKnowlege />}/>
                    <Route path="/sertifications-list" element={<Sertifications />}/>
                </Routes>
            </div>
        </div>
   )
}

export default Main;