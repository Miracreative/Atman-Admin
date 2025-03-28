import { useState, useRef} from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg'
import axios from 'axios';
import './_knowlegeForm.scss'

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

const KnowlegeForm = ({knowledge, setKnowlege, buttonTitle, form} : {
        knowledge: {
            title: string,
            content: string,
            file: any
		},
		setKnowlege: (value: any) => void,
		buttonTitle: string, 
		form: any
	}) => {
        const [loading, setLoading] = useState(false);
        const [textAlert, setTextAlert] = useState('');
        const [showAlert, setShowAlert] = useState(false);
		const [errors, setErrors] = useState<any>({});
        const mkdStr = ``;
        const [value, setValue] = useState(mkdStr);
        const ref = useRef<MDXEditorMethods>(null);
		const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			title: '',
			content: '',
            file: ''
		};

		switch(inputName) {
		case 'title':
			if (inputValue.length < 2) {
                error.title = "Название слишком короткое";
                } else {
                error.title = '';
                }
                break;
		case 'content':
			if (inputValue.length < 10) {
                error.content = "Текста слишком мало";
                } else {
                error.content = '';
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

	const checkForm = () => {
		if (knowledge.title && knowledge.content && knowledge.file) {
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
		setKnowlege((state: any) => ({...state, [name]: value}))
		setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
	}

	const clearForm = () => {
        form.current.reset();
        ref.current?.setMarkdown('')
		setKnowlege((state: any) => {
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
        formData.append('content', `${knowledge.content}`)
        axios.post('https://api.atman-auto.ru/api/base', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новая база была успешно создана') 
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

    const changeContent = (e: any) => {
        setValue(value)
        setKnowlege((state:any) => ({...state, content: e}))
    }

    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

    let spinner = loading ? <Spinner active/> : null;

	return (
        <>
            {spinner}
            <form acceptCharset='utf-8' className="create-knowlege" id="create-knowlege" ref={form}>
                <div className="create-knowlege__box">
                <label className="create-knowlege__label">
                    <span>Название базы знаний</span>
                    <input className={`input ${errors.title ? 'input--error' : ''}`} type="text" name="title"
                    value={knowledge.title} 
                    onChange={handleChange}/>
                    <div className='error'>{errors.title}</div>
                </label>
                {/* <label className="create-knowlege__label"> */}
                    <span>Содержание базы</span>
                    {/* <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
                    name="content"
                    value={knowledge.content}
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
                        // quotePlugin(),
                        thematicBreakPlugin(),
                        markdownShortcutPlugin(),
                        frontmatterPlugin(),
                    ]}
                />
                <label className="create-knowlege__label create-knowlege__input">
                    <span>Загрузите файл</span>
                    <input className='' type="file" name="file" id="file"
                    onChange={handleChange}/>
                    <img src={fileImage} alt="file_image" />
                    <span>{knowledge.file ? knowledge.file.replace(regular, '') : 'Файл не выбран'}</span>
                    <div className='error'>{errors.file}</div>
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

export default KnowlegeForm;