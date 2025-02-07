import { Route, Routes } from "react-router-dom";
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



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




const Main = () =>  {
    const navigate = useNavigate();
    function getCookie(name: string): string | undefined {
        const matches = document.cookie.match(
          new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+\-^])/g, '\\$1') + '=([^;]*)')
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
      
    const myCookieValue = getCookie('userName');
   
    
    const logOut = () => {
        Cookies.remove('userName');
        Cookies.remove('token');
        Cookies.remove('refresh_token');
        
        navigate('/');
        window.location.reload();
    }
   return (
        <div className="main">
            <div className="navigation">
                <div className="navigation__top">
                    <img className="navigation__logo" src={logo} alt="logo" />
                    <div className="navigation__user">
                        <div className="navigation__name">{myCookieValue ? myCookieValue : 'Admin'}</div>
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
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/news">
                            Новости
                        </NavLink>
                    </li>
                    <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/goods">
                            Товары
                        </NavLink>
                        <li className="navigation__item">
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/sout">
                            СОУТ
                        </NavLink>
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/persons">
                           Сотрудники
                        </NavLink>
                        {/* <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/create-company">
                           Создать компанию
                        </NavLink> */}
                        <NavLink className={({ isActive }) => (`navigation__link ${isActive ? 'active' : ''}`)} to="/edit-company">
                           Редактировать компанию
                        </NavLink>
                    </li>
                    </li>
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
                    <Route path="/edit-sertifications/:id" element={<EditSertification />}/>
                    <Route path="/create-sertifications" element={<CreateSertificate />}/>
                    <Route path="/news" element={<News />}/>
                    <Route path="/edit-news/:id" element={<EditNews />}/>
                    <Route path="/create-news" element={<CreateNews />}/>
                    <Route path="/goods" element={<Goods />}/>
                    <Route path="/edit-goods/:id" element={<EditGood />}/>
                    <Route path="/create-goods" element={<CreateGoods />}/>
                    <Route path="/sout" element={<Sout />}/>
                    <Route path="/edit-sout/:id" element={<EditSout />}/>
                    <Route path="/create-sout/" element={<CreateSout />}/>
                    <Route path="/persons/" element={<Persons />}/>
                    <Route path="/edit-person/:id" element={<EditPerson />}/>
                    <Route path="/create-person" element={<CreatePerson />}/>
                    <Route path="/create-company" element={<CreateCompany />}/>
                    <Route path="/edit-company" element={<EditCompany />}/>
                  
                </Routes>
            </div>
        </div>
   )
}

export default Main;