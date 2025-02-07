import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

import { getOneSertificate, deleteSertificate } from '../../hooks/http.hook';

import './_editSertification.scss'

const EditSertification = () => {
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
        title: ''
    });

    const [sertificate, setSertificate] = useState({
        id: 0,
        title: '',
        type: '',
        imagesrc: '',
        file: ''
    }); 


    const validateValues = (inputName: string, inputValue: string) => {

		let error = {
			title: '',
			type: ''
		};

		switch(inputName) {
		case 'title':
			if (inputValue.length < 2) {
                error.title = "Название слишком короткое";
                } else {
                error.title = '';
                }
                break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        getOneSertificate(id).then(res => {
            setSertificate(res)
        })
    }, []);

    const checkForm = () => {
		if (sertificate.title && sertificate.type) {
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
        setSertificate((state:any) => ({...state, [name]: value}))
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${sertificate.id}`)
        axios.put('https://api.atman-auto.ru/api/sertificate', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true); 
            setTextAlert('Сертификат был успешно обновлен')
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
  
    
    const removeSertification = (id: number) => {
        setShowConfirm(false);
        deleteSertificate(id)
        setDel(true)
        setShowAlert(true);
        setTextAlert('Сертификат успешно удален');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, title: string) => {
        setShowConfirm(true);
        setTargetConfirm({id, title})
    }

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

    return (
    <>
       <PanelHeader title="Редактировать сертификат" children={null} showBackBtn={true} />
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
                    <span>{sertificate.file ? sertificate.file.replace(regular, '') : (sertificate.imagesrc ? sertificate.imagesrc.replace(regular, '') : 'Файла нет')}</span>
                   
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
                onClick={() => onConfirmDelete(sertificate.id, sertificate.title)}>Удалить сертификат</button>
                <button type="button" className="create-sertification__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить сертификат</button>
                </div>
            </form>
            <ConfirmModal question='Удалить сертификат?' text1={targetConfirm.title} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeSertification(targetConfirm.id)}/>
            <ModalAlert alertBtnOpacity showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/sertifications-list') :
                console.log('edit')} />
    </>
  )
}

export default EditSertification;

