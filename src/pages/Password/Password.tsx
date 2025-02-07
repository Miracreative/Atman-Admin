import {useLayoutEffect, useState, useRef} from "react";
import {useParams } from 'react-router-dom';
import generatePass from '../../services/GeneratePass';
import title from './../../assets/icons/logo-atman.svg';
import unsecret from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import {pass, editAdmin} from './../../hooks/http.hook';
import Spinner from "../../components/Spinner/Spinner";
import "./_password.scss";

const Password = () => {
    const {token}  =  useParams();
    const [admin, setAdmin] = useState({
        role: '',
        password:'',
        name: '',
        email: '',
        id: 0
    })
    const [password, setPassword] = useState({
        password: '',
        repeatPass: ''
    });

    useLayoutEffect(() => {
        document.title = "Смена пароля - ATMAN Admin";
        pass(token).then((res: any) => {
           setAdmin({...res, password: password.password})
            if(res.code !== 1) {
                setTextAlert(res.message)
                setShowAlert(true)
            }
        }).catch(() => {
            setTextAlert('Что-то пошло не так')
            setShowAlert(true)
        })
    }, [])

   
    const [loading, setLoading] = useState(false)
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    const [textAlert, setTextAlert] = useState<string>('');
    let spinner;

    loading ? spinner = <Spinner active={true}/> : spinner = <Spinner active={false} />

    const button = useRef<any>(0);

    const [errors, setErrors] = useState<any>({});
    const [showPass, setShowPass] = useState({
        password: false,
        repeatPass: false
    });
	const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			name: '',
			email: '',
			password: '',
			repeatPassword: ''
		};

		switch(inputName) {
		case 'password':
			if (inputValue.length < 6) {
			error.password = "Пароль очень короткий";
			} else {
			error.password = "";
			}
			break;
		case 'repeatPass':
			if (inputValue !== password.password) {
			error.repeatPassword = "Пароли не совпадают";
			} else {
			error.repeatPassword = "";
			}
			break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

	const checkForm = () => {
		if (password && password.repeatPass) {
		for (let key in errors) {
			if (errors[key] !== '') {
			return true
			}
		}
		return false
		}
		return true
	}


	const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setPassword((state: any) => ({...state, [name]: value}))
        setAdmin(state => ({...state, [name]: value}));
		setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
	}



    const sendNewPassword = (admin: {
        name: string,
        email: string,
        role: string,
        password: string,
        id: number
    }) => {
        // setLoading(true);
        // setAdmin(state => ({...state, password: password.password}))
        console.log(admin)
        editAdmin(admin).then(() => {
            setLoading(false);
            setTextAlert('Письмо отправлено, пароль изменен');
            setShowAlert(true);
        }).catch((e) => {
            console.log(e)
            setTextAlert('Письмо не отправлено');
            setShowAlert(true);
            setLoading(false);
        })
    }


    return (
        <div className="recovery__container">
            <div className="recovery__wrapper">
                <div className="title">
                    <img src={title} alt="tummies"/>
                </div>
                <p className="subtitle">Создание нового пароля</p>
            </div>
            
            <form className="login__form">
                {spinner}
                <label className="label label--pass">
				<span>Пароль</span>
				<input className={`input ${errors.password ? 'input--error' : ''}`} name="password"
				type={showPass.password ? 'text' : 'password'}
				value={password.password}
				autoComplete='off'
				onChange={handleChange}/>
				<div className='error'>{errors.password}</div>
				<img
				onClick={() => setShowPass(state => ({...state, password: !state.password}))}
				src={showPass.password ? unsecret : secret}
				alt="show pass"/>
				<button className="create-admin__gen" type="button"
				onClick={() => {
					setPassword((state: any) => ({...state, password: generatePass()}))
					setErrors((state: any) => ({...state, password: ''}))
				}}>
					Кликните здесь, чтобы создать пароль автоматически
				</button>
			</label>
            <label className="label label--pass">
				<span>Повторите пароль</span>
				<input className={`input ${errors.repeatPassword ? 'input--error' : ''}`} name="repeatPass"
				type={showPass.repeatPass ? 'text' : 'password'}
				value={password.repeatPass}
				autoComplete='off'
				onChange={handleChange}/>
				<div className='error'>{errors.repeatPassword}</div>
				<img
				onClick={() => setShowPass(state => ({...state, repeatPass: !state.repeatPass }))}
				src={showPass.repeatPass ? unsecret : secret}
				alt="show pass"/>
			</label>
            <button 
                    ref={button}
                    className="button" 
                    type="button"
                    disabled={checkForm()}
                    onClick={() => sendNewPassword(admin)}
                    >Создать новый пароль</button>
            </form>
            <ModalAlert alertBtnOpacity showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => setShowAlert(false)} />
        </div>
    )
}



export default Password; 
