import {useState} from 'react';
import generatePass from '../../services/GeneratePass';
import './_adminForm.scss'
import unsecret from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';



const AdminForm = ({admin, setAdmin, buttonTitle, sendData, form} : {
    admin: {
      name: string,
      email: string,
      role: string,
      password: string,
      repeatPass: string
    },
    setAdmin: (value: any) => void,
    buttonTitle: string,
    sendData: () => void,
    form: any
}) => {
    const [errors, setErrors] = useState<any>({});
    const [showPass, setShowPass] = useState({
        password: false,
        repeatPass: false
    });
    const validateValues = (inputName:string, inputValue: string) => {

    let error = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    switch(inputName) {
      case 'name':
        if (inputValue.length < 2) {
          error.name = "Имя слишком короткое";
        } else {
          error.name = '';
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
      case 'password':
        if (inputValue.length < 6) {
          error.password = "Пароль очень короткий";
        } else {
          error.password = "";
        }
        break;
      case 'repeatPass':
        if (inputValue !== admin.password) {
          error.repeatPassword = "Пароли не совпадают";
        } else {
          error.repeatPassword = "";
        }
        break;
      default:
          console.error('Неизвестное поле');
    }
 
    return error;
  };

  const checkForm = () => {
    if (admin.name && admin.email && admin.password && admin.repeatPass && admin.role) {
      for (let key in errors) {
        if (errors[key] !== '') {
          return true
        }
      }
      return false
    }
    return true
  }
  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAdmin((state: any) => ({...state, [name]: value}))
    setErrors((state: any) => ({...state, ...validateValues(e.target.name, e.target.value)}))
  }

  const clearForm = () => {
    setAdmin((state: any) => {
      let newState = {...state}
      for (let key in newState) {
        newState[key] = '';
      }
      return newState;
    })
  }



  return (
    <form className="create-admin" ref={form}>
        <div className="create-admin__box">
          <label className="create-admin__label">
            <span>Имя</span>
            <input className={`input ${errors.name ? 'input--error' : ''}`} type="text" name="name"
            value={admin.name} 
            onChange={handleChange}/>
            <div className='error'>{errors.name}</div>
          </label>
          <label className="create-admin__label">
            <span>E-mail</span>
            <input className={`input ${errors.email ? 'input--error' : ''}`} type="text" name="email"
            value={admin.email}
            onChange={handleChange}/>
            <div className='error'>{errors.email}</div>
          </label>
          <label className="create-admin__label">
            <span>Пароль</span>
            <input className={`input ${errors.password ? 'input--error' : ''}`} name="password"
              type={showPass.password ? 'text' : 'password'}
              value={admin.password}
              autoComplete='off'
              onChange={handleChange}/>
              <div className='error'>{errors.password}</div>
            <img
              onClick={() => setShowPass(state => ({...state, password: !state.password}))}
              src={showPass.password ? unsecret : secret}
              alt="show pass"/>
            <button className="create-admin__gen" type="button"
              onClick={() => {
                setAdmin((state: any) => ({...state, password: generatePass()}))
                setErrors((state: any) => ({...state, password: ''}))
              }}>
                Кликните здесь, чтобы создать пароль автоматически
              </button>
          </label>
          <label className="create-admin__label">
            <span>Повторите пароль</span>
            <input className={`input ${errors.repeatPassword ? 'input--error' : ''}`} name="repeatPass"
              type={showPass.repeatPass ? 'text' : 'password'}
              value={admin.repeatPass}
              autoComplete='off'
              onChange={handleChange}/>
              <div className='error'>{errors.repeatPassword}</div>
            <img
              onClick={() => setShowPass(state => ({...state, repeatPass: !state.repeatPass }))}
              src={showPass.repeatPass ? unsecret : secret}
              alt="show pass"/>
          </label>
        </div>

        <div className="create-admin__box">
          <label className="create-admin__label">
            <span>Роль администратора</span>
            <div className="create-admin__checkboxes">
            <label className="create-admin__checkbox">
              <input className="sr-only" type="radio" name="role" value="admin"
              checked={admin.role === 'admin' ? true : false}
              onChange={handleChange}/>
              <span>Супер-админ</span>
            </label>
            <label className="create-admin__checkbox">
              <input className="sr-only" type="radio" name="role" value="user"
              checked={admin.role === 'user' ? true : false}
              onChange={handleChange}/>
              <span>Админ</span>
            </label>
            </div>
          </label>
          
        </div>
        <div className="create-admin__btns">
          <button type="button" className="create-admin__btn button button--orange"
          onClick={clearForm}>Очистить форму</button>
          <button type="button" className="create-admin__btn button" disabled={checkForm()}
          onClick={() => {
            sendData();
            clearForm();
          }}>{buttonTitle}</button>
        </div>
    </form>
  )
}

export default AdminForm;