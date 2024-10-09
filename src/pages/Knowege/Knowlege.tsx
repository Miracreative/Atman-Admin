import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllKnowlege } from "../../hooks/http.hook";
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";

import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_knowlege.scss'
const Knowlege = () => {

    const [knowlege, setKnowlege] = useState<any[]>([]);
    
    const [process, setProcess] = useState<string>('loading');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('')

    const changePage = (step: any) => {
        console.log(step);
        // step  -1 means previous page and +1 is next
        getKnowlege(+currentPage + step);
        setCurrentPage(state => +state + step);
      }

    const getKnowlege = (currentPage: number) => {
        // getAllKnowlege(currentPage).then(res => {
        //     // setKnowlege(res)
        //        setTotalPages(res.max_page)
        // }).then(
        //     () => {setProcess('confirmed')}
        // );
        setKnowlege([
            {
                title: 'Название',
                content: 'Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля.',
                file: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fphotos%2F%25D0%25BC%25D0%25B8%25D0%25BB%25D1%258B%25D0%25B5-%25D0%25BA%25D0%25B0%25D1%2580%25D1%2582%25D0%25B8%25D0%25BD%25D0%25BA%25D0%25B8&psig=AOvVaw3SXWksXJnOPAJO4-_UyoeF&ust=1728542874409000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMi35MLZgIkDFQAAAAAdAAAAABAE',
                file_name: 'название доокумента',
                id: 0
            },
            {
                title: 'Название',
                content: 'Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля.',
                file: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.freepik.com%2Fphotos%2F%25D0%25BC%25D0%25B8%25D0%25BB%25D1%258B%25D0%25B5-%25D0%25BA%25D0%25B0%25D1%2580%25D1%2582%25D0%25B8%25D0%25BD%25D0%25BA%25D0%25B8&psig=AOvVaw3SXWksXJnOPAJO4-_UyoeF&ust=1728542874409000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMi35MLZgIkDFQAAAAAdAAAAABAE',
                file_name: 'Название доокумента',
                id: 1
            },
        ])

        setProcess('confirmed')
        setTotalPages(2)
    }

    useEffect(() => {
        getKnowlege(currentPage);
    }, [])

    const onSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    
    const renderItems = (arr: any[]) => {
        const knowlegeList = arr.map((item: { id: number; title: string; content: string; file_name: string}, i:number) => {
            const {id, title, content, file_name} = item;
            return (
                // <li key={id} className="rows-list__item">
                <li key={id} className='rows-list__box knowlege__box'>
                    <span>{i + 1}</span>
                    <span>{title}</span>
                    <span>{content}</span>
                    <span>
                        <img src={fileImage} alt="file" />
                        <span>{file_name}</span>
                    </span>
                   <Link className="rows-list__btn button button--red  knowlege__btn" to={`/edit-knowlege/${id}`}>Редактировать</Link>
                </li>
            // </li>
            )
        })

        return (
            <ul className="rows-list">
                {knowlegeList}
            </ul>
        )
    }
   
    return (
        <>
            <PanelHeader title="База знаний" children={
                <div className="search">
                    <input type="text" placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    <img src={attention} alt="search" />
                </div>
            } showBackBtn={false} />
            <SetContent process={process} component={renderItems(knowlege)}/>
            <div className="knowlege__wrapper">
                <Link className="rows-list__btn button  knowlege__btn knowlege__btn--add" to={`/create-knowlege/`}>Добавть базу</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
            </div>
          
           
        </>
    )
}

export default Knowlege;