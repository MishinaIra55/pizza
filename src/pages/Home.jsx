import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import {useContext, useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {useSelector} from "react-redux";



const Home = () => {
    const categoryId = useSelector((state) => state.filter.categoryId);

    const {searchValue} = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности ',
        sortProperty: 'rating',
    });
    const [currentPagination, setCurrentPagination] = useState(1);

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';//если есть минус делаем сортировку по возврастанию иначе по убвапнию
        const sortBy = sortType.sortProperty.replace('-', '');//удалить минус из свойства если он будет
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue  ? `&search=${searchValue}` : '';

        fetch(`https://651e831944a3a8aa47687f71.mockapi.io/items?page=${currentPagination}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((response) => {
                return response.json()
            }).then((array) => {
            setPizzas(array);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);//при первом рендере scroll вверх
    }, [categoryId, sortType, searchValue, currentPagination]);

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
                    onClickCategory={(index) => setCategoryId(index)}
                />
                <Sort
                    value={sortType}
                    onClickSort={(index) => setSortType(index)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                    : itemsPizzas}
            </div>
                <Pagination onChangePage={number => setCurrentPagination(number)}/>
        </div>
    )
}

export default Home;