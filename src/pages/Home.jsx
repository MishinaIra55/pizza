import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import axios from "axios";
import qs from "qs";
import sort from "../components/Sort";
import { useNavigate } from "react-router-dom";



const Home = () => {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const dispatch = useDispatch();

    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const currentPage = useSelector((state) => state.filter.currentPage);

    const {searchValue} = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    const onChangeCategory = (index) => {
        dispatch(setCategoryId(index))
  };

    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    }

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';//если есть минус делаем сортировку по возврастанию иначе по убвапнию
        const sortBy = sortType.replace('-', '');//удалить минус из свойства если он будет
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue  ? `&search=${searchValue}` : '';


        axios.get(`https://651e831944a3a8aa47687f71.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((response) => {
                setPizzas(response.data);
                setIsLoading(false);
            })


        window.scrollTo(0, 0);//при первом рендере scroll вверх
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        const queryString = qs.stringify({
            categoryId,
            currentPage,
            sortType
        });

        navigate(`?${queryString}`);
    }, [categoryId, sortType, searchValue, currentPage]);


    const itemsPizzas = pizzas

        .map((item) =>
        <PizzaBlock
            key={item.id}
            title={item.title}
            price={item.price} i
            image={item.imageUrl}
            sizes={item.sizes}
            types={item.types}
            />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={ onChangeCategory}
                />
                <Sort />
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