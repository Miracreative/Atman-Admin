import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllKnowlege, getSearchKnowlege } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
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
    const [searchForBackend, setSearchForBackend] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getKnowlege(currentPage);
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str:string) => {
           setSearchForBackend(str);
        }, 1000),[],
    );

    const changePage = (step: any) => {
        getKnowlege(+currentPage + step);
        setCurrentPage(state => +state + step);
    }

    const getKnowlege = (currentPage: number) => {
        getAllKnowlege(currentPage).then(res => {
            setKnowlege(res.result) 
            setTotalPages(res.pages)
        }).then(
            () => {setProcess('confirmed')}
        );
    }

    useEffect(() => {
        getKnowlege(currentPage);
    }, [])

    useEffect(() => {
        if(searchForBackend == '') {
            getKnowlege(currentPage);
        } else {
            getSearchKnowlege(searchForBackend).then(res => {
                console.log('search', res)
                    setKnowlege(res)
                       setTotalPages(1)
                }).then(
                    () => {setProcess('confirmed')}
                );
        }
    }, [searchForBackend])

    const onSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
       
        setSearch(e.target.value)
        updateSearchValue(e.target.value);
    }
    
    const renderItems = (arr: any[]) => {
        
        const knowlegeList = arr.map((item: { id: number; title: string; content: string; file_name: string}, i:number) => {
            const {id, title, content, file_name} = item;
            return (
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
                    <input type="text" ref={inputRef} placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    {
                        search &&  <img onClick={onClickClear} src={attention} alt="search" />
                    }
                   
                </div>
            } showBackBtn={false} />

            {
                knowlege.length > 0 ? <SetContent process={process} component={renderItems(knowlege)}/> : 
                <li className='knowlege__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="knowlege__wrapper">
                <Link className="button  knowlege__btn knowlege__btn--add" to={`/create-knowlege/`}>Добавть базу</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
            </div>
          
           
        </>
    )
}

export default Knowlege;