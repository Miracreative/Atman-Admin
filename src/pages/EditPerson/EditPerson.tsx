import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import InputMask from 'react-input-mask';

import axios from 'axios';

import { getOnePerson, deletePerson } from '../../hooks/http.hook';

import './_editPerson.scss'

const EditPerson = () => {
    const form = useRef<any>(null);
    const fileInput = useRef<any>(null)
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
        name: ''
    });

    const [person, setPerson] = useState({
        id: 0,
        name: '',
        descr: '',
        watsapp: '',
        email: '',
        imagesrc: '',
        file: ''
    }); 
    
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

    let personFile;

    personFile = (fileInput?.current?.value.length > 0) ? fileInput.current.value.replace(regular, '') : (person.imagesrc ? person.imagesrc.replace(regular, '') : 'Файл не выбран')


    const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			name: '',
            email: '',
            watsapp: '',
            descr: ''
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
        case 'watsapp':
            if (inputValue.length < 15) {
                error.watsapp = "Телефон слишком короткий";
                } else {
                error.watsapp = '';
                }
            break;
        case 'descr':
            if (inputValue.length < 10) {
                error.name = "Описание слишком короткое";
                } else {
                error.name = '';
                }
                break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        getOnePerson(id).then(res => {
            setPerson(res)
        })
    }, []);

    const checkForm = () => {
		if (person.name) {
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
    const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setPerson((state:any) => ({...state, [name]: value}))
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${person.id}`)
        axios.put('https://api.atman-auto.ru/api/person', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Сотрудник был успешно обновлен')
          })
          .catch(() => {
            setLoading(false);
            setShowAlert(true)
            setTextAlert('Что-то пошло не так')
        }).finally(() => {
            setLoading(false);
            setShowAlert(true)
        })
    }
  
    
    const removePerson = (id: number) => {
        setShowConfirm(false);
        deletePerson(id)
        setDel(true)
        setShowAlert(true);
        setTextAlert('Сотрудник успешно удален');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, name: string) => {
        setShowConfirm(true);
        setTargetConfirm({id, name})
    }


    let spinner = loading ? <Spinner active/> : null;

    return (
    <>
       <PanelHeader title="Редактировать сотрудника" children={null} showBackBtn={true} />
       {spinner}
       <form  className="create-person" id="create-person" ref={form} acceptCharset='utf-8'>
            <div className='create-person__inner'>
                <div className="create-person__right">
                <div className="create-person__col-box">
                    <div className="create-person__col">
                    <label className="create-person__label">
                        <span>Имя сотрудника</span>
                        <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
                        value={person.name} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.name}</div>
                    </label>
                    <label className="create-person__label create-person__input">
                        <span>Загрузите фото</span>
                        <input className='' type="file" name="file" id="file" ref={fileInput}
                        onChange={handleChange}/>
                        <img src={fileImage} alt="file_image" />
                        <span>{personFile}</span>
                    </label>
                   
                </div>
                <div className="create-person__col">
                    <label className="create-person__label">
                        <span>E-mail</span>
                        <input className={`input ${errors.email ? 'input--error' : ''}`} type="text" name="email"
                        value={person.email} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.email}</div>
                    </label>
                    <label className="create-person__label">
                        <span>WhatsApp</span>
                        {
                            <InputMask 
                                mask="8-999-999-99-99" 
                                maskChar=" " 
                                className="input" 
                                value={person.watsapp} 
                                name="watsapp" 
                                onChange={handleChange}
                            />
                        }
                        <div className='error'>{errors.watsapp}</div>
                    </label>
                </div>
                
                </div>
                <label className="create-person__label create-person--textarea">
                    <span>Описание</span>
                    <textarea className={`input input--textarea  ${errors.descr ? 'input--error' : ''}`} 
                    name="descr"
                    value={person.descr}
                    onChange={handleChange}/>
                    <div className='error'>{errors.descr}</div>
                </label>
                </div>
                
                </div>
                
                <div className="create-person__btns">
                <button type="button" className="create-person__btn button button--orange"
                onClick={() => onConfirmDelete(person.id, person.name)}>Удалить сотрудника</button>
                <button type="button" className="create-person__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить сотрудника</button>
                </div>
            </form>
            <ConfirmModal question='Удалить сотрудника?' text1={targetConfirm.name} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removePerson(targetConfirm.id)}/>
            <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/persons') :
                console.log('edit')} />
    </>
  )
}

export default EditPerson;

