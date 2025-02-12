import { useState} from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg'
import { useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './_sertificateForm.scss'

const SertificationForm = ({sertificate, setSertificate, buttonTitle, form} : {
    sertificate: {
        title: string,
        type: string,
        file: any
    },
    setSertificate: (value: any) => void,
    buttonTitle: string,
    form: any
}) => {
        const SERVER_URL:string = 'https://api.atman-auto.ru/api';
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [alertBtnOpacity, setAlertBtnOpacity] = useState<boolean>(false)
        const [textAlert, setTextAlert] = useState('');
        const [showAlert, setShowAlert] = useState(false);
		const [errors, setErrors] = useState<any>({});
		const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			title: '',
			type: '',
            file: ''
		};

		switch(inputName) {
		case 'title':
			if (inputValue.length < 2) {
                error.title = "Название слишком короткое";
                } else {
                error.title = '';
                }
                break;
		case 'file':
			if (!inputValue) {
			error.file = "Прикрепите файл";
			} else {
			error.file = "";
			}
			break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

	const checkForm = () => {
		if (sertificate.title && sertificate.type && sertificate.file) {
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
		setSertificate((state: any) => ({...state, [name]: value}))
		setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
	}

	const clearForm = () => {
        form.current.reset()
		setSertificate((state: any) => {
            let newState = {...state}
            for (let key in newState) {
                newState[key] = '';
            }
            return newState;
		})
	}

    const $api = axios.create({
        withCredentials: true,
        baseURL: SERVER_URL
    })
    
    $api.interceptors.request.use(config => {
        const token = Cookies.get('token');
        
        if (token) {
            config.headers.Authorization = `${token}`; 
        }
    
        return config;
    });
    
    $api.interceptors.response.use(
        (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    return {message: 'Не авторизован'}
                }
                return Promise.reject(error);
            }
    );

    const submitForm = async (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.target.form);
        $api.post('https://api.atman-auto.ru/api/sertificate', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новый сертификат был успешно создан')
          })
          .catch(() => {
            setLoading(false);
            setAlertBtnOpacity(true)
            setTextAlert('У Вас нет прав для создания сертификатов')
            setShowAlert(true)
            setTimeout(() =>  {
                setShowAlert(false)
                navigate('/');
            },1500)
        }).finally(() => {
        })
    }

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

	return (
        <>
            {spinner}
            <form  className="create-sertification" id="create-sertification" ref={form} acceptCharset='utf-8'>
                <div className="create-sertification__box">
                <label className="create-sertification__label">
                    <span>Название сертификата</span>
                    <input className={`input ${errors.title ? 'input--error' : ''}`} type="text" name="title"
                    value={sertificate.title} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.title}</div>
                </label>
                
                <label className="create-sertification__label create-sertification__input">
                    <span>Загрузите файл, если хотите заменить существующий</span>
                    <input className='' type="file" name="file" id="file"
                    onChange={handleChange}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{sertificate.file ? sertificate.file.replace(regular, '') : 'Загрузите файл'}</span>
                    <div className='error'>{errors.file}</div>
                </label>
                <label className="create-sertification__label">
                    <span>Тип сертификата</span>
                    <div className="create-sertification__checkboxes">
                    <label className="create-sertification__checkbox">
                    <input className="sr-only" type="radio" name="type" value="album"
                    checked={sertificate.type === 'album' ? true : false}
                    onChange={handleChange}/>
                    <span>Альбомная</span>
                </label>
                <label className="create-sertification__checkbox">
                    <input className="sr-only" type="radio" name="type" value="portrait"
                    checked={sertificate.type === 'portrait' ? true : false}
                    onChange={handleChange}/>
                    <span>Портретная</span>
                    </label>
                    </div>
                </label>
                </div>
                <div className="create-sertification__btns">
                <button type="button" className="create-sertification__btn button button--orange"
                onClick={clearForm}>Очистить форму</button>
                <button type="button" className="create-sertification__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e);
                    clearForm();
                }}>{buttonTitle}</button>
                </div>
            </form>
            <ModalAlert alertBtnOpacity={alertBtnOpacity} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
        </>
	)
}

export default SertificationForm;