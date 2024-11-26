import Main from "./pages/Main/Main";
import { useState } from "react";
import Spinner from './components/Spinner/Spinner';
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { isLogIn } from './redux/slices/authSlice.tsx';
import {auth} from './hooks/http.hook';
import "./scss/app.scss"

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const isLoading = () => {
    setLoading(true);
  }

  const isLoaded = () => {
    setLoading(false);
  }
  const login = (logName:string, password:string) => {
    isLoading()
    auth(logName, password)

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

  if (!window.sessionStorage.getItem('isLogin')) {
    return (
      <>
        {spinner}
        <Routes >
          <Route path="/" element={<Login login={login} loginError={loadingError} />} />
          {/* <Route path="/recovery/" element={<Recovery />} /> */}
        </Routes>
      </>
    )
  } else {
    return (
      <>
        {spinner}
        <Main />
      </>

    )
  }
}
