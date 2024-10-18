import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';

import { getOneNews, deleteNews } from '../../hooks/http.hook';

import './_editNews.scss'

const EditNews = () => {
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
        title: ''
    });

    const [news, setNews] = useState({
        id: 0,
        title: '',
        content: '',
        descr: '',
        imagessrc: [],
        files: ''
    }); 


    const validateValues = (inputName: string, inputValue: string) => {

		let error = {
			title: '',
            content: '',
            descr: '',
            files: ''
		};

		switch(inputName) {
		case 'title':
			if (inputValue.length < 2) {
                error.title = "Название слишком короткое";
                } else {
                error.title = '';
                }
                break;
        case 'descr':
            if (inputValue.length < 2) {
            error.descr = "Описание слишком короткое";
            } else {
            error.descr = "";
            }
            break;
        case 'content':
			if (inputValue.length < 2) {
			error.files = "Новость слишком короткая";
			} else {
			error.files = "";
			}
			break;
		case 'files':
			if (!inputValue) {
			error.files = "Прикрепите файлы";
			} else {
			error.files = "";
			}
			break;
		default:
			console.error('Неизвестное поле');
		}

		return error;
	};

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        getOneNews(id).then(res => {
            setNews(res)
        })
    }, []);

    const checkForm = () => {
		if (news.title && news.content) {
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
        setNews((state:any) => ({...state, [name]: value}))
        console.log(value)
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${news.id}`)
        axios.put('http://192.168.0.153:5000/api/news', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true); 
            setTextAlert('Новость была успешно обновлена')
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
  
    
    const removeNews = (id: number) => {
        setShowConfirm(false);
        deleteNews(id)
        setDel(true)
        setShowAlert(true);
        setTextAlert('Новость успешно удалена');
    }
  // показываем окно подтверждения
    const onConfirmDelete = (id: number, title: string) => {
        setShowConfirm(true);
        setTargetConfirm({id, title})
    }

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

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

    const imagesItemsFromUpload = () => {

        let arrayForIteration = [];

        for (let key in fileInput?.current?.files) {
            if (Number.isInteger(Number(key))) {
                arrayForIteration.push(fileInput?.current?.files[key].name)
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

   imagesItemsFromBackend(news.imagessrc)

    let images;

    images = (fileInput?.current?.files?.length) > 0 ? imagesItemsFromUpload() : ((news?.imagessrc?.length > 0) ? imagesItemsFromBackend(news.imagessrc) : 'нет картинок')

    return (
    <>
       <PanelHeader title="Редактировать новость" children={null} showBackBtn={true} />
       {spinner}
            <form  className="create-news" id="create-news" ref={form} acceptCharset='utf-8'>
                <div className="create-news__box">
                <label className="create-news__label">
                    <span>Название новости</span>
                    <input className={`input ${errors.title ? 'input--error' : ''}`} type="text" name="title"
                    value={news.title} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.title}</div>
                </label>

                <label className="create-news__label">
                    <span>Краткое описание новости</span>
                    <input className={`input ${errors.descr ? 'input--error' : ''}`} type="text" name="descr"
                    value={news.descr} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.descr}</div>
                </label>

                <label className="create-knowlege__label">
                    <span>Содержание новости</span>
                    <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={news.content}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div>
                </label>

                <label className="create-news__label create-news__input">
                    <span>Загрузите файлы, если хотите заменить существующие</span>
                    <input className='' type="file" name="files" multiple
                    onChange={handleChange} ref={fileInput}/>
                    <button className='button' type="button">Загрузить файлы</button>
                    <div className='error'>{errors.file}</div>
                </label>
                <div className="create-news__image-wrapper">
                    {
                        images
                    }
                </div>
                {/* <label className="create-news__label create-news__input">
                    <span>Загрузите файлы, если хотите заменить существующие</span>
                    <input className='' type="file" name="files" multiple
                    onChange={handleChange}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{sertificate.file ? sertificate.file.replace(regular, '') : (sertificate.imagesrc ? sertificate.imagesrc.replace(regular, '') : 'Файла нет')}</span>
                    <div className='error'>{errors.file}</div>
                </label>*/}
                </div>
                <div className="create-news__btns">
                <button type="button" className="create-news__btn button button--orange"
                onClick={() => onConfirmDelete(news.id, news.title)}>Удалить новость</button>
                <button type="button" className="create-news__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить новость</button>
                </div>
            </form>
            <ConfirmModal question='Удалить новость?' text1={targetConfirm.title} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeNews(targetConfirm.id)}/>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/news') :
                console.log('edit')} />
    </>
  )
}

export default EditNews;

