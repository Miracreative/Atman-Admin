import  {useState, useRef} from 'react';

import PanelHeader from "../../components/PanelHeader/PanelHeader";
import SoutForm from '../../components/SoutForm/SoutForm';



const CreateSout = () => {

    const [sout, setSout] = useState({
        name: '',
        file: ''
    })

    const form = useRef(0);

    return (
        <>
            <PanelHeader title="Создать СОУТ" children={null} showBackBtn={false}/>
        
            <SoutForm 
                sout={sout} 
                setSout={setSout} 
                buttonTitle="Созадать СОУТ" 
                form={form}
                >
            </SoutForm>
        </>
    )
}

export default CreateSout;