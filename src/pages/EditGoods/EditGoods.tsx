import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import checked from "./../../assets/icons/checked.svg";
import SetContent from "../../utils/SetContent";
import { filtersData } from "../../data";
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
    const [process, setProcess] = useState<string>('loading');
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

    const [filterArray, setFilterArray] = useState<number[]>(good?.mainparameter);
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
        getOneGood(id).then(res => {
            setGood(res)
            setFilterArray(res.mainparameter)
        }).then(
            () =>setProcess('confirmed')
        )
        // setGood({
        //         id: 1,
        //         imageurl: 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg',
        //         material: 'резина вспененная',
        //         goodspersonalimages:  ['https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg', 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg'],
        //         goodsindustrialimages: ['https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg', 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg', 'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg'],
        //         parameter: [0, 0, 0,0, 0, 0, 0,0,1,0 ,1,2],
        //         mainparameter: [1, 0, 1, 0, 0, 1, 1],
        //         article: '0082156',
        //         advantages: ['asdas', 'asdasd'],
        //         thickness: '27',
        //         volume: '15',
        //         pcs: '2', 
        //         basetype: '',
        //         color: '',
        //         heatresistance: '',
        //         name: 'товарчик',
        //         description: '',
        //         type: '',
        //         size: '',
        //         brand: '',
        //         linertype: '',
        //         pdfurl: '',
        //         typeglue: '',
        //         dencity: ''
        //     })
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

    const handleChangeAdvantages = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, i: number): void => {
        const { value } = e.target;
        const newGood = good;
            newGood.advantages[i] = value
            setGood((state:any) => ({...state, advantages: newGood.advantages}))
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
                <div key={i} className="create-news__image-container">
                    <img  src={fileImage} alt="image" />
                    <span>{ arr[i].replace(regular, '') }</span>
                </div>
                
            )
        })
        return (
           images
        )
    }

    const imagesItemsFromUpload = (input:any) => {

        let arrayForIteration = [];

        for (let key in input?.current?.files) {
            if (Number.isInteger(Number(key))) {
                arrayForIteration.push(input?.current?.files[key].name)
            }
        }
        const images = arrayForIteration.map((_, i) => {

            return (
                <div key={i} className="create-news__image-container">
                    <img  src={fileImage} alt="image" />
                    <span>{ arrayForIteration[i].replace(regular, '') }</span>
                </div>
                
            )
        })
        return (
           images
        )
    }

   imagesItemsFromBackend(good.goodspersonalimages)

    let imagesPersonal;

    imagesPersonal = (fileInputPersonal?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputPersonal) : ((good?.goodspersonalimages?.length > 0) ? imagesItemsFromBackend(good.goodspersonalimages) : 'нет картинок')

    let imagesIndustrial;
    imagesIndustrial = (fileInputIndustrial?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputIndustrial) : ((good?.goodsindustrialimages?.length > 0) ? imagesItemsFromBackend(good.goodsindustrialimages) : 'нет картинок')

    const handleAddAdvantages = (e:any) => {
        e.preventDefault()
        const newGood = good;
        if(!Array.isArray(newGood.advantages)) {
            newGood.advantages = []
        }
        newGood.advantages.push('')
        setGood(newGood)
        setFlag(flag => !flag)
    }

    const [flag, setFlag] = useState<boolean>(false)

    const rendererAdvantages = (advantages: any[]) => {
        const inputsForAdv = advantages?.map((_, i: number) => {

            return (
                <input type="text" key={i} className={`input ${errors.advantages ? 'input--error' : ''}`} value={advantages[i]} onChange={(e) => handleChangeAdvantages(e, i)}/>
            )
        })
        return (
           inputsForAdv
        )
    }
    let advantagesList;
    advantagesList = rendererAdvantages(good?.advantages)

    useEffect(() => {
        advantagesList = rendererAdvantages(good?.advantages)
    }, [flag])

   

    const onFilters = (id: number) => {
        let newArray = good;
        let newItem;
        if( newArray.mainparameter[id] == 1) {
            newItem = 0
        } else {
            newItem = 1
        }
        let newArr = [...newArray.mainparameter.slice(0, id), newItem, ...newArray.mainparameter.slice(id + 1, newArray.mainparameter.length)]
        newArray.mainparameter = newArr;
        setGood(newArray)
        let newFilterArray = filterArray;
        let newItem1;
        if(newFilterArray[id] == 1) {
            newItem1 = 0
        } else {
            newItem1 = 1
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)]
        setFilterArray(newArr1)
    }

    const renderFilterPanel = (arr: any[]) => {
        const filtersList = arr.map((item :{id:number; title:string}, i:number) => {
            const {id, title} = item;
            return (
                <li key={id} className='filters__item'>
                    <div className="filters__check" onClick={() => {onFilters(id)}}>
                        { 
                            good.mainparameter[i] ? <img src={checked} alt="checked" /> : null 
                        }
                    </div>
                    <span className="filters__title">{title}</span>
                </li>
            )
        })

        return (
            
            filtersList
            
        )
    }
   


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
                    onChange={handleChange} />
                    <button className='button' type="button">Загрузить файлы</button>
                    <img className='create-goods__image' src={fileImage} alt="file_image" />
                    <span className='create-goods__image--span'>{good.imageurl ? good.imageurl.replace(regular, '') : 'Файл не выбран'}</span>
                    {/* <div className='error'>{errors.file}</div> */}
                </label>
                <label className="create-news__label create-news__input">
                    <span>Загрузите файлы, если хотите заменить существующие в разделе персональных товаров</span>
                    <input className='' type="file" name="goodsPersonalImages" multiple
                    onChange={handleChange} ref={fileInputPersonal}/>
                    <button className='button' type="button">Загрузить файлы</button>
                </label>
                <div className="create-news__image-wrapper">
                    {
                        imagesPersonal
                    }
                </div>
                <label className="create-news__label create-news__input">
                    <span>Загрузите файлы, если хотите заменить существующие в разделе производственных</span>
                    <input className='' type="file" name="goodsPersonalImages" multiple
                    onChange={handleChange} ref={fileInputIndustrial}/>
                    <button className='button' type="button">Загрузить файлы</button>
                </label>
                <div className="create-news__image-wrapper">
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
                    <button className='button button--plus button--red' onClick={(e) => handleAddAdvantages(e)}>+</button>
                </div>
                <div className="create-goods__wrap">
                    <h3 className='create-goods__title'>К каким группам товарам относится данный товар</h3>
                    <SetContent process={process} component={renderFilterPanel(filtersData)}/>
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

