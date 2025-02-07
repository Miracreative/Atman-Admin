import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import { getAllAdmins, deleteAdmin } from "../../hooks/http.hook";
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import SetContent from "../../utils/SetContent";
import './_admins.scss'
import trash from "./../../assets/icons/trash.svg";
const Admins = () => {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [textAlert, setTextAlert] = useState<string>('');
    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [alertBtnOpacity, setAlertBtnOpacity] = useState<boolean>(false)
    const [targetConfirm, setTargetConfirm] = useState({
        id: 0,
        name: '',
        email: ''
    });
    const [process, setProcess] = useState<string>('loading');

    const getUsers = () => {
        getAllAdmins().then(res => {
            if (res.status === 401) {
                console.log('Ошибка 401: Не авторизован');
            } else {
                setProcess('confirmed')
                setAdmins(res);
            }
         
        }).catch (() =>{
            setAlertBtnOpacity(true)
            setTextAlert('У Вас нет прав находиться в этом разделе')
            setShowAlert(true)
            setTimeout(() =>  {
                setShowAlert(false)
                navigate('/');
            },1500)
        }).finally(() => {
        });
    }

    useEffect(() => {
        getUsers();
    }, [showAlert])


    const removeAdmin = (id: number) => {
        setShowConfirm(false);
        deleteAdmin(id)
        setShowAlert(true);
        setTextAlert("Админ успешно удален");
    }

    const onConfirmDelete = (id: number, name:string, email:string) => {
        setShowConfirm(true);
        setTargetConfirm({id, name, email})
    }

    const renderItems = (arr: any[]) => {
        const adminsList = arr.map((item: { id: number; name: string; email: string; }) => {
            const {id, name, email} = item;
            return (
                <li key={id} className="rows-list__item">
                <div className='rows-list__box parents__box'>
                    <span>{id}</span>
                    <span>{name}</span>
                    <span>{email}</span>
                   <Link className="rows-list__btn button" to={`/edit-admin/${id}`}>Редактировать</Link>
                </div>
                <button 
                    className='btn-trash'
                    onClick={() => onConfirmDelete(id, name, email)}
                    >
                    <img src={trash} alt="delete"/>
                </button>
            </li>
            )
        })

        return (
            <ul className="rows-list">
                {adminsList}
            </ul>
        )
    }
   
    return (
        <>
            <PanelHeader title="Админы" children={null} showBackBtn={false} />

            <SetContent process={process} component={renderItems(admins)}/>
            <ConfirmModal question='Удалить админа?' text1={targetConfirm.name} text2={targetConfirm.email} showConfirm={showConfirm} setShowConfirm={setShowConfirm} actionConfirmed={() => removeAdmin(targetConfirm.id)}/>
            <ModalAlert showAlert={showAlert} setShowAlert={setShowAlert} alertBtnOpacity={alertBtnOpacity} message={textAlert} alertConfirm={() => null} />
        </>
    )
}

export default Admins;