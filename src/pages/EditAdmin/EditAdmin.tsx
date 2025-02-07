import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import generatePass from '../../services/GeneratePass';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';

import { getOneAdmin, deleteAdmin, editAdmin } from '../../hooks/http.hook';

import './_editAdmin.scss'

const EditAdmin = () => {

    
    const form = useRef<any>(null);
    const {id} = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    const [textAlert, setTextAlert] = useState<string>('');
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false)
    
    const [errors, setErrors] = useState<any>({});
    const [targetConfirm, setTargetConfirm] = useState({
        id: 0,
        name: '',
        email: '',
        role: '',
        password: ''
    });

    const [admin, setAdmin] = useState({
        id: 0,
        name: '',
        role: '',
        email: '',
        password: ''
    }); 


    const validateValues = (inputName:string, inputValue: string) => {

        let error = {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        };
    
        switch(inputName) {
            case 'name':
                if (inputValue.length < 2) {
                error.name = "Имя слишком короткое";
                } else {
                error.name = '';
                }
                break;
            case 'email':
                let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\.[a-z]{2,6}$/i;
                if (!emailRegExp.test(inputValue)) {
                error.email = "Email некорректный"
                } else {
                error.email = "";
                }
                break;
            case 'password':
                if (inputValue.length < 6) {
                error.password = "Пароль очень короткий";
                } else {
                error.password = "";
                }
                break;
            default:
                console.error('Чекнули тип админа');
        }
     
        return error;
      };

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        getOneAdmin(id).then(res => {
            if (res.status === 401) {
                console.log('Ошибка 401: Не авторизован');
                // window.location.href = '/login';
            } else {
                setAdmin(res)
                setAdmin(state => ({...state, password: 'введите новый пароль'}))
            }
        }).catch(() => {
            setTextAlert('У Вас нет прав находиться в этом разделе')
            setShowAlert(true)
            setTimeout(() =>  {
                setShowAlert(false)
                navigate('/');
            },1500)
        })
    }, []);

    const checkForm = () => {
        if (admin.name && admin.email && admin.password && admin.role) {
          for (let key in errors) {
            if (errors[key] !== '') {
              return true
            }
          }
          return false
        }
        return true
      }
//обработчик текстовых инпутов
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setAdmin(state => ({...state, [e.target.name]: e.target.value}));
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const onEditAdmin = (admin: {
        name: string,
        email: string,
        role: string,
        password: string,
        id: number
    }) => {
        setLoading(true);
        editAdmin(admin)
        .then((res) => {
            setDel(false)
            setLoading(false);
            setShowAlert(true);
            if(res.message) {
                setTextAlert(res.message);
            } else {
                setTextAlert('Данные были обновлены')
            }
        
        }).catch(() => {
            setLoading(false);
            setShowAlert(true)
            setTextAlert('Что-то пошло не так')
        }).finally(() => {
            setLoading(false);
            setShowAlert(true)
        })
    }
  
    
    const removeAdmin = (id: number) => {
        setShowConfirm(false);
        deleteAdmin(id)
        setDel(true)
        setShowAlert(true);
        setTextAlert('Админ успешно удален');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, name:string, email:string, role: string, password:string) => {
        setShowConfirm(true);
        setTargetConfirm({id, name, role, email, password})
    }

    let spinner = loading ? <Spinner active/> : null;

    return (
    <>
       <PanelHeader title="Редактировать админа" children={null} showBackBtn={true} />
       {spinner}
        <form className='parent-form' ref={form}>
            <div className='parent-form__inner'>
                <div className="parent-form__left">
                    
                </div>
            <div className="parent-form__right">
            <div className="parent-form__col-box">
                <div className="parent-form__col">
                    <label>
                        <span className='create-admin__label'>E-Mail</span>
                        <input className={`input ${errors.email ? 'input--error' : ''}`} type="text" name="email"
                        value={admin.email}
                        onChange={handleChange}/>
                        <div className='error'>{errors.email}</div>
                    </label>
                    <label>
                        <span className='create-admin__label'>Пароль</span>
                        <input className={`input ${errors.password ? 'input--error' : ''}`} name="password"
                        type={'password'}
                        value={admin.password}
                        autoComplete='off'
                        onChange={handleChange}/>
                        <div className='error'>{errors.password}</div>
                        <button className="create-admin__gen" type="button"
                        onClick={() => {
                            setAdmin((state: any) => ({...state, password: generatePass()}))
                            setErrors((state: any) => ({...state, password: ''}))
                        }}>
                            Кликните здесь, чтобы создать пароль автоматически
                        </button>
                    </label>

                </div>
                <div className="parent-form__col">

                <label>
                    <span className='create-admin__label'>Имя</span>
                    <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
                        value={admin.name} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.name}</div>
                    </label>

                </div>
            </div>
        
            <div className="parent-form__row">
            <div className="parent-form__payments">
                <label className="create-admin__label">
                    <span>Роль администратора</span>
                    <div className="create-admin__checkboxes">
                    <label className="create-admin__checkbox">
                    <input className="sr-only" type="radio" name="role" value="admin"
                    checked={admin.role === 'admin' ? true : false}
                    onChange={handleChange}/>
                    <span>Супер-админ</span>
                </label>
                <label className="create-admin__checkbox">
                    <input className="sr-only" type="radio" name="role" value="user"
                    checked={admin.role === 'user' ? true : false}
                    onChange={handleChange}/>
                    <span>Админ</span>
                    </label>
                    </div>
                </label>
            </div>
            </div>



        </div>
        </div>
        <div className="parent-form__btns">
        <button className='button button--red' type='button' onClick={() => onConfirmDelete(admin.id, admin.name, admin.email, admin.role, admin.password)}>Удалить</button>
        <button className='button' type="button" disabled={checkForm()} onClick={() => onEditAdmin(admin)}>Сохранить</button>
        </div>
    </form>
    <ConfirmModal question='Удалить админа?' text1={targetConfirm.name} text2={targetConfirm.email} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeAdmin(targetConfirm.id)}/>
    <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
        del ?
        navigate('/admins-list') :
        console.log('edit')} />
    </>
  )
}

export default EditAdmin;