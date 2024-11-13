import  {useState, useRef} from 'react';

import PanelHeader from "../../components/PanelHeader/PanelHeader";
import PersonForm from '../../components/PersonForm/PersonForm';

const CreatePerson = () => {

    const [person, setPerson] = useState({
        name: '',
        file: '',
        watsapp: '',
        email: '',
        descr: ''
    })

    const form = useRef(0);

    return (
        <>
            <PanelHeader title="Добавить сотрудника" children={null} showBackBtn={false}/>
        
            <PersonForm 
                person={person} 
                setPerson={setPerson} 
                buttonTitle="Добавить сотрудника" 
                form={form}
                >
            </PersonForm>
        </>
    )
}

export default CreatePerson;