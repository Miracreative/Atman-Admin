import  {useState, useRef} from 'react';

import PanelHeader from "../../components/PanelHeader/PanelHeader";
import SertificationForm from '../../components/SertificateForm/SertificateForm';



const CreateSertificate = () => {

    const [sertificate, setSertificate] = useState({
        title: '',
        type: '',
        file: ''
    })

    const form = useRef(0);

    return (
        <>
            <PanelHeader title="Создать сертификат" children={null} showBackBtn={false}/>
        
            <SertificationForm 
                sertificate={sertificate} 
                setSertificate={setSertificate} 
                buttonTitle="Созадать сертификат" 
                form={form}
                >
            </SertificationForm>
        </>
    )
}

export default CreateSertificate;