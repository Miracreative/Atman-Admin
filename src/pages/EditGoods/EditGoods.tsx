import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import checked from "./../../assets/icons/checked.svg";
import SetContent from "../../utils/SetContent";
import { filtersData, recommendData, parametersData } from "../../data";
import axios from 'axios';
import {
    BoldItalicUnderlineToggles,
    MDXEditor,
    MDXEditorMethods,
    UndoRedo,
    headingsPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    quotePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    frontmatterPlugin,
    InsertFrontmatter,
    InsertTable,
    ListsToggle,
    Separator,
    CreateLink,
    BlockTypeSelect,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import ReactMarkdown from 'react-markdown';
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
    const mkdStr = ``;
    const [value, setValue] = useState(mkdStr);
    const ref = useRef<MDXEditorMethods>(null);
    const [oldText, setOldText] = useState<string>('')
    const [good, setGood] = useState<any>({
        id: 0,
        imageurl: '',
        material: '',
        goodscarouselimages:  [],
        parameter: [],
        mainparameter: [],
        recommendparameter: [],
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

    const [mainParametersArray, setMainParametersArray] = useState<number[]>(good?.mainparameter);

    const [recommendParametersArray, setRecommendParametersArray] = useState<number[]>(good?.recommendparameter);

    const [parametersArray, setParametersArray] = useState<number[]>(good?.mainparameter);


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

  //отправляем запрос получния данных о товаре
    useEffect(() => { 
        getOneGood(id).then(res => {
            setGood(res)
            // setMainParametersArray(res.mainparameter)
            // setRecommendParametersArray(res.recommendparameter)
            setOldText(res.description)
        }).then(
            () =>setProcess('confirmed')
            
        )
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

    const deleteEmptyAdvantages = (): void => {
        let newGood = good;
        newGood.advantages = newGood.advantages.filter((item: string) => item !== '')
        setGood((state:any) => ({...state, advantages: newGood.advantages}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        deleteEmptyAdvantages();
        const formData = new FormData(e.target.form);
        formData.delete('type')
        formData.append('id', `${good.id}`);
        if(good.description.length > 0) {
            formData.append('description', `${good.description}`)
        } else {
            formData.append('description', `${oldText}`)
        }
        formData.append('type', `${good.type}`);
        formData.delete('basetype')
        formData.append('baseType', `${good.basetype}`);
        formData.delete('linertype')
        formData.append('linerType', `${good.linertype}`);
        formData.delete('typeglue')
        formData.append('typeGlue', `${good.typeglue}`);
        formData.delete('heatresistance')
        formData.append('heatResistance', `${good.heatresistance}`);
        formData.append('advantages', JSON.stringify(good.advantages).replace('[', '{')
        .replace(']', '}'));
        formData.append('mainParameter', JSON.stringify(good.mainparameter).replace('[', '{')
        .replace(']', '}'));
        formData.append('recommendparameter', JSON.stringify(good.recommendparameter).replace('[', '{')
        .replace(']', '}'));
        formData.append('parameter', JSON.stringify(good.parameter).replace('[', '{')
        .replace(']', '}'));

        axios.put('https://api.atman-auto.ru/api/goods', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Товар успешно обновлен')
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

    const fileInputCarousel = useRef<any>(null)
    const fileInputPdf = useRef<any>(null)
    const fileInputMaterial = useRef<any>(null)

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

   imagesItemsFromBackend(good.goodscarouselimages)

    let imagesCarousel;

    imagesCarousel = (fileInputCarousel?.current?.files?.length) > 0 ? imagesItemsFromUpload(fileInputCarousel) : ((good?.goodscarouselimages?.length > 0) ? imagesItemsFromBackend(good.goodscarouselimages) : 'нет картинок')

   
    let imagePdf;

    imagePdf = (fileInputPdf?.current?.value.length > 0) ? fileInputPdf?.current?.value.replace(regular, '') : (good.pdfurl ? good.pdfurl.replace(regular, '') : 'Файл не выбран')

    let imageMaterial;

    
    imageMaterial = (fileInputMaterial?.current?.value.length > 0) ? fileInputMaterial?.current?.value.replace(regular, '') : (good.imageurl ? good.imageurl.replace(regular, '') : 'Файл не выбран')

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

   

    const onMainParameters = (id: number) => {
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
        let newFilterArray = mainParametersArray;
        let newItem1;
        if(newFilterArray[id] == 1) {
            newItem1 = 0
        } else {
            newItem1 = 1
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)]
        setMainParametersArray(newArr1)
    }

    const onRecommendParameters = (id: number) => {
        let newArray = good;
        let newItem;
        if( newArray.recommendparameter[id] == 1) {
            newItem = 0
        } else {
            newItem = 1
        }
        let newArr = [...newArray.recommendparameter.slice(0, id), newItem, ...newArray.recommendparameter.slice(id + 1, newArray.recommendparameter.length)]
        newArray.recommendparameter = newArr;
        setGood(newArray)
        let newFilterArray = recommendParametersArray;
        let newItem1;
        if(newFilterArray[id] == 1) {
            newItem1 = 0
        } else {
            newItem1 = 1
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)]
        setRecommendParametersArray(newArr1)
    }

    const onParameters = (id: number) => {
        let newArray = good;
        let newItem;
        if( newArray.parameter[id] == 1) {
            newItem = 0
        } else {
            newItem = 1
        }
        let newArr = [...newArray.parameter.slice(0, id), newItem, ...newArray.parameter.slice(id + 1, newArray.parameter.length)]
        newArray.parameter = newArr;
        setGood(newArray)
        console.log(newArray.parameter)
        let newFilterArray = parametersArray;
        let newItem1;
        if(newFilterArray[id] == 1) {
            newItem1 = 0
        } else {
            newItem1 = 1
        }
        let newArr1 = [...newFilterArray.slice(0, id), newItem1, ...newFilterArray.slice(id + 1, newFilterArray.length)]
        setParametersArray(newArr1)
    }

    const renderMainParameters = (arr: any[]) => {
        const filtersList = arr.map((item :{id:number; title:string}, i:number) => {
            const {id, title} = item;
            return (
                <li key={id} className='filters__item'>
                    <div className="filters__check" onClick={() => {onMainParameters(id)}}>
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

    const renderRecommendParameters = (arr: any[]) => {
        const filtersList = arr.map((item :{id:number; title:string}, i:number) => {
            const {id, title} = item;
            return (
                <li key={id} className='filters__item'>
                    <div className="filters__check" onClick={() => {onRecommendParameters(id)}}>
                        { 
                            good.recommendparameter[i] ? <img src={checked} alt="checked" /> : null 
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

    const renderParameters = (arr: any[]) => {
        const filtersList = arr.map((item :{id:number; title:string}, i:number) => {
            const {id, title} = item;
            // console.log(good.parameter)
            return (
                <li key={id} className='parameters__item'>
                    <div className="parameters__check" onClick={() => {onParameters(id)}}>
                        { 
                            good.parameter && good.parameter[i] ? <img src={checked} alt="checked" /> : null 
                        }
                    </div>
                    <span className="parameters__title">{title}</span>
                </li>
            )
        })

        return (
            
            filtersList
            
        )
    }
   
    const changeContent = (e: any) => {
        setValue(value)
        setGood((state:any) => ({...state, description: e}))
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
                 <label className="create-knowlege__label">
                                    <span>Содержание описания</span>
                                    {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                                    name="content"
                                    value={knowledge.content}
                                    onChange={handleChange}/>
                                    <div className='error'>{errors.content}</div> */}
                                    <div className="create-knowlege__text">
                                        <ReactMarkdown>{oldText}</ReactMarkdown>
                                    </div>
                                </label>
                <label className="create-goods__label create-goods__label--mb-0">
                    <span>Описание товара</span>
                    {/* <textarea className={`input input--textarea ${errors.description ? 'input--error' : ''}`} 
                    name="description"
                    value={good.description}
                    onChange={handleChange}/>
                    <div className='error'>{errors.description}</div> */}
                </label>
                <MDXEditor
                        ref={ref}
                        onChange={changeContent}
                        markdown=""
                        plugins={[
                            toolbarPlugin({
                                toolbarClassName: "my-classname",
                                toolbarContents: () => (
                                    <>
                                        <BlockTypeSelect />
                                        <UndoRedo />
                                        <BoldItalicUnderlineToggles />
                                        <InsertFrontmatter />
                                        <ListsToggle />
                                        <CreateLink />
                                    </>
                                ),
                            }),
                            headingsPlugin(),
                            listsPlugin(),
                            quotePlugin(),
                            thematicBreakPlugin(),
                            markdownShortcutPlugin(),
                            frontmatterPlugin(),
                        ]}
                    />
                <label className="create-goods__label create-goods__label--mt-40 create-goods__input">
                    <span>Документ о товаре</span>
                    <input className='' type="file" name="pdfUrl" id="pdf"
                    onChange={handleChange} ref={fileInputPdf}/>
                    <button className='button' type="button">Загрузить файл</button>
                    <img className='create-goods__image' src={fileImage} alt="file_image" />
                    <span className='create-goods__image--span'>{imagePdf}</span>
                    {/* <div className='error'>{errors.file}</div> */}
                </label>
                <label className="create-goods__label create-goods__input">
                    <span>Изображение материала</span>
                    <input className='' type="file" name="imageUrl" id="file"
                    onChange={handleChange} ref={fileInputMaterial}/>
                    <button className='button' type="button">Загрузить картинку</button>
                    <img className='create-goods__image' src={fileImage} alt="file_image" />
                    <span className='create-goods__image--span'>{imageMaterial}</span>
                    {/* <div className='error'>{errors.file}</div> */}
                </label>
                <label className="create-goods__label create-goods__input">
                    <span>Товары для карусели</span>
                    <input className='' type="file" name="goodsCarouselImages" multiple
                    onChange={handleChange} ref={fileInputCarousel}/>
                    <button className='button' type="button">Загрузить картинки</button>
                </label>
                <div className="create-goods__image-wrapper">
                    {
                        imagesCarousel
                    }
                </div>
                </div>
                <div className="create-goods__wrap">
                    <h3 className='create-goods__title'>Характеристики</h3>
                    <label className="create-goods__label">
                       <span>Тип материала</span>
                       <input className={`input ${errors.type ? 'input--error' : ''}`} type="text" name="type"
                       value={good.type} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
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
                        <input className={`input ${errors.linertype ? 'input--error' : ''}`} type="text" name="linertype"
                        value={good.linertype} 
                        onChange={handleChange}/>
                        {/* <div className='error'>{errors.linertype}</div> */}
                    </label>
                    <label className="create-goods__label">
                       <span>Тип основы</span>
                       <input className={`input ${errors.basetype ? 'input--error' : ''}`} type="text" name="basetype"
                       value={good.basetype} 
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
                   <label className="create-goods__label">
                       <span>Материал</span>
                       <input className={`input ${errors.material ? 'input--error' : ''}`} type="text" name="material"
                       value={good.material} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
                   <label className="create-goods__label">
                       <span>Объем</span>
                       <input className={`input ${errors.volume ? 'input--error' : ''}`} type="text" name="volume"
                       value={good.volume} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
                   <label className="create-goods__label">
                       <span>Количество</span>
                       <input className={`input ${errors.pcs ? 'input--error' : ''}`} type="text" name="pcs"
                       value={good.pcs} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
                   <label className="create-goods__label">
                       <span>Темп. устойч.</span>
                       <input className={`input ${errors.heatResistance ? 'input--error' : ''}`} type="text" name="heatresistance"
                       value={good.heatresistance} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
                   <label className="create-goods__label">
                       <span>Размер</span>
                       <input className={`input ${errors.size ? 'input--error' : ''}`} type="text" name="size"
                       value={good.size} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
                   <label className="create-goods__label">
                       <span>Тип клея</span>
                       <input className={`input ${errors.typeGlue ? 'input--error' : ''}`} type="text" name="typeglue"
                       value={good.typeglue} 
                       onChange={handleChange}/>
                       {/* <div className='error'>{errors.material}</div> */}
                   </label>
                </div>
                <div className="create-goods__wrap create-goods__wrap--advantages">
                    <h3 className='create-goods__title'>Преимущества</h3>
                    {advantagesList}
                    <button className='button button--plus button--red' onClick={(e) => handleAddAdvantages(e)}>+</button>
                </div>
                <div className="create-goods__wrap">
                    <h3 className='create-goods__title'>К каким группам товарам относится данный товар</h3>
                    <SetContent process={process} component={renderMainParameters(filtersData)}/>
                </div>
                <div className="create-goods__wrap">
                    <h3 className='create-goods__title'>К каким группам рекомендаций относится данный товар</h3>
                    <SetContent process={process} component={renderRecommendParameters(recommendData)}/>
                </div>
                <div className="create-goods__wrap">
                    <h3 className='create-goods__title'>Параметры товара</h3>
                    <div className="parameters">
                        <SetContent process={process} component={renderParameters(parametersData)}/>
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
            <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/goods') :
                console.log('edit')} />
    </>
  )
}

export default EditGood;

