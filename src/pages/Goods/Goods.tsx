import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { getAllGoods, getSearchGoods, getGoodsOnMainParameters, getAllFavouriteGoods, createFavourite, deleteFavourite } from "../../hooks/http.hook";
import debounce from 'lodash.debounce';
import PanelHeader from '../../components/PanelHeader/PanelHeader';
import Pagination from "../../components/Pagination/Pagination";
import SetContent from "../../utils/SetContent";

import attention from "../../assets/icons/attention.svg";
import checked from "./../../assets/icons/checked.svg"
import { filtersData } from "../../data";
import './_goods.scss'
const Goods = () => {

    const [goods, setGoods] = useState<any[]>([
        {
            id: 1,
            article: '8632659873',
            name: "Название",
            description: "Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют."
        },
        {
            id: 2,
            article: '8632659873',
            name: "Название",
            description: "Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют."
        },
        {
            id: 3,
            article: '8632659873',
            name: "Название",
            description: "Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют."
        },
        {
            id: 4,
            article: '8632659873',
            name: "Название",
            description: "Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют."
        },
        {
            id: 5,
            article: '8632659873',
            name: "Название",
            description: "Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют. Ежедневные экстремальные условия эксплуатации автомобиля (вибрация, дорожные реагенты, перепады температур и т.д.) и требования к безопасности водителя и пассажиров, заставляют."
        },
    ]);
    const [favourites, setFavourites] = useState<any[]>([
        
        {
            id: 1,
            good_id: 3
        },
        {
            id: 2,
            good_id: 5
        },
    
    ]);
    const [isFavourite, setIsFavourite] = useState<any[]>([])
    const [process, setProcess] = useState<string>('loading');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [searchForBackend, setSearchForBackend] = useState('');
    const [filterArray, setFilterArray] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [parametersForBackend, setParametersForBackend] = useState<number[]>([])
    const [checkedAll, setCheckedAll] = useState<boolean>(true)

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
        setCheckedAll(true)
        getAllGoods(currentPage).then(res => {
            setGoods(res.result) 
            setTotalPages(res.pages)
        }).then(
            () => getAllFavouriteGoods().then(res => {
                setFavourites(res.result)
            }).then(
                () =>createIsFavouritesArray()
            ).then(
                () => {setProcess('confirmed')}
            )
        )
    }

    const getSearch = (searchForBackend:string) => {
        setCheckedAll(false)
        getSearchGoods(searchForBackend).then(res => {
            setGoods(res)
            setTotalPages(1)
        }).then(
            () => getAllFavouriteGoods().then(res => {
                setFavourites(res.result)
            }).then(
                () =>createIsFavouritesArray()
            ).then(
                () => {setProcess('confirmed')}
            )
        )
    }

    const getParameters = (parametersForBackend:number[]) => {
        onClickClear()
        // getGoodsOnMainParameters(parametersForBackend).then(res => {
        //     setGoods(res)
        //     setTotalPages(1)
        // }).then(
        //     () => getAllFavouriteGoods().then(res => {
        //         setFavourites(res.result)
        //     }).then(
        //         () =>createIsFavouritesArray()
        //     ).then(
        //         () => {setProcess('confirmed')}
        //     )
        // )
    }

    const createIsFavouritesArray = () => {
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

    useEffect(() => {
        
        // getGoods(currentPage);
        //тест
        
        setTotalPages(2)
        createIsFavouritesArray()
        
        setProcess('confirmed')
    }, [])

    useEffect(() => {
        if(searchForBackend == '' && checkedAll) {
            // getGoods(currentPage);
        } 
        else if(searchForBackend == '' && !checkedAll) {
            getParameters(parametersForBackend)
            setCheckedAll(false)
        } else {
        //    getSearch(searchForBackend)
        }
    }, [searchForBackend, parametersForBackend])

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
        setFilterArray([0, 0, 0, 0, 0, 0, 0])
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
                    <div className="filters__check" onClick={() => onFilters(id)}>
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

                <ul className="filters">
                    <li key={7} className='filters__item'>
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
                goods.length > 0 ? <SetContent process={process} component={renderItems(goods)}/> : 
                <li className='goods__box'>
                    <p>Ничего не найдено по запросу</p>
                </li>
            }
            
            <div className="goods__wrapper">
                <Link className="button  goods__btn goods__btn--add" to={`/create-goods/`}>Добавить новость</Link>
                <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
            </div>
          
           
        </>
    )
}

export default Goods;