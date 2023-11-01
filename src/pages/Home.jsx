import Categories from "../components/Categories";
import Sort, {menu} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import {useContext, useEffect, useRef, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";

import qs from "qs";

import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzaSlice";


const Home = () => {
    const {categoryId, currentPage, sort} = useSelector((state) => state.filter);
    const dispatch = useDispatch();


    const isMounted = useRef(false);
    const isSearch = useRef(false);

    const {searchValue} = useContext(SearchContext);

    const items = useSelector((state) => state.pizza.items);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    const onChangeCategory = (index) => {
        dispatch(setCategoryId(index))
    };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        setIsLoading(true);

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';//если есть минус делаем сортировку по возврастанию иначе по убвапнию
        const sortBy = sort.sortProperty.replace('-', '');//удалить минус из свойства если он будет
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

       try {

           dispatch(fetchPizzas({
               order,
               sortBy,
               category,
               search,
               currentPage
           }));
           setIsLoading(false);

       } catch (error){
           console.log(error);
       } finally {
           setIsLoading(false);
       }

    };

    //если быд первый рендер то проверяем url параметры и сохраняем в редуксе
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = menu.find((object) => object.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            isSearch.current = true;
        }
    }, []);

    //если быд первый рендер то запрашиваем пиццы
    useEffect(() => {
         getPizzas();
        }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    //ксли был первый рендер и изменили параметры
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                currentPage,
                sortProperty: sort.sortProperty,
            });

            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, navigate, currentPage]);


    const itemsPizzas = items.map((item) => {

        return (
            <PizzaBlock
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price} i
                image={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
            />
        )
    });


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : itemsPizzas}
            </div>
            <Pagination page={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home;