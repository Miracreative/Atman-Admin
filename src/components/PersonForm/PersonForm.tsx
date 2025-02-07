import { useState, useRef} from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg'
import InputMask from 'react-input-mask';
import axios from 'axios';
import './_personForm.scss'

const PersonForm = ({person, setPerson, buttonTitle, form} : {
        person: {
            name: string,
            file: any,
            watsapp: string,
            email: string,
            descr: string,
		},
		setPerson: (value: any) => void,
		buttonTitle: string,
		form: any
	}) => {
        const [loading, setLoading] = useState(false);
        const [textAlert, setTextAlert] = useState('');
        const [showAlert, setShowAlert] = useState(false);
		const [errors, setErrors] = useState<any>({});
		const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			name: '',
            file: '',
            watsapp: '',
            email: '',
            descr: '',
		};

		switch(inputName) {
		case 'name':
			if (inputValue.length < 2) {
                error.name = "Имя слишком короткое";
                } else {
                error.name = '';
                }
                break;
        case 'descr':
            if (inputValue.length < 10) {
                error.name = "Описание слишком короткое";
                } else {
                error.name = '';
                }
                break;
		case 'file':
			if (!inputValue) {
			error.file = "Прикрепите файл";
			} else {
			error.file = "";
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
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

    const fileInput = useRef<any>(null)

    let personFile;

    personFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : 'Файл не выбран'

	const checkForm = () => {
		if (person.name && fileInput?.current?.value.length > 0) {
		for (let key in errors) {
			if (errors[key] !== '') {
			return true
			}
		}
		return false
		}
		return true
	}


	const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
		const { name, value } = e.target;
		setPerson((state: any) => ({...state, [name]: value}))
		setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
	}

	const clearForm = () => {
        form.current.reset()
		setPerson((state: any) => {
            let newState = {...state}
            for (let key in newState) {
                newState[key] = '';
            }
            return newState;
		})
	}

    const submitForm = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target.form);
        axios.post('https://api.atman-auto.ru/api/person', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новый сотрудник был успешно создан')
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


    let spinner = loading ? <Spinner active/> : null;

	return (
        <>
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
                onClick={clearForm}>Очистить форму</button>
                <button type="button" className="create-person__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                    clearForm();
                }}>{buttonTitle}</button>
                </div>
            </form>
            <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
        </>
	)
}

export default PersonForm;