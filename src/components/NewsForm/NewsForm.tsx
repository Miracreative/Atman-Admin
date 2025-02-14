import { useState, useRef, useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg'
import axios from 'axios';
import './_newsForm.scss';

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

const NewsForm = ({news, setNews, buttonTitle, form} : {
        news: {
            title: string,
            content: string,
            descr: string,
            imagessrc: string[],
            main: string,
            mainimage: any,
            files: any
		},
		setNews: (value: any) => void,
		buttonTitle: string,
		form: any
	}) => {
    const mkdStr = ``;
    const [value, setValue] = useState(mkdStr);
    const ref = useRef<MDXEditorMethods>(null);
    const fileInput = useRef<any>(null)
    const mainInput = useRef<any>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    const [textAlert, setTextAlert] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const validateValues = (inputName:string, inputValue: string) => {

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
        case 'files':
            if (!inputValue) {
            error.files = "Прикрепите файлы";
            } else {
            error.files = "";
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

    const checkForm = () => {
        if (news.title && news.files && news.descr && news.content) {
        
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
        setNews((state:any) => ({...state, [name]: value}))
      
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
        console.log(news)
    }

	const clearForm = () => {
        form.current.reset()
        ref.current?.setMarkdown('')
		setNews((state: any) => {
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
        formData.append('content', `${news.content}`)
        axios.post('https://api.atman-auto.ru/api/news', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'multipart/form-data'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новая новость была успешно создана')
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

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

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

    let images;

    images = (fileInput?.current?.files?.length) > 0 ? imagesItemsFromUpload() : <span className="create-news__span">Пока еще нет картинок</span>  

    const changeContent = (e: any) => {
        setValue(value)
        setNews((state:any) => ({...state, content: e}))
    }
	return (
        <>
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

                {/* <label> */}
                    <span>Содержание новости</span>
                    {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={news.content}
                    onChange={handleChange}/>
                    <div className='error'>{errors.content}</div> */}
                {/* </label> */}
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
                <div className='error'>{errors.content}</div>
                <label className="create-news__label create-news__input">
                    <input className='create-news__into' type="file" name="files" multiple
                    onChange={handleChange} ref={fileInput}/>
                    <button className='button' type="button">Загрузить файлы</button>
                    <div className='error'>{errors.files}</div>
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
                <div className="create-knowlege__btns">
                <button type="button" className="create-knowlege__btn button button--orange"
                onClick={clearForm}>Очистить форму</button>
                <button type="button" className="create-knowlege__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                    clearForm();
                }}>{buttonTitle}</button>
                </div>
            </form>
            <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
        </>
	)
}

export default NewsForm;