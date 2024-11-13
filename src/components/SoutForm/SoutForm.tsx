import { useState, useRef} from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg'
import axios from 'axios';
import './_soutForm.scss'

const SoutForm = ({sout, setSout, buttonTitle, form} : {
        sout: {
            name: string,
            file: any
		},
		setSout: (value: any) => void,
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
            file: ''
		};

		switch(inputName) {
		case 'name':
			if (inputValue.length < 2) {
                error.name = "Название слишком короткое";
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
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

    const fileInput = useRef<any>(null)

    let soutFile;

    soutFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : 'Файл не выбран'

	const checkForm = () => {
		if (sout.name && fileInput?.current?.value.length > 0) {
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
		setSout((state: any) => ({...state, [name]: value}))
		setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
	}

	const clearForm = () => {
        form.current.reset()
		setSout((state: any) => {
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
        console.log(e.target.form)
        axios.post('http://83.147.246.205:5000/api/sout', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новаый СОУТ был успешно создан')
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
            <form acceptCharset='utf-8' className="create-sout" id="create-sout" ref={form}>
                <div className="create-sout__box">
                <label className="create-sout__label">
                    <span>Название СОУТ</span>
                    <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
                    value={sout.name} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.name}</div>
                </label>
                <label className="create-sout__label create-sout__input">
                    <span>Загрузите файл</span>
                    <input className='' type="file" name="file" id="file"
                    onChange={handleChange} ref={fileInput}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{soutFile}</span>
                    <div className='error'>{errors.file}</div>
                </label>
                
                </div>
                <div className="create-sout__btns">
                <button type="button" className="create-sout__btn button button--orange"
                onClick={clearForm}>Очистить форму</button>
                <button type="button" className="create-sout__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                    clearForm();
                }}>{buttonTitle}</button>
                </div>
            </form>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
        </>
	)
}

export default SoutForm;