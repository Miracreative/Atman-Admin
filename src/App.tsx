import Main from "./pages/Main/Main";
import { useState, useEffect, useCallback } from "react";
import Spinner from './components/Spinner/Spinner';
import Login from "./components/Login/Login";
import Recovery from "./pages/Recovery/Recovery.tsx";
import Password from "./pages/Password/Password.tsx";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isLogIn, setUser } from './redux/slices/authSlice';
import { AuthState } from './redux/types/authTypes'; 
import { RootState } from './redux/types/reduxTypes';
import {auth, checkAuth} from './hooks/http.hook.tsx';
import ModalAlert from "./components/ModalAlert/ModalAlert.tsx";
import "./scss/app.scss"

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  const [textAlert, setTextAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const isAuth = useSelector((state: RootState) => state.auth.isLoggedIn);
  interface CookieOptions {
    expires?: Date | string | number; // Может быть Date, строкой или количеством секунд
    path?: string;
    domain?: string;
    secure?: boolean;
    "max-age"?: number;
    samesite?: 'strict' | 'lax' | 'none';
    [key: string]: any; // Для дополнительных опций
  }

  function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+\-^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
 
  
  function setCookie(name: string, value: string, options: CookieOptions = {}): void {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (const optionKey in options) {
      if (!options.hasOwnProperty(optionKey)) {
        continue;
      }
  
      updatedCookie += "; " + optionKey;
  
      let optionValue = options[optionKey];
  
      if (optionValue !== true) {
        if (optionKey === 'expires' && optionValue instanceof Date) {
          optionValue = optionValue.toUTCString();
        }
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

  useEffect(() => {
    const handleWheel = (e: any) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  useEffect(() => {
    const refreshToken = getCookie('refresh_token');
    if (refreshToken) {
      checkAuth().then(response => {
        setCookie('token', `${response.token}`, {
          'max-age': 3600,   
          path: '/',         
          secure: true,       
          samesite: 'lax'     
        });
        setCookie('userName', `${response.user_name}`, {
          'max-age': 7200,   
          path: '/',         
          secure: true,      
          samesite: 'lax' 
        });
        setCookie('role', `${response.role}`, {
          'max-age': 7200,   
          path: '/',         
          secure: true,      
          samesite: 'lax' 
        });
        dispatch(isLogIn(true))
        dispatch(setUser(response.user_name))
      });
    }
  }, [])

  const login = (logName:string, password:string) => {
    setLoading(true);
    auth(logName, password)
      .then(response => {
        
        if(response.status === 200) {
          setCookie('userName', `${response.data.user_name}`, {
            'max-age': 7200,   
            path: '/',         
            secure: true,    
            samesite: 'lax'     
          });
          setCookie('token', `${response.data.token}`, {
            'max-age': 3600,  
            path: '/',        
            secure: true,       
            samesite: 'lax'   
          });
          setCookie('refresh_token', `${response.data.refresh_token}`, {
            'max-age': 7200,   
            path: '/',         
            secure: true,       
            samesite: 'lax'     
          });
          setCookie('role', `${response.data.role}`, {
            'max-age': 7200,   
            path: '/',         
            secure: true,      
            samesite: 'lax' 
          });
          dispatch(isLogIn(true)) 
          dispatch(setUser(response.data.user_name))
        } else {
          setTextAlert(response.data.message)
          setShowAlert(true)
          console.log(showAlert)
        }
      })
      .catch(() => {
          setTextAlert('Что-то пошло не так')
          setShowAlert(true)
      })
      .finally (() => {setLoading(false);
        console.log(showAlert)
      })
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
          <Route path="/recovery/" element={<Recovery />} />
          <Route path="/password/:token" element={<Password />} />
        </Routes>
        <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
     </>
    )
  }
}
