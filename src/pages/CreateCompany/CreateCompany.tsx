import  {useState, useRef} from 'react';

import PanelHeader from "../../components/PanelHeader/PanelHeader";
import CompanyForm from '../../components/CompanyForm/CompanyForm';

const CreateCompany = () => {

    const [company, setCompany] = useState({
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
    })

    const form = useRef(0);

    return (
        <>
            <PanelHeader title="Добавить компанию" children={null} showBackBtn={false}/>
        
            <CompanyForm 
                company={company} 
                setCompany={setCompany} 
                buttonTitle="Добавить компанию" 
                form={form}
                >
            </CompanyForm>
        </>
    )
}

export default CreateCompany;