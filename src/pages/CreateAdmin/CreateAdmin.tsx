import  {useState, useRef} from 'react';

import PanelHeader from "../../components/PanelHeader/PanelHeader";
import AdminForm from '../../components/AdminForm/AdminForm';
import ModalAlert from '../../components/ModalAlert/ModalAlert';
import Spinner from '../../components/Spinner/Spinner';
import { createAdmin } from '../../hooks/http.hook';


const CreateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState('');

    const [admin, setAdmin] = useState({
        name: '',
        email: '',
        role: '',
        password: '',
        repeatPass: ''
    })

    const form = useRef(0);


    const onCreateAdmin = () => {
        setLoading(true);
        createAdmin(admin)
        .then((res) => {
            setLoading(false);
            setShowAlert(true);
            if(res.message) {
                setTextAlert(res.message);
            } else {
                setTextAlert('Новый администратор был успешно создан')
            }
           
        }).catch(() => {
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
        <PanelHeader title="Создать админа" children={null} showBackBtn={false}/>
        {spinner}
        <AdminForm 
            admin={admin} 
            setAdmin={setAdmin} 
            buttonTitle="Созадать админа" 
            sendData={onCreateAdmin}
            form={form}
            >
            </AdminForm>
        <ModalAlert alertBtnOpacity={false} showAlert={showAlert} setShowAlert={setShowAlert} message={textAlert} alertConfirm={() => console.log('alert')}/>
        </>
    )
}

export default CreateAdmin;