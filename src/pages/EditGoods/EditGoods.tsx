// import { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate} from 'react-router-dom';
// import fileImage from '../../assets/icons/file.svg'
// import PanelHeader from '../../components/PanelHeader/PanelHeader';
// import ModalAlert from '../../components/ModalAlert/ModalAlert';
// import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
// import Spinner from '../../components/Spinner/Spinner';
// import axios from 'axios';

// import { getOneGood, deleteGood } from '../../hooks/http.hook';

// import './_editGood.scss'

// const EditGood = () => {
//     const form = useRef<any>(null);
//     const {id} = useParams(); 
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState<boolean>(false);
//     const [showAlert, setShowAlert] = useState<boolean>(false); 
//     const [textAlert, setTextAlert] = useState<string>('');
//     const [showConfirm, setShowConfirm] = useState<boolean>(false);
//     const [del, setDel] = useState<boolean>(false)
//     const [errors, setErrors] = useState<any>({});
//     const [targetConfirm, setTargetConfirm] = useState({
//         id: 0,
//         name: ''
//     });

//     const [good, setGood] = useState({
//         id: 0,
//         imageurl: '',
//         material: '',
//         goodspersonalimages:  [],
//         goodsindustrialimages: [],
//         parameter: [],
//         mainparameter: [],
//         article: '',
//         advantages: [],
//         thickness: '',
//         volume: '',
//         pcs: '', 
//         basetype: '',
//         color: '',
//         heatresistance: '',
//         name: '',
//         description: '',
//         type: '',
//         size: '',
//         brand: '',
//         linertype: '',
//         pdfurl: '',
//         typeglue: '',
//         dencity: ''
//     }); 


//     const validateValues = (inputName:string, inputValue: string) => {

// 		let error = {
// 			title: '',
// 			content: '',
//             file: ''
// 		};

// 		switch(inputName) {
// 		case 'title':
// 			if (inputValue.length < 2) {
//                 error.title = "Название слишком короткое";
//                 } else {
//                 error.title = '';
//                 }
//                 break;
// 		case 'content':
// 			if (inputValue.length < 10) {
//                 error.content = "Текста слишком мало";
//                 } else {
//                 error.content = '';
//                 }
//                 break;
// 		case 'file':
// 			if (!inputValue) {
// 			error.file = "Прикрепите файл";
// 			} else {
// 			error.file = "";
// 			}
// 			break;
// 		default:
// 			console.error('Неизвестное поле');
// 		}

// 		return error;
// 	};

//   //отправляем запрос получния данных об админе
//     useEffect(() => { 
//         getOneGood(id).then(res => {
//             setKnowledge(res)
//         })
//     }, []);

//     const checkForm = () => {
// 		if (knowledge.title && knowledge.content) {
// 		for (let key in errors) {
// 			if (errors[key] !== '') {
// 			return true
// 			}
// 		}
// 		return false
// 		}
// 		return true
// 	}
// //обработчик текстовых инпутов
//     const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
//         const { name, value } = e.target;
//         setKnowledge((state:any) => ({...state, [name]: value}))
//         setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
//     }

//     const submitForm = async (e: any) => {
//         e.preventDefault()
//         setLoading(true);
//         const formData = new FormData(e.target.form);
//         formData.append('id', `${knowledge.id}`)
//         axios.put('http://192.168.0.153:5000/api/base', formData, {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//           })
//           .then(() => {
//             setLoading(false);
//             setShowAlert(true);
//             setTextAlert('База была успешно обновлена')
//           })
//           .catch(() => {
//             setLoading(false);
//             setShowAlert(true)
//             setTextAlert('Что-то пошло не так')
//         }).finally(() => {
//             setLoading(false);
//             setShowAlert(true)
//         })
//     }
  
    
//     const removeGood = (id: number) => {
//         setShowConfirm(false);
//         deleteGood(id)
//         setDel(true)
//         setShowAlert(true);
//         setTextAlert('База успешно удалена');
//     }
//   // показываем окно подтверждения
//     const onConfirmDelete = (id: number, title: string) => {
//         setShowConfirm(true);
//         setTargetConfirm({id, title})
//     }

//     const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g

//     let spinner = loading ? <Spinner active/> : null;

//     return (
//     <>
//        <PanelHeader title="Редактировать базу" children={null} showBackBtn={true} />
//        {spinner}
//        <form  className="create-goods" id="create-goods" ref={form} acceptCharset='utf-8'>
//                 <div className="create-goods__box">
//                 <label className="create-goods__label">
//                     <span>Название базы знаний</span>
//                     <input className={`input ${errors.title ? 'input--error' : ''}`} type="text" name="title"
//                     value={knowledge.title} 
//                     onChange={handleChange}/>
//                     <div className='error'>{errors.title}</div>
//                 </label>
//                 <label className="create-goods__label">
//                     <span>Содержание базы</span>
//                     <textarea className={`input input--textarea ${errors.content ? 'input--error' : ''}`} 
//                     name="content"
//                     value={knowledge.content}
//                     onChange={handleChange}/>
//                     <div className='error'>{errors.content}</div>
//                 </label>
//                 <label className="create-goods__label create-goods__input">
//                     <span>Загрузите файл</span>
//                     <input className='' type="file" name="file" id="file"
//                     onChange={handleChange}/>
//                     <img src={fileImage} alt="file_image" />
//                     <span>{knowledge.file ? knowledge.file.replace(regular, '') : 'Файл не выбран'}</span>
//                     <div className='error'>{errors.file}</div>
//                 </label>
                
//                 </div>
//                 <div className="create-goods__btns">
//                 <button type="button" className="create-goods__btn button button--orange"
//                 onClick={() => onConfirmDelete(knowledge.id, knowledge.title)}>Удалить базу</button>
//                 <button type="button" className="create-goods__btn button"
//                 disabled={checkForm()}
//                 onClick={(e) => {
//                     submitForm(e)
//                 }}>Обновить базу</button>
//                 </div>
//             </form>
//             <ConfirmModal question='Удалить базу?' text1={targetConfirm.title} text2={''} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeGood(targetConfirm.id)}/>
//             <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
//                 del ?
//                 navigate('/knowledge-list') :
//                 console.log('edit')} />
//     </>
//   )
// }

// export default EditGood;

