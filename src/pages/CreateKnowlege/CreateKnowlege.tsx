import  {useState, useRef} from 'react';

import PanelHeader from "../../components/PanelHeader/PanelHeader";
import KnowlegeForm from '../../components/KnowlegeForm/KnowlegeForm';



const CreateKnowlege = () => {

    const [knowledge, setKnowlege] = useState({
        title: '',
        content: '',
        file: ''
    })

    const form = useRef(0);

    return (
        <>
            <PanelHeader title="Создать базу" children={null} showBackBtn={false}/>
        
            <KnowlegeForm 
                knowledge={knowledge} 
                setKnowlege={setKnowlege} 
                buttonTitle="Созадать базу" 
                form={form}
                >
            </KnowlegeForm>
        </>
    )
}

export default CreateKnowlege;