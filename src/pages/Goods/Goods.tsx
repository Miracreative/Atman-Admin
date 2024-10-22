import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllGoods, getSearchGoods, getGoodsOnMainParameters, getAllFavouriteGoods, createFavourite, deleteFavourite } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";
import Spinner from "../../components/Spinner/Spinner";

import attention from "../../assets/icons/attention.svg";
import checked from "./../../assets/icons/checked.svg"
import { filtersData } from "../../data";
import './_goods.scss'
const Goods = () => {

    const [goods, setGoods] = useState<any[]>([]);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [isFavourite, setIsFavourite] = useState<any[]>([])
    const [process, setProcess] = useState<string>('loading');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchForBackend, setSearchForBackend] = useState('');
    const [filterArray, setFilterArray] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    const [parametersForBackend, setParametersForBackend] = useState<number[]>([])
    const [checkedAll, setCheckedAll] = useState<boolean>(true)

    let spinner = loading ? <Spinner active/> : null;

    const inputRef = useRef<HTMLInputElement>(null);
    const onClickClear = () => {
        setSearch('');
        setSearchForBackend('');
        getGoods(currentPage);
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((str:string) => {
           setSearchForBackend(str);
        }, 1000),[],
    );
    const updateParameters = useCallback(
        debounce((filters:number[]) => {
            setParametersForBackend(filters);
        }, 1000),[],
    );

    const changePage = (step: any) => {
        getGoods(+currentPage + step);
        setCurrentPage(state => +state + step);
    }

    const getGoods = (currentPage: number) => {
        setSearch('');
        setSearchForBackend('');
        setCheckedAll(true)
        getAllGoods(currentPage).then(response => {
            setGoods(response.result) 
            setTotalPages(response.pages)
        }).then(
            () => getAllFavouriteGoods().then(res => {
                setFavourites(res.favourite);
                createIsFavouritesArray(res.favourite)
               
            }).then(
                () => getAllGoods(currentPage).then(response => {
                    setGoods(response.result) 
                }).then(
                    () => {setProcess('confirmed');
                        setFlag(true);
                        setLoading(false)
                    }
                )
            )
        )
    }

    const getSearch = (searchForBackend:string) => {
        setLoading(true)
        setCheckedAll(false)
        getSearchGoods(searchForBackend).then(res => {
            setGoods(res.result)
            console.log(res)
            setTotalPages(1)
        }).then(
            () => getAllFavouriteGoods().then(res => {
                setFavourites(res.favourite);
                createIsFavouritesArray(res.favourite)
            }).then(
                () => {setProcess('confirmed');
                    setLoading(false)
                }
            )
        )
    }

    const getParameters = (parametersForBackend:number[]) => {
        setCheckedAll(false)
        setSearch('');
        setSearchForBackend('');
        getGoodsOnMainParameters(parametersForBackend).then(res => {
            setGoods(res)
            setTotalPages(1)
        }).then(
            () => getAllFavouriteGoods().then(res => {
                setFavourites(res.result);
                createIsFavouritesArray(res.favourite)
            }).then(
                () => {setProcess('confirmed');
                    setLoading(false);
                    setCheckedAll(false);
                }
            )
        )
    }

    const createIsFavouritesArray = (favourites: any) => {
        let arr:Boolean[] = [];
        let favorietsId:number[] = [];
        favourites.forEach((item: {good_id: number}) => {
            favorietsId.push(item.good_id)
        })
        goods.forEach((good: {id:number}) => {
            if(favorietsId.indexOf(good.id) != -1) {
                arr.push(true)
            } else {
                arr.push(false)
            }
        })
        setIsFavourite(arr)
    }


    const changeFlag = () => {
        setCheckedAll(true)
        setFlag(flag =>!flag);
    }

    useEffect(() => {
        if(search == '' && checkedAll) {
            getGoods(currentPage);
            console.log('all')
        }  else if(search == '' && !checkedAll) {
            console.log('filter')
            getParameters(parametersForBackend)
            console.log(goods)
        } else {
            console.log('search')
           getSearch(searchForBackend)

        }
    }, [searchForBackend, parametersForBackend, flag])

    const onSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        updateSearchValue(e.target.value);
    }

    const handleChangeIsFavourite = (i: number, favourite: boolean, id:number) => {
        
        favourite ? (
            deleteFavourite(id)
        ) : (
            createFavourite(id)
        )
       
        const newFavourite = isFavourite;
        let newItem;
        if(newFavourite[i] == true) {
            newItem = false
        } else {
            newItem = true
        }
        let newArr = [...newFavourite.slice(0, i), newItem, ...newFavourite.slice(i + 1, newFavourite.length)]
        setIsFavourite(newArr)
    }

    const hendleChoiseAllGoods = () => {
        onClickClear();
        setCheckedAll(true)
        setFilterArray([0, 0, 0, 0, 0, 0, 0, 0])
    }
    
    const renderItems = (arr: any[]) => {
        const goodsList = arr.map((item: { id: number; name: string; description: string}, i:number) => {
            const {id, name, description} = item;
            return (
                <li key={id} className='rows-list__box goods__box'>
                    <span>{i + 1}</span>
                    <span>{name}</span>
                    <span>{description}</span>
                    <button type="button" className="rows-list__btn button button--red goods__btn" onClick={() => handleChangeIsFavourite(i, isFavourite[i], id)}>
                        {
                            isFavourite[i] ? 'Убрать' : 'Рекомендовать'
                        }
                    </button>
                    <Link className="rows-list__btn button button--red  goods__btn" to={`/edit-goods/${id}`}>Редактировать</Link>
                </li>
            )
        })
        
        return (
            <ul className="rows-list">
                {goodsList}
            </ul>
        )
    }

    const onFilters = (id: number) => {
        setCheckedAll(false)
        let newFilterArray = filterArray;
        let newItem;
        if(newFilterArray[id] == 1) {
            newItem = 0
        } else {
            newItem = 1
        }
        let newArr = [...newFilterArray.slice(0, id), newItem, ...newFilterArray.slice(id + 1, newFilterArray.length)]
        setFilterArray(newArr)

        updateParameters(newArr);
    }
   
    const renderFilterPanel = (arr: any[]) => {
        const filtersList = arr.map((item :{id:number; title:string}, i:number) => {
            const {id, title} = item;
            return (
                <li key={id} className='filters__item'>
                    <div className="filters__check" onClick={() => {onFilters(id)}}>
                        {
                            filterArray[i] ? <img src={checked} alt="checked" /> : null
                        }
                    </div>
                    <span className="filters__title">{title}</span>
                </li>
            )
        })

        return (
            
            filtersList
            
        )
    }
   
    return (
        <>
            <PanelHeader title="Товары" children={
                <div className="search">
                    <input type="text" ref={inputRef} placeholder="Search" value={search} onChange={(e) => onSearch(e)}/>
                    {
                        search &&  <img onClick={onClickClear} src={attention} alt="search" />
                    }
                   
                </div>
            } showBackBtn={false} />
                {spinner}
                <ul className="filters">
                    <li key={8} className='filters__item'>
                        <div className="filters__check" onClick={() => {hendleChoiseAllGoods()}}>
                            {
                                checkedAll ? 
                                <img src={checked} alt="checked" /> : null
                            }
                        </div>
                        <span className="filters__title">Все</span>
                    </li>
                    <SetContent process={process} component={renderFilterPanel(filtersData)}/>
                
                </ul>
            {
                goods?.length > 0 ? <SetContent process={process} component={renderItems(goods)}/> : 
                <li className='goods__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="goods__wrapper">
                <Link className="button  goods__btn goods__btn--add" to={`/create-goods/`}>Добавить новость</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} setFlag={changeFlag} />
            </div>
          
           
        </>
    )
}

export default Goods;