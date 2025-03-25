import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllNews, getSearchNews } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";

import fileImage from "../../assets/icons/file.svg";
import attention from "../../assets/icons/attention.svg";
import './_news.scss'
const News = () => {

    const [news, setNews] = useState<any[]>([]);
    
    const [process, setProcess] = useState<string>('loading');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('')
    const [searchForBackend, setSearchForBackend] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getNews(currentPage);
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str:string) => {
           setSearchForBackend(str);
        }, 1000),[],
    );

    const changePage = (step: any) => {
        getNews(+currentPage + step);
        setCurrentPage(state => +state + step);
    }

    const getNews = (currentPage: number) => {
        getAllNews(currentPage).then(res => {
            setNews(res.result) 
            setTotalPages(res.pages)
        }).then(
            () => {setProcess('confirmed')}
        );
    }

    useEffect(() => {
        getNews(currentPage);
    }, [])

    useEffect(() => {
        if(searchForBackend == '') {
            getNews(currentPage);
        } else {
            getSearchNews(searchForBackend).then(res => {
                    setNews(res)
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
        
        const newsList = arr.map((item: { id: number; title: string; content: string; imagessrc: any[]}, i:number) => {
            const {id, title, content, imagessrc} = item;

            const imagesItems = (arr: any[]) => {
                const images = arr.map((_, i) => {
                    return (
                        <img key={i} src={fileImage} alt="image" />
                    )
                })
                return (
                   images
                )
            }
            return (
                <li key={id} className='rows-list__box news__box'>
                    <span>{i + 1}</span>
                    <span>{title}</span>
                    <span>{content}</span>
                    <span>
                    {
                        imagessrc.length > 0 ?
                        <img src={fileImage} alt="file" /> :
                        null
                    }
                    </span>
                    <Link className="rows-list__btn button button--red  news__btn" to={`/edit-news/${id}`}>Редактировать</Link>
                </li>
            )
        })
        
        return (
            <ul className="rows-list">
                {newsList}
            </ul>
        )
    }
   
    return (
        <>
            <PanelHeader title="Новости" children={
                <div className="search">
                    <input type="text" ref={inputRef} placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    {
                        search &&  <img onClick={onClickClear} src={attention} alt="search" />
                    }
                   
                </div>
            } showBackBtn={false} />

            {
                news?.length > 0 ? <SetContent process={process} component={renderItems(news)}/> : 
                <li className='news__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="news__wrapper">
                <Link className="button  news__btn news__btn--add" to={`/create-news/`}>Добавить новость</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} setFlag={()=>console.log(true)}/>
            </div>
          
           
        </>
    )
}

export default News;