import {useEffect, useState, useRef} from "react";
import title from './../../assets/icons/logo-atman.svg';
import showPass from './../../assets/icons/show-pass.svg';
import secret from './../../assets/icons/secret.svg';
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import {reset} from './../../hooks/http.hook';
import Spinner from "../../components/Spinner/Spinner";
import { Link, NavLink } from "react-router-dom";
import "./_recovery.scss";

const Recovery = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false)
    const [valid, setValid] = useState(true);
    const [sendEmailOnApi, setSendEmailOnApi] = useState(false);
    const [confirmCode, setConfirmCode] = useState(false)
    const [confirmError, setConfirmError] = useState(false)
    const [showAlert, setShowAlert] = useState<boolean>(false); 
    const [textAlert, setTextAlert] = useState<string>('');

    let clazz;
    valid ? clazz = "input" : clazz = "input input--error";

    let spinner;

    loading ? spinner = <Spinner active={true}/> : spinner = <Spinner active={false} />

    const button = useRef<any>(0);

    useEffect(() => {
        if (button?.current !== null) {
            button.current.setAttribute('disabled', true)
        }
    }, [])


    const onLogEmailChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        setEmail(e.target.value);
    }

    // const onLogCodeChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    //     setCode(e.target.value);
    // }

    const onCheckDisable = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
        let emailRegExp = /^[a-zA-Z0-9._]+@[a-z.]+\.[a-z]{2,6}$/i;
        let res = emailRegExp.test(e.target.value);
        console.log(res);
        if (res) {
            button.current.removeAttribute( "disabled" );
            setValid(true);
        } else {
            button.current.setAttribute( "disabled", true );
            setValid(false)
        }
    }

    // const onCheckDisableConfirm = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    //     if (e.target.value.length === 5) {
    //         button.current.removeAttribute( "disabled" );
    //         setValid(true);
    //     } else {
    //         button.current.setAttribute( "disabled", true );
    //         setValid(false)
    //     }
    // }

    const sendEmailAddress = (email: string) => {
        setLoading(true);
        reset(email).then(() => {
            setLoading(false);
            setTextAlert('Письмо отправлено');
            setShowAlert(true);
        }).catch((e) => {
            console.log(e)
            setTextAlert('Письмо не отправлено');
            setShowAlert(true);
            setLoading(false);
        })
    }

    // const sendCode = () => {
    //     // setLoading(true);
    
    // }


    // let setContent;
    // setContent = sendEmailOnApi ? ( confirmCode ? <NewPassword setConfirmCode={setConfirmCode}/> : <Confirmation clazz={clazz} code={code} onLogCodeChange={onLogCodeChange} setSendEmailOnApi={setSendEmailOnApi} onCheckDisableConfirm={onCheckDisableConfirm} button={button} sendCode={sendCode} confirmError={confirmError} email={email} sendEmailAddress={sendEmailAddress}  />) : <InputEmail clazz={clazz} email={email} onLogEmailChange={onLogEmailChange} onCheckDisable={onCheckDisable} button={button} sendEmailAddress={sendEmailAddress}/>

    return (
        <div className="recovery__container">
            <div className="recovery__wrapper">
                <div className="title">
                    <img src={title} alt="tummies"/>
                </div>
                <p className="subtitle">Восстановление пароля</p>
            </div>
            
            <form className="login__form">
                {spinner}
                {/* {setContent}
                 */}
                 <InputEmail clazz={clazz} email={email} onLogEmailChange={onLogEmailChange} onCheckDisable={onCheckDisable} button={button} sendEmailAddress={sendEmailAddress}/>
            </form>
            <ModalAlert alertBtnOpacity showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => setShowAlert(false)} />
        </div>
    )
}



export default Recovery; 

const InputEmail = ({clazz, email, onLogEmailChange, onCheckDisable, button, sendEmailAddress} :
    {clazz: string,
     email: string, 
     onLogEmailChange: (email: any) => void,
     onCheckDisable: (email: any) => void,
     button: React.RefObject<HTMLButtonElement>,
     sendEmailAddress: (email: string) => void
    }
) => {
    return (
        <>
            <label className="label">
                    Email
                    <input 
                    type="email" 
                    name="login" 
                    className={clazz}
                    value={email}
                    onChange={(e) => {
                        onLogEmailChange(e);
                        onCheckDisable(e);
                    }}
                    >

                    </input>
                </label>
                <p className="description">Вы получите email cо ссылкой на сброс пароля</p>
                <button 
                    ref={button}
                    className="button" 
                    type="button"
                    onClick={() => sendEmailAddress(email)}
                    >Сброс пароля</button>
                <NavLink to="/" className="navlink" >
                    <button 
                    className="button" 
                    >Назад</button>
                </NavLink>    
                    
        </>
    )
}

// const Confirmation = ({clazz, code, onLogCodeChange, onCheckDisableConfirm, button, sendCode, confirmError, sendEmailAddress, email, setSendEmailOnApi}) => {

//     const [ seconds, setSeconds ] = useState(60);
//     const [ timerActive, setTimerActive ] = useState(true);

//     const resent = useRef(0)
//     useEffect(() => {
//         if (seconds > 0 && timerActive) {
//           setTimeout(setSeconds, 1000, seconds - 1);
//           resent.current.setAttribute('disabled', true)
//         } else {
//           setTimerActive(false);
//           resent.current.removeAttribute('disabled')
//         }
//       }, [ seconds, timerActive ]);


//     let counterClazz;
//     counterClazz = timerActive ? "recovery__counter" : "recovery__counter recovery__counter--opacity"

//     let btnClazz;
//     btnClazz = timerActive ? "button button--orange button--orange-opacity" : "button button--orange"


    
//     return (
//         <>
//             <label className="label">
//                 Confirmation code
//                 <input 
//                 type="number" 
//                 name="login" 
//                 className={clazz}
//                 value={code}
//                 onChange={(e) => {onLogCodeChange(e)}}
//                 onInput={(e) => {onCheckDisableConfirm(e)}}
//                 >

//                 </input>
//             </label>
//             <button ref={resent} className={btnClazz} onClick={() => sendEmailAddress(email)}>Resend after</button>
//             <div className={counterClazz}>{seconds}</div>
//             {confirmError ?  <p className="error">Incorrect code</p> : null}
//             <button 
//                 ref={button}
//                 className="button" 
//                 type="button"
//                 onClick={() => sendCode(code)}
//                 >Confirm
//                 </button>
//             <div className="navlink" onClick={() => setSendEmailOnApi(false)}>
//                 <button 
//                 className="button" 
//                 >Back</button>
//             </div>   
//         </>
//     )
// }

// const NewPassword = ({setConfirmCode}) => {
//     const [typeInput, setTypeInput] = useState("password");
//     const [typeInputRepeat, setTypeInputRepeat] = useState("password");

//     const [newPass, setNewPass] = useState('');
//     const [repeatPass, setRepeatPass] = useState('');
//     const [showNewPass, setShowNewPass] = useState(false);
//     const [showRepeatPass, setShowRepeatPass] = useState(false);

//     const [isMatch, setIsMatch] = useState(true)
//     const [valid, setValid] = useState(false);

//     const [loading, setLoading] = useState(false)

//     const [thanks, setThanks] = useState(false)

//     const {request, process, setProcess, test} = useHttp();

//     const onToggleVisibleNewPassword = () => {
//         setShowNewPass(showNewPass => showNewPass = !showNewPass);
//         if( typeInput === 'password') {
//             setTypeInput('text')
//         } else {
//             setTypeInput("password")
//         }
//     }

//     const onPassValidator = (e, trigger) => {
//         if(e.target.value.length >= 7 && trigger.length >= 7) {
//             setValid(true)
//         } else {
//             setValid(false)
//         }
//     }

//     const onToggleVisibleRepeatPassword = () => {
//         setShowRepeatPass(showRepeatPass => showRepeatPass = !showRepeatPass);
//         if( typeInputRepeat === 'password') {
//             setTypeInputRepeat('text')
//         } else {
//             setTypeInputRepeat("password")
//         }
//     }

//     const sendNewPassword = (password) => {
//         setLoading(true)
//         if (test) {
//                     // axios
//             //     .post('./api/pass.php', {
//             //         "new password": password,
//             //     })
//             //     .then(res => {
//             //         setLoading(false)
//             //         setThanks(true)
//             //     })
//             setTimeout(() => {
//                 setLoading(false)
//                 setThanks(true)
//             }, 300)
//         } else {
//             request(undefined, {
//                 "command": "",
//                 "new password": password,
//             })
//         }
   
//     }
//     const button = useRef(0);
//     let clazz;
//     clazz = isMatch? 'input' : 'input input--error';
//     const onCheckDisableSave = (e, trigger) => {
//         onPassValidator(e, trigger);
//         if((e.target.value === trigger) && valid) {
//             button.current.removeAttribute('disabled')
//             setIsMatch(true)
//         } else {
//             button.current.setAttribute('disabled', true)
//             setIsMatch(false)
//         }
//     }

//     let spinner;

//     loading ? spinner = <Spinner active/> : spinner = <Spinner />
    
//     if(!thanks) {
//         return (
//             <>
//                 {spinner}
//                 <label className="label">
//                     New password
//                     <input 
//                         type={`${typeInput}`}
//                         name="password" 
//                         className={clazz}
//                         value={newPass}
//                         onChange={(e) => {setNewPass(e.target.value)}}
//                         onInput={(e) => onCheckDisableSave(e, repeatPass)}
//                         ></input>
//                         <img onClick={() => onToggleVisibleNewPassword()} src={showNewPass ? showPass : secret}/>
//                 </label>
//                 <label className="label">
//                     Repeat the new password
//                     <input 
//                         type={`${typeInputRepeat}`}
//                         name="password" 
//                         className={clazz}
//                         value={repeatPass}
//                         onChange={(e) => {setRepeatPass(e.target.value)}}
//                         onInput={(e) => onCheckDisableSave(e, newPass)}
//                         ></input>
//                         <img onClick={() => onToggleVisibleRepeatPassword()} src={showRepeatPass ? showPass : secret}/>
//                 </label>
    
//                 <button 
//                         ref={button}
//                         className="button" 
//                         type="button"
//                         onClick={() => sendNewPassword(newPass)}
//                         >Save</button>
//                 <div className="navlink" onClick={() => setConfirmCode(false)}>
//                     <button 
//                     className="button" 
//                     >Back</button>
//                 </div>
//             </>
//         )
//     } else {
//         return (
//             <>
//                 <p className="recovery__text">The Password has been successfully changed</p>
//                 <img className="recovery__taco" src={happyTaco} alt="happy taco"/>
//                 <button 
//                         className="button recovery__login" 
//                         type="button"
//                         ><Link to="/">Login</Link></button>
//                 <div className="navlink" onClick={() => setThanks(false)}>
//                     <button 
//                     className="button" 
//                     >Back</button>
//                 </div>
                
//             </>
//         )
//     }
    
// }