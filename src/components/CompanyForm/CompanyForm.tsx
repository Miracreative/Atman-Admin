import { useState, useRef} from 'react';
import Spinner from '../Spinner/Spinner';
import ModalAlert from '../ModalAlert/ModalAlert';
import fileImage from '../../assets/icons/file.svg'
import InputMask from 'react-input-mask';
import axios from 'axios';
import './_companyForm.scss'

const CompanyForm = ({company, setCompany, buttonTitle, form} : {
        company: {
        fullname: string,
        shortname: string,
        actualaddress: string,
        postaladdress: string,
        legaladdress: string,
        director: string,
        phone: string,
        email: string,
        website: string,
        inn: string,
        kpp: string,
        okpo: string,
        ogrn: string,
        okved: string,
        bankname: string,
        accountnumber: string,
        correspondentaccount: string,
        bic: string,
        file: any
		},
		setCompany: (value: any) => void,
		buttonTitle: string,
		form: any
	}) => {
        const [loading, setLoading] = useState(false);
        const [textAlert, setTextAlert] = useState('');
        const [showAlert, setShowAlert] = useState(false);
		const [errors, setErrors] = useState<any>({});
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
            let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\-+[a-z.]+\.[a-z]{2,6}$/i;
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
            if (inputValue.length < 9) {
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
    const regular = /^.*[\/\\]| \(\d+\)\.\w+$/g;

    const fileInput = useRef<any>(null)

    let companyFile;

    companyFile = (fileInput?.current?.value.length > 0) ? fileInput?.current?.value.replace(regular, '') : 'Файл не выбран'

	const checkForm = () => {
		if (company.fullname && fileInput?.current?.value.length > 0 && company.shortname && company.actualaddress && company.postaladdress && company.legaladdress && company.director && company.phone && company.email && company.website && company.inn && company.kpp && company.okpo && company.ogrn && company.okved && company.bankname && company.accountnumber && company.correspondentaccount && company.bic && company.file) {
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
		setCompany((state: any) => ({...state, [name]: value}))
		setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
	}

	const clearForm = () => {
        form.current.reset()
		setCompany((state: any) => {
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
        formData.delete('fullname')
        formData.append('fullName', `${company.fullname}`);
        formData.delete('shortname');
        formData.append('shortName', `${company.shortname}`);
        formData.delete('actualaddress');
        formData.append('actualAddress', `${company.actualaddress}`);
        formData.delete('postaladdress');
        formData.append('postalAddress', `${company.postaladdress}`);
        formData.delete('legaladdress');
        formData.append('legalAddress', `${company.legaladdress}`);
        formData.delete('inn');
        formData.append('INN', `${company.inn}`);
        formData.delete('kpp');
        formData.append('KPP', `${company.kpp}`);
        formData.delete('okpo');
        formData.append('OKPO', `${company.okpo}`);
        formData.delete('ogrn');
        formData.append('OGRN', `${company.ogrn}`);
        formData.delete('okved');
        formData.append('OKVED', `${company.okved}`);
        formData.delete('bankname');
        formData.append('bankName', `${company.bankname}`);
        formData.delete('accountnumber');
        formData.append('accountNumber', `${company.accountnumber}`);
        formData.delete('correspondentaccount');
        formData.append('correspondentAccount', `${company.correspondentaccount}`);
        formData.delete('bic');
        formData.append('BIC', `${company.bic}`);
        axios.post('http://83.147.246.205:5000/api/company', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(() => {
            setLoading(false);
            setShowAlert(true);
            setTextAlert('Новая компания была успешно создана')
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
            {spinner}
            <form  className="create-company" id="create-company" ref={form} acceptCharset='utf-8'>
            <div className='create-company__inner'>
                <div className="create-company__right">
                <div className="create-company__col-box">
                    <div className="create-company__col">
                    <label className="create-company__label">
                        <span>Наименование предприятия полное:</span>
                        <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="fullname"
                        value={company.fullname} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.fullname}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Наименование предприятия краткое:</span>
                        <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="shortname"
                        value={company.shortname} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.shortname}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Фактический адрес:</span>
                        <input className={`input ${errors.actualaddress ? 'input--error' : ''}`} type="text" name="actualaddress"
                        value={company.actualaddress} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.actualaddress}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Почтовый адрес:</span>
                        <input className={`input ${errors.postaladdress ? 'input--error' : ''}`} type="text" name="postaladdress"
                        value={company.postaladdress} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.postaladdress}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Юридический адрес:</span>
                        <input className={`input ${errors.legaladdress ? 'input--error' : ''}`} type="text" name="legaladdress"
                        value={company.legaladdress} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.legaladdress}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Директор:</span>
                        <input className={`input ${errors.director ? 'input--error' : ''}`} type="text" name="director"
                        value={company.director} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.director}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Телефон:</span>
                        {
                            <InputMask 
                                mask="8-999-999-99-99" 
                                maskChar=" " 
                                className="input" 
                                value={company.phone} 
                                name="phone" 
                                onChange={handleChange}
                            />
                        }
                        <div className='error'>{errors.phone}</div>
                    </label>
                    <label className="create-company__label">
                        <span>E-mail</span>
                        <input className={`input ${errors.email ? 'input--error' : ''}`} type="text" name="email"
                        value={company.email} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.email}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Веб-сайт:</span>
                        <input className={`input ${errors.website ? 'input--error' : ''}`} type="text" name="website"
                        value={company.website} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.website}</div>
                    </label>
                    <label className="create-company__label create-company__input">
                        <span>Загрузите карточку компании</span>
                        <input className='' type="file" name="file" id="file" ref={fileInput}
                        onChange={handleChange}/>
                        <img src={fileImage} alt="file_image" />
                        <span>{companyFile}</span>
                    </label>
                   
                </div>
                <div className="create-company__col">
                    <label className="create-company__label">
                        <span>ИНН:</span>
                        <input className={`input ${errors.inn ? 'input--error' : ''}`} type="text" name="inn"
                        value={company.inn} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.inn}</div>
                    </label>
                    <label className="create-company__label">
                        <span>КПП:</span>
                        <input className={`input ${errors.kpp ? 'input--error' : ''}`} type="text" name="kpp"
                        value={company.kpp} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.kpp}</div>
                    </label>
                    <label className="create-company__label">
                        <span>ОКПО:</span>
                        <input className={`input ${errors.okpo ? 'input--error' : ''}`} type="text" name="okpo"
                        value={company.okpo} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.okpo}</div>
                    </label>
                    <label className="create-company__label">
                        <span>ОГРН:</span>
                        <input className={`input ${errors.ogrn ? 'input--error' : ''}`} type="text" name="ogrn"
                        value={company.ogrn} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.ogrn}</div>
                    </label>
                    <label className="create-company__label">
                        <span>ОКВЭД:</span>
                        <input className={`input ${errors.okved ? 'input--error' : ''}`} type="text" name="okved"
                        value={company.okved} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.okved}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Наименование банка:</span>
                        <input className={`input ${errors.bankname ? 'input--error' : ''}`} type="text" name="bankname"
                        value={company.bankname} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.bankname}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Расчетный счет:</span>
                        <input className={`input ${errors.accountnumber ? 'input--error' : ''}`} type="text" name="accountnumber"
                        value={company.accountnumber} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.accountnumber}</div>
                    </label>
                    <label className="create-company__label">
                        <span>Корреспондентский счет:</span>
                        <input className={`input ${errors.correspondentaccount ? 'input--error' : ''}`} type="text" name="correspondentaccount"
                        value={company.correspondentaccount} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.correspondentaccount}</div>
                    </label>
                    <label className="create-company__label">
                        <span>БИК:</span>
                        <input className={`input ${errors.bic ? 'input--error' : ''}`} type="text" name="bic"
                        value={company.bic} 
                        onChange={handleChange}/>
                        <div className='error'>{errors.bic}</div>
                    </label>
                </div>
                
                </div>
                
                </div>
                
                
                </div>
                <div className="create-company__btns">
                <button type="button" className="create-company__btn button button--orange"
                onClick={clearForm}>Очистить форму</button>
                <button type="button" className="create-company__btn button"
                disabled={checkForm()}
                onClick={(e) => {
                    submitForm(e)
                    clearForm();
                }}>{buttonTitle}</button>
                </div>
            </form>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
        </>
	)
}

export default CompanyForm;