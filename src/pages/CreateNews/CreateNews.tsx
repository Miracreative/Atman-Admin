// import  {useState, useRef} from 'react';

// import PanelHeader from "../../components/PanelHeader/PanelHeader";
// import NewsForm from '../../components/NewsForm/NewsForm';



// const CreateNews = () => {

//     const [news, setNews] = useState({
//         id: 0,
//         title: '',
//         content: '',
//         descr: '',
//         imagessrc: [],
//         files: ''
//     }); 

//     const form = useRef(0);

//     return (
//         <>
//             <PanelHeader title="Создать новость" children={null} showBackBtn={false}/>
        
//             <NewsForm 
//                 news={news} 
//                 setNews={setNews} 
//                 buttonTitle="Созадать новость" 
//                 form={form}
//                 >
//             </NewsForm>
//         </>
//     )
// }

// export default CreateNews;