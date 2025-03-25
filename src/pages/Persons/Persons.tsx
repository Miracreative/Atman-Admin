import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllPerson, getSearchPerson } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import Spinner from "../../components/Spinner/Spinner";

import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_persons.scss'
const Persons = () => {

    const [person, setPerson] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [process, setProcess] = useState<string>('loading');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('')
    const [searchForBackend, setSearchForBackend] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getPerson(currentPage);
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str:string) => {
           setSearchForBackend(str);
        }, 1000),[],
    );

    const changePage = (step: any) => {
        getPerson(+currentPage + step);
        setCurrentPage(state => +state + step);
    }

    const getPerson = (currentPage: number) => {
        setLoading(true);
        getAllPerson(currentPage).then(res => {
            setPerson(res.result) 
            setTotalPages(res.pages)
        }).then(
            () => {setProcess('confirmed');
                setLoading(false)
            }
        );
    }

    useEffect(() => {
        getPerson(currentPage);
    }, [])

    useEffect(() => {
        if(searchForBackend == '') {
            getPerson(currentPage);
        } else {
            setLoading(true)
            getSearchPerson(searchForBackend).then(res => {
                    setPerson(res)
                       setTotalPages(1)
                }).then(
                    () => {setProcess('confirmed'); setLoading(false)}
                );
        }
    }, [searchForBackend])

    const onSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
       
        setSearch(e.target.value)
        updateSearchValue(e.target.value);
    }
    
    const renderItems = (arr: any[]) => {
        
        const personList = arr.map((item: { id: number; name: string; watsapp: string; email:string;}, i:number) => {
            const {id, name, watsapp, email} = item;
            return (
                <li key={id} className='rows-list__box person__box'>
                    <span>{i + 1}</span>
                    <span>{name}</span>
                    <span>{email}</span>
                    <span>{watsapp}</span>
                    {/* <span>
                        <img src={fileImage} alt="file" />
                    </span> */}
                    <Link className="rows-list__btn button button--red  person__btn" to={`/edit-person/${id}`}>Редактировать</Link>
                </li>
            )
        })
        
        return (
            <ul className="rows-list">
                {personList}
            </ul>
        )
    }
    let spinner = loading ? <Spinner active/> : null;
   
    return (
        <>
            <PanelHeader title="Сотрудники" children={
                <div className="search">
                    <input type="text" ref={inputRef} placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    {
                        search &&  <img onClick={onClickClear} src={attention} alt="search" />
                    }
                   
                </div>
            } showBackBtn={false} />
            {spinner}

            {
                person?.length > 0 ? <SetContent process={process} component={renderItems(person)}/> : 
                <li className='person__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="person__wrapper">
                <Link className="button  person__btn person__btn--add" to={`/create-person/`}>Добавить сотрудника</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} setFlag={()=>console.log(true)}/>
            </div>
          
           
        </>
    )
}

export default Persons;