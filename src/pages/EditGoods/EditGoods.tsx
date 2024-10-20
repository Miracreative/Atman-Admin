import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

import { getOneGood, deleteGood } from '../../hooks/http.hook';

import './_editGood.scss'

const EditGood = () => {
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
        name: ''
    });

    const [good, setGood] = useState<any>({
        id: 0,
        imageurl: '',
        material: '',
        goodspersonalimages:  [],
        goodsindustrialimages: [],
        parameter: [],
        mainparameter: [],
        article: '',
        advantages: [],
        thickness: '',
        volume: '',
        pcs: '', 
        basetype: '',
        color: '',
        heatresistance: '',
        name: '',
        description: '',
        type: '',
        size: '',
        brand: '',
        linertype: '',
        pdfurl: '',
        typeglue: '',
        dencity: ''
    }); 


    const validateValues = (inputName:string, inputValue: string) => {

		let error = {
            material: '',
            article: '',
            name: '',
            description: '',
            brand: ''
		};

		switch(inputName) {
		case 'name':
			if (inputValue.length < 2) {
                error.name = "Название товара слишком короткое";
                } else {
                error.name = '';
                }
                break;
        case 'material':
            if (inputValue.length < 2) {
                error.material = "Название материала слишком короткое";
                } else {
                error.material = '';
                }
                break;
        case 'article':
            if (inputValue.length < 2) {
                error.article = "Артикул слишком короткий";
                } else {
                error.article = '';
                }
                break;
        case 'brand':
            if (inputValue.length < 2) {
                error.brand = "Бренд слишком короткий";
                } else {
                error.brand = '';
                }
                break;
		case 'description':
			if (inputValue.length < 10) {
                error.description = "Текста слишком мало";
                } else {
                error.description = '';
                }
                break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        // getOneGood(id).then(res => {
        //     setGood(res)
        // })
        setGood({
                id: 1,
                imageurl: 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg',
                material: 'резина вспененная',
                goodspersonalimages:  ['https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg', 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg'],
                goodsindustrialimages: ['https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg', 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg', 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg'],
                parameter: [0, 0, 0,0, 0, 0, 0,0,1,0 ,1,2],
                mainparameter: [1, 0, 1, 0, 0, 1, 1],
                article: '0082156',
                advantages: ['asdas', 'asdasd'],
                thickness: '',
                volume: '',
                pcs: '', 
                basetype: '',
                color: '',
                heatresistance: '',
                name: '',
                description: '',
                type: '',
                size: '',
                brand: '',
                linertype: '',
                pdfurl: '',
                typeglue: '',
                dencity: ''
            })
    }, []);

    const checkForm = () => {
		if (good.name && good.description && good.article && good.material && good.brand) {
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
        setGood((state:any) => ({...state, [name]: value}))
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${good.id}`)
        axios.put('http://192.168.0.153:5000/api/base', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('База была успешно обновлена')
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
  
    
    const removeGood = (id: number) => {
        setShowConfirm(false);
        deleteGood(id)
        setDel(true)
        setShowAlert(true);
        setTextAlert('База успешно удалена');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, name: string) => {
        setShowConfirm(true);
        setTargetConfirm({id, name})
    }

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

    return (
    <>
       <PanelHeader title="Редактировать базу" children={null} showBackBtn={true} />
       {spinner}
       <form  className="create-goods" id="create-goods" ref={form} acceptCharset='utf-8'>
                <div className="create-goods__box">
                <label className="create-goods__label">
                    <span>Название базы знаний</span>
                    <input className={`input ${errors.title ? 'input--error' : ''}`} type="text" name="name"
                    value={good.name} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.title}</div>
                </label>
                <label className="create-goods__label">
                    <span>Содержание базы</span>
                    <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="description"
                    value={good.description}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div>
                </label>
                <label className="create-goods__label create-goods__input">
                    <span>Загрузите файл</span>
                    <input className='' type="imageUrl" name="file" id="file"
                    onChange={handleChange}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{good.imageurl ? good.imageurl.replace(regular, '') : 'Файл не выбран'}</span>
                    <div className='error'>{errors.file}</div>
                </label>
                
                </div>
                <div className="create-goods__btns">
                <button type="button" className="create-goods__btn button button--orange"
                onClick={() => onConfirmDelete(good.id, good.name)}>Удалить базу</button>
                <button type="button" className="create-goods__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить базу</button>
                </div>
            </form>
            <ConfirmModal question='Удалить базу?' text1={targetConfirm.name} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeGood(targetConfirm.id)}/>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/goods') :
                console.log('edit')} />
    </>
  )
}

export default EditGood;

