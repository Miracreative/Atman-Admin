import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

import { getOneGood, deleteGood } from '../../hooks/http.hook';

import './_editGoods.scss'

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
                thickness: '27',
                volume: '15',
                pcs: '2', 
                basetype: '',
                color: '',
                heatresistance: '',
                name: 'товарчик',
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
        axios.put('http://192.168.0.153:5000/api/goods', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Товар успешно удален')
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
        setTextAlert('Товар успешно удален');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, name: string) => {
        setShowConfirm(true);
        setTargetConfirm({id, name})
    }

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

    const fileInputPersonal = useRef<any>(null)
    const fileInputIndustrial = useRef<any>(null)

    const imagesItemsFromBackend = (arr: any[]) => {
        const images = arr.map((_, i) => {

            return (
                <div key={i} className="create-goods__image-container">
                    <img  src={fileImage} alt="image" />
                    <span>{ arr[i].replace(regular, '') }</span>
                </div>
                
            )
        })
        return (
           images
        )
    }

    const imagesItemsFromUpload = (input: any) => {

        let arrayForIteration = [];

        for (let key in input?.current?.files) {
            if (Number.isInteger(Number(key))) {
                arrayForIteration.push(input?.current?.files[key].name)
            }
        }
        const images = arrayForIteration.map((_, i) => {

            return (
                <div key={i} className="create-goods__image-container">
                    <img  src={fileImage} alt="image" />
                    <span>{ arrayForIteration[i].replace(regular, '') }</span>
                </div>
                
            )
        })
        return (
           images
        )
    }

//    imagesItemsFromBackend(good.goodspersonalimages)

    let imagesPersonal;

    imagesPersonal = (fileInputPersonal?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputPersonal) : ((good?.goodspersonalimages?.length > 0) ? imagesItemsFromBackend(good.goodspersonalimages) : 'нет картинок')

    let imagesIndustrial;

    imagesIndustrial = (fileInputIndustrial?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputIndustrial) : ((good?.goodsindustrialimages?.length > 0) ? imagesItemsFromBackend(good.goodsindustrialimages) : 'нет картинок')

    const handleAddAdvantages = () => {
        console.log('click')
    }

    const rendererAdvantages = (advantages: any[]) => {
        const inputsForAdv = advantages.map((_, i) => {

            return (
                <input type="text" className={`input ${errors.advantages ? 'input--error' : ''}`} value={advantages[i]}/>
            )
        })
        return (
           inputsForAdv
        )
    }

    let advantagesList = rendererAdvantages(good?.advantages)
    console.log(advantagesList)

    return (
    <>
       <PanelHeader title="Редактировать товар" children={null} showBackBtn={true} />
       {spinner}
       <form  className="create-goods" id="create-goods" ref={form} acceptCharset='utf-8'>
            <div className="create-goods__box">
                <div className="create-goods__wrapper">
                    <label className="create-goods__label">
                        <span>Артикул</span>
                        <input className={`input ${errors.article ? 'input--error' : ''}`} type="text" name="article"
                        value={good.article} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.article}</div>
                    </label>
                    <label className="create-goods__label">
                        <span>Название товара</span>
                        <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
                        value={good.name} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.name}</div>
                    </label>
                </div>
                <label className="create-goods__label">
                    <span>Описание товара</span>
                    <textarea className={`input input--textarea ${errors.description ? 'input--error' : ''}`} 
                    name="description"
                    value={good.description}
                    onChange={handleChange}/>
                    <div className='error'>{errors.description}</div>
                </label>
                <label className="create-goods__label create-goods__input">
                    <span>Загрузите файл изображения материала</span>
                    <input className='' type="file" name="imageUrl" id="file"
                    onChange={handleChange}/>
                    <button className='button' type="button">Загрузить файлы</button>
                    <img className='create-goods__image' src={fileImage} alt="file_image" />
                    <span className='create-goods__image--span'>{good.imageurl ? good.imageurl.replace(regular, '') : 'Файл не выбран'}</span>
                    {/* <div className='error'>{errors.file}</div> */}
                </label>
                <label className="create-goods__label create-goods__input">
                    <span>Загрузите файлы, если хотите заменить существующие фотографии материалов для индивидуального использования (до 10 шт.)</span>
                    <input className='' type="file" name="goodspersonalimages" multiple
                    onChange={handleChange} ref={fileInputPersonal}/>
                    <button className='button' type="button">Загрузить файлы</button>
                </label>
                <div className="create-goods__image-wrapper">
                    {
                        imagesPersonal
                    }
                    <label className="create-goods__label create-goods__input">
                    <span>Загрузите файлы, если хотите заменить существующие фотографии материалов для промышленного использования (до 10 шт.)</span>
                    <input className='' type="file" name="goodsindustrialimages" multiple
                    onChange={handleChange} ref={fileInputPersonal}/>
                    <button className='button' type="button">Загрузить файлы</button>
                </label>
                <div className="create-goods__image-wrapper">
                    {
                        imagesIndustrial
                    }
                </div>
                </div>
                <div className="create-goods__wrap">
                    <h3 className='create-goods__title'>Характеристики</h3>
                    <label className="create-goods__label">
                       
                        <span>Бренд</span>
                        <input className={`input ${errors.brand ? 'input--error' : ''}`} type="text" name="brand"
                        value={good.brand} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.brand}</div>
                    </label>
                    <label className="create-goods__label">
                        <span>Цвет</span>
                        <input className={`input ${errors.color ? 'input--error' : ''}`} type="text" name="color"
                        value={good.color} 
                        onChange={handleChange}/>
                        {/* <div className='error'>{errors.color}</div> */}
                    </label>
                    <label className="create-goods__label">
                       
                        <span>Толщина</span>
                        <input className={`input ${errors.thickness ? 'input--error' : ''}`} type="text" name="thickness"
                        value={good.thickness} 
                        onChange={handleChange}/>
                        {/* <div className='error'>{errors.thickness}</div> */}
                    </label>
                    <label className="create-goods__label">
                        <span>Тип лайнера</span>
                        <input className={`input ${errors.linertype ? 'input--error' : ''}`} type="text" name="linerType"
                        value={good.linertype} 
                        onChange={handleChange}/>
                        {/* <div className='error'>{errors.linertype}</div> */}
                    </label>
                    <label className="create-goods__label">
                       <span>Тип основы</span>
                       <input className={`input ${errors.type ? 'input--error' : ''}`} type="text" name="type"
                       value={good.type} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.type}</div> */}
                   </label>
                   <label className="create-goods__label">
                       <span>Плотность</span>
                       <input className={`input ${errors.dencity ? 'input--error' : ''}`} type="text" name="dencity"
                       value={good.dencity} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.dencity}</div> */}
                   </label>
                </div>
                <div className="create-goods__wrap create-goods__wrap--advantages">
                    <h3 className='create-goods__title'>Преимущества</h3>
                    {advantagesList}
                    <button className='button button--plus button--red' onClick={handleAddAdvantages}>+</button>
                </div>
                </div>
                <div className="create-goods__btns">
                <button type="button" className="create-goods__btn button button--orange"
                onClick={() => onConfirmDelete(good.id, good.name)}>Удалить товар</button>
                <button type="button" className="create-goods__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить товар</button>
                </div>
            </form>
            <ConfirmModal question='Удалить товар?' text1={targetConfirm.name} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeGood(targetConfirm.id)}/>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/goods') :
                console.log('edit')} />
    </>
  )
}

export default EditGood;

