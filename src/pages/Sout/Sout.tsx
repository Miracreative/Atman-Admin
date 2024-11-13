import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllSout, getSearchSout } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import Spinner from "../../components/Spinner/Spinner";

import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_sout.scss'
const Sout = () => {

    const [sout, setSout] = useState<any[]>([]);
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
        getSout(currentPage);
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str:string) => {
           setSearchForBackend(str);
        }, 1000),[],
    );

    const changePage = (step: any) => {
        getSout(+currentPage + step);
        setCurrentPage(state => +state + step);
    }

    const getSout = (currentPage: number) => {
        setLoading(true);
        getAllSout(currentPage).then(res => {
            setSout(res.result) 
            setTotalPages(res.pages)
        }).then(
            () => {setProcess('confirmed');
                setLoading(false)
            }
        );
    }

    useEffect(() => {
        getSout(currentPage);
    }, [])

    useEffect(() => {
        if(searchForBackend == '') {
            getSout(currentPage);
        } else {
            setLoading(true)
            getSearchSout(searchForBackend).then(res => {
                    setSout(res)
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
        
        const soutList = arr.map((item: { id: number; name: string; filetype: string;}, i:number) => {
            const {id, name, filetype} = item;
            return (
                <li key={id} className='rows-list__box sout__box'>
                    <span>{i + 1}</span>
                    <span>{name}</span>
                    <span>
                        <img src={fileImage} alt="file" />
                        <span>{filetype}</span>
                    </span>
                    <Link className="rows-list__btn button button--red  sout__btn" to={`/edit-sout/${id}`}>Редактировать</Link>
                </li>
            )
        })
        
        return (
            <ul className="rows-list">
                {soutList}
            </ul>
        )
    }
    let spinner = loading ? <Spinner active/> : null;
   
    return (
        <>
            <PanelHeader title="СОУТ" children={
                <div className="search">
                    <input type="text" ref={inputRef} placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    {
                        search &&  <img onClick={onClickClear} src={attention} alt="search" />
                    }
                   
                </div>
            } showBackBtn={false} />
            {spinner}

            {
                sout?.length > 0 ? <SetContent process={process} component={renderItems(sout)}/> : 
                <li className='sout__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="sout__wrapper">
                <Link className="button  sout__btn sout__btn--add" to={`/create-sout/`}>Добавить СОУТ</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} setFlag={()=>console.log(true)}/>
            </div>
          
           
        </>
    )
}

export default Sout;