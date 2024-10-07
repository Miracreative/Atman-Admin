import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
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
    const [disable, setDisable] = useState<boolean>(true);
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

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        getOneAdmin(id).then(res => {
            setAdmin(res)
            setAdmin(state => ({...state, password: 'введите новый пароль'}))
        })
    }, []);


//обработчик текстовых инпутов
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setAdmin(state => ({...state, [e.target.name]: e.target.value}))
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
    const onChangeDisable = () => {
        if(admin.password.length >= 6) {
            setDisable(false);
        }
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
                        <input type="text" name='email' value={admin.email} onChange={handleChange}/>
                    </label>
                    <label>
                        <span className='create-admin__label'>Пароль</span>
                        <input type="text" name='password' value={admin.password} onChange={handleChange}
                        onInput={onChangeDisable}
                        />
                    </label>

                </div>
                <div className="parent-form__col">

                <label>
                    <span className='create-admin__label'>Имя</span>
                    <input type="text" name='name' value={admin.name} onChange={handleChange}/>
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
        <button className='button' type="button" disabled={disable} onClick={() => onEditAdmin(admin)}>Сохранить</button>
        </div>
    </form>
    <ConfirmModal question='Удалить админа?' text1={targetConfirm.name} text2={targetConfirm.email} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeAdmin(targetConfirm.id)}/>
    <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
        del ?
        navigate('/admins-list') :
        console.log('edit')} />
    </>
  )
}

export default EditAdmin;