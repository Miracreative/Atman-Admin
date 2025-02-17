import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

import { getOneSout, deleteSout } from '../../hooks/http.hook';

import './_editSout.scss'

const EditSout = () => {
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

    const [sout, setSout] = useState({
        id: 0,
        name: '',
        url: '',
        file: ''
    }); 
    
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

    let soutFile;

    soutFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : (sout.url ? sout.url.replace(regular, '') : 'Файл не выбран')


    const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			name: '',
            url: ''
		};

		switch(inputName) {
		case 'name':
			if (inputValue.length < 2) {
                error.name = "Название слишком короткое";
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
        getOneSout(id).then(res => {
            setSout(res)
        })
    }, []);

    const checkForm = () => {
		if (sout.name) {
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
        setSout((state:any) => ({...state, [name]: value}))
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${sout.id}`)
        axios.put('https://api.atman-auto.ru/api/sout', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('СОУТ был успешно обновлен')
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
  
    
    const removeSout = (id: number) => {
        setShowConfirm(false);
        deleteSout(id)
        setDel(true)
        setShowAlert(true);
        setTextAlert('СОУТ успешно удален');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, name: string) => {
        setShowConfirm(true);
        setTargetConfirm({id, name})
    }


    let spinner = loading ? <Spinner active/> : null;

    return (
    <>
       <PanelHeader title="Редактировать СОУТ" children={null} showBackBtn={true} />
       {spinner}
       <form  className="create-sout" id="create-sout" ref={form} acceptCharset='utf-8'>
                <div className="create-sout__box">
                <label className="create-sout__label">
                    <span>Название СОУТ</span>
                    <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
                    value={sout.name} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.name}</div>
                </label>
                <label className="create-sout__label create-sout__input">
                    <span>Загрузите файл, если хотите заменить существующий</span>
                    <input className='' type="file" name="file" id="file" ref={fileInput}
                    onChange={handleChange}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{soutFile}</span>
                    
                </label>
                
                </div>
                <div className="create-sout__btns">
                <button type="button" className="create-sout__btn button button--orange"
                onClick={() => onConfirmDelete(sout.id, sout.name)}>Удалить СОУТ</button>
                <button type="button" className="create-sout__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить СОУТ</button>
                </div>
            </form>
            <ConfirmModal question='Удалить СОУТ?' text1={targetConfirm.name} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeSout(targetConfirm.id)}/>
            <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/sout') :
                console.log('edit')} />
    </>
  )
}

export default EditSout;

