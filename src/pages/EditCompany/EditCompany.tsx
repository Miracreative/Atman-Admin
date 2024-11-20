import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import fileImage from '../../assets/icons/file.svg'
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import Spinner from '../../components/Spinner/Spinner';
import InputMask from 'react-input-mask';

import axios from 'axios';

import { getCompany } from '../../hooks/http.hook';

import './_editCompany.scss'

const EditCompany = () => {
    const form = useRef<any>(null);
    const fileInput = useRef<any>(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    const [textAlert, setTextAlert] = useState<string>('');
    const [del, setDel] = useState<boolean>(false)
    const [errors, setErrors] = useState<any>({});

    const [company, setCompany] = useState({
        id: 0,
        shortname: '',
        actualaddress: '',
        postaladdress: '',
        legaladdress: '',
        director: '',
        phone: '',
        email: '',
        website: '',
        inn: '',
        kpp: '',
        okpo: '',
        ogrn: '',
        okved: '',
        bankname: '',
        accountnumber: '',
        correspondentaccount: '',
        bic: '',
        file: ''
    }); 
    
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

    let companyFile;

    companyFile = (fileInput?.current?.value.length > 0) ? fileInput.current.value.replace(regular, '') : (company.file ? company.file.replace(regular, '') : 'Файл не выбран')


    const validateValues = (inputName:string, inputValue: string) => {

		let error = {
			fullname: '',
            shortname: '',
            actualaddress: '',
            postaladdress: '',
            legaladdress: '',
            director: '',
            phone: '',
            email: '',
            website: '',
            inn: '',
            kpp: '',
            okpo: '',
            ogrn: '',
            okved: '',
            bankname: '',
            accountnumber: '',
            correspondentaccount: '',
            bic: '',
            file: ''
		};

		switch(inputName) {
            case 'fullname':
                if (inputValue.length < 5) {
                    error.fullname = "Название слишком короткое";
                    } else {
                    error.fullname = '';
                    }
                    break;
            case 'shortname':
                if (inputValue.length < 2) {
                    error.shortname = "Название слишком короткое";
                    } else {
                    error.shortname = '';
                    }
                    break;
            case 'actualaddress':
                if (inputValue.length < 10) {
                    error.actualaddress = "Адрес слишком короткий";
                    } else {
                    error.actualaddress = '';
                    }
                    break;
            case 'postaladdress':
                if (inputValue.length < 10) {
                    error.postaladdress = "Адрес слишком короткий";
                    } else {
                    error.postaladdress = '';
                    }
                    break;
            case 'legaladdress':
                if (inputValue.length < 10) {
                    error.legaladdress = "Адрес слишком короткий";
                    } else {
                    error.legaladdress = '';
                    }
                    break;
            case 'director':
                if (inputValue.length < 10) {
                    error.director = "Имя директора солишком короткое";
                    } else {
                    error.director = '';
                    }
                    break;
            case 'email':
                let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\.[a-z]{2,6}$/i;
                if (!emailRegExp.test(inputValue)) {
                error.email = "Email некорректный"
                } else {
                error.email = "";
                }
                break;
            case 'phone':
                if (inputValue.length < 15) {
                    error.phone = "Телефон слишком короткий";
                    } else {
                    error.phone = '';
                    }
                break;
            case 'website':
                if (inputValue.length < 5) {
                    error.website = "Название web-сайта солишком короткое";
                    } else {
                    error.website = '';
                    }
                    break;
            case 'inn':
                if (inputValue.length < 9) {
                    error.inn = "ИНН слишком короткий";
                    } else {
                    error.inn = '';
                    }
                    break;
            case 'kpp':
                if (inputValue.length < 8) {
                    error.kpp = "КПП слишком короткий";
                    } else {
                    error.kpp = '';
                    }
                    break;
            case 'okpo':
                if (inputValue.length < 7) {
                    error.okpo = "ОКПО слишком короткий";
                    } else {
                    error.okpo = '';
                    }
                    break;
            case 'ogrn':
                if (inputValue.length < 11) {
                    error.ogrn = "ОГРН слишком короткий";
                    } else {
                    error.ogrn = '';
                    }
                    break;
            case 'okved':
                if (inputValue.length < 3) {
                    error.okved = "ОКВЭД слишком короткий";
                    } else {
                    error.okved = '';
                    }
                    break;
            case 'bankname':
                if (inputValue.length < 9) {
                    error.bankname = "Название банка слишком короткое";
                    } else {
                    error.bankname = '';
                    }
                    break;
            case 'accountnumber':
                if (inputValue.length < 19) {
                    error.accountnumber = "Номер расчетного счета слишком короткий";
                    } else {
                    error.accountnumber = '';
                    }
                    break;
            case 'correspondentaccount':
                if (inputValue.length < 19) {
                    error.correspondentaccount = "Номер корреспондетского счета слишком короткий";
                    } else {
                    error.correspondentaccount = '';
                    }
                    break;
            case 'bic':
                if (inputValue.length < 19) {
                    error.bic = "БИК слишком короткий";
                    } else {
                    error.bic = '';
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

  //отправляем запрос получния данных об админе
    useEffect(() => { 
        getCompany().then(res => {
            setCompany(res)
        })
    }, []);

    const checkForm = () => {
		if (company.name) {
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
        setCompany((state:any) => ({...state, [name]: value}))
        setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
    }

    const submitForm = async (e: any) => {
        e.preventDefault()
        setLoading(true);
        const formData = new FormData(e.target.form);
        formData.append('id', `${company.id}`)
        axios.put('http://83.147.246.205:5000/api/company', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Сотрудник был успешно обновлен')
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
  


    let spinner = loading ? <Spinner active/> : null;

    return (
    <>
       <PanelHeader title="Редактировать сотрудника" children={null} showBackBtn={true} />
       {spinner}
       <form  className="create-company" id="create-company" ref={form} acceptCharset='utf-8'>
            <div className='create-company__inner'>
                <div className="create-company__right">
                <div className="create-company__col-box">
                    <div className="create-company__col">
                    <label className="create-company__label">
                        <span>Имя сотрудника</span>
                        <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
                        value={company.name} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.name}</div>
                    </label>
                    <label className="create-company__label create-company__input">
                        <span>Загрузите фото</span>
                        <input className='' type="file" name="file" id="file" ref={fileInput}
                        onChange={handleChange}/>
                        <img src={fileImage} alt="file_image" />
                        <span>{companyFile}</span>
                    </label>
                   
                </div>
                <div className="create-company__col">
                    <label className="create-company__label">
                        <span>E-mail</span>
                        <input className={`input ${errors.email ? 'input--error' : ''}`} type="text" name="email"
                        value={company.email} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.email}</div>
                    </label>
                    <label className="create-company__label">
                        <span>WhatsApp</span>
                        {
                            <InputMask 
                                mask="8-999-999-99-99" 
                                maskChar=" " 
                                className="input" 
                                value={company.watsapp} 
                                name="watsapp" 
                                onChange={handleChange}
                            />
                        }
                        <div className='error'>{errors.watsapp}</div>
                    </label>
                </div>
                
                </div>
                <label className="create-company__label create-company--textarea">
                    <span>Описание</span>
                    <textarea className={`input input--textarea  ${errors.descr ? 'input--error' : ''}`} 
                    name="descr"
                    value={company.descr}
                    onChange={handleChange}/>
                    <div className='error'>{errors.descr}</div>
                </label>
                </div>
                
                </div>
                
                <div className="create-company__btns">
                <button type="button" className="create-company__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                }}>Обновить сотрудника</button>
                </div>
            </form>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => 
                del ?
                navigate('/companys') :
                console.log('edit')} />
    </>
  )
}

export default EditCompany;

