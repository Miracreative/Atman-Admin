import Main from "./pages/Main/Main";
import { useState, useEffect, useCallback } from "react";
import Spinner from './components/Spinner/Spinner';
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isLogIn, setUser } from './redux/slices/authSlice.tsx';
import {auth, checkAuth} from './hooks/http.hook';
import "./scss/app.scss"

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const isAuth = useSelector(state => state.auth.auth);
  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
        .then(response => {
          console.log(response );
          
        // localStorage.setItem('token', response.token)
        // dispatch(isLogIn(true))
        // нужно имя пользователя
      });
    }
  }, [])

  const login = (logName:string, password:string) => {
    setLoading(true);
    auth(logName, password)
      .then(response => {
        console.log(response);
        
        if(response.status === 200) {
          localStorage.setItem('token', response.data.token)
          dispatch(isLogIn(true))
          dispatch(setUser(response.data.user_name))
          // нужно имя пользователя
        } else {
          throw new Error("Ошибка!");
        }
      })
      .catch(error => console.log('catch', error))
      .finally (() => setLoading(false))

    //для локальной разработки

    // request(undefined, {
    //     "command": "auth.authorization",
    //     "logName": logName,
    //     "password": pass
    //   })
    //     .then(res => {
    //       ///получаем ошибку
    //       if (res.status === "2") {
    //         //Вывод ошибки авторизации о некорректных данных
    //       }

    //       ///если все хорошо
    //       if (res.status === "1") {
            
    //         dispatch(isLogIn(true));
    //         window.sessionStorage.setItem('isLogin', 'true')
    //         window.sessionStorage.setItem('admin', JSON.stringify({name: res.message[0].name, login: logName}))
    //       }

    //       isLoaded()
    //     })
  }

  let spinner;

  loading ? spinner = <Spinner active={true} /> : spinner = <Spinner active={false} />

  if (isAuth) {
    return (
      <>
        {spinner}
        <Main />
    </>
    )
  } else {
    return (
       <>
        {spinner}
        <Routes >
          <Route path="/" element={<Login login={login} loginError={loadingError} />} />
          {/* <Route path="/recovery/" element={<Recovery />} /> */}
        </Routes>
     </>
    )
  }
}
