import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
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

import { getOneNews, deleteNews } from '../../hooks/http.hook';

import './_editNews.scss'

const EditNews = () => {
    const form = useRef<any>(null);
    const fileInput = useRef<any>(null)
    const mainInput = useRef<any>(null)
    const {id} = useParams(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    const [textAlert, setTextAlert] = useState<string>('');
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({});
    const [oldText, setOldText] = useState<string>('')
 
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
        files: '',
        main: '',
        mainimage: ''
    }); 

    const mkdStr = ``;
    const [value, setValue] = useState(mkdStr);
    const ref = useRef<MDXEditorMethods>(null);
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
			error.content = "Новость слишком короткая";
			} else {
			error.content = "";
			}
			break;
        case 'mainimage':
        if (!inputValue) {
        error.files = "Прикрепите файл";
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
            setOldText(res.content)
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
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${news.id}`)
        if(news.content.length > 0) {
            formData.append('content', `${news.content}`)
        } else {
            formData.append('content', `${oldText}`)
        }
        axios.put('https://api.atman-auto.ru/api/news', formData, {
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

    const changeContent = (e: any) => {
        setValue(value)
        setNews((state:any) => ({...state, content: e}))
    }

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
                    {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={news.content}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div> */}
                    <div className="create-knowlege__text">
                        <ReactMarkdown>{oldText}</ReactMarkdown>
                    </div>
                </label>
                <label className="create-knowlege__label">
                    <span>Перепишите текст новости, если это необходимо</span>
                    {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={news.content}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div> */}
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

                <label className="create-news__label create-news__input">
                    <span>Загрузите файлы, если хотите заменить существующие</span>
                    <input className='' type="file" name="files" multiple
                    onChange={handleChange} ref={fileInput}/>
                    <button className='button' type="button">Загрузить файлы</button>
                </label>
                <div className="create-news__image-wrapper">
                    {
                        images
                    }
                </div>
                <label className="create-knowlege__label create-knowlege__input">
                    <span>Загрузите файл</span>
                    <input className='' type="file" name="mainimage" id="main"
                    onChange={handleChange} ref={mainInput}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{(mainInput?.current?.value.length > 0) ? mainInput?.current?.value.replace(regular, '') : (news.main ? news.main.replace(regular, '') : 'Файл не выбран')}</span>
                    <div className='error'>{errors.mainimage}</div>
                </label>
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

