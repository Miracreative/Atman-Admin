import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllSertifications, getSearchSertifications } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";

import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_sertifications.scss'
const Sertifications = () => {

    const [sertifications, setSertifications] = useState<any[]>([]);
    
    const [process, setProcess] = useState<string>('loading');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('')
    const [searchForBackend, setSearchForBackend] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getSertifications(currentPage);
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str:string) => {
           setSearchForBackend(str);
        }, 1000),[],
    );

    const changePage = (step: any) => {
        getSertifications(+currentPage + step);
        setCurrentPage(state => +state + step);
    }

    const getSertifications = (currentPage: number) => {
        getAllSertifications(currentPage).then(res => {
            setSertifications(res.result) 
            setTotalPages(res.pages)
        }).then(
            () => {setProcess('confirmed')}
        );
    }

    useEffect(() => {
        getSertifications(currentPage);
    }, [])

    useEffect(() => {
        if(searchForBackend == '') {
            getSertifications(currentPage);
        } else {

            getSearchSertifications(searchForBackend).then(res => {
                console.log(res)
                    setSertifications(res)
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
        
        const sertificationsList = arr.map((item: { id: number; title: string; content: string; file_name: string}, i:number) => {
            const {id, title} = item;
            return (
                <li key={id} className='rows-list__box sertifications__box'>
                    <span>{i + 1}</span>
                    <span>{title}</span>
                    <span>
                        <img src={fileImage} alt="file" />
                        <span>Файл сертификата</span>
                    </span>
                    <Link className="rows-list__btn button button--red  sertifications__btn" to={`/edit-sertifications/${id}`}>Редактировать</Link>
                </li>
            )
        })
        
        return (
            <ul className="rows-list">
                {sertificationsList}
            </ul>
        )
    }
   
    return (
        <>
            <PanelHeader title="Сертификаты" children={
                <div className="search">
                    <input type="text" ref={inputRef} placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    {
                        search &&  <img onClick={onClickClear} src={attention} alt="search" />
                    }
                   
                </div>
            } showBackBtn={false} />

            {
                sertifications.length > 0 ? <SetContent process={process} component={renderItems(sertifications)}/> : 
                <li className='sertifications__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="sertifications__wrapper">
                <Link className="button  sertifications__btn sertifications__btn--add" to={`/create-sertifications/`}>Добавть сертификат</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
            </div>
          
           
        </>
    )
}

export default Sertifications;