import './_modalAlert.scss';

const ModalAlert = ({showAlert, setShowAlert, message, alertConfirm = () => {}, alertBtnOpacity = false} : {
    showAlert: boolean,
    setShowAlert: (value: boolean) => void,
    message: string,
    alertConfirm: () => void,
    alertBtnOpacity: boolean  
}) => {
 
  return (
    <div className={`alert ${showAlert ? 'show': ''}`}>
        <div className="alert__inner">
          <div className="alert__subtitle">{message}</div>
          <div className="alert__btns">
            {
              alertBtnOpacity ?
              null : 
              <button className="alert__cancel button "onClick={() => {setShowAlert(false); alertConfirm();}}>Ok</button>
            }
            
          </div>
        </div>
    </div>
  )
}

export default ModalAlert;