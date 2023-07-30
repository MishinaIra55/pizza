import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import {useEffect, useState} from "react";


const Home = ({searchValue}) => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности ',
        sortProperty: 'rating',
    });

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';//если есть минус делаем сортировку по возврастанию иначе по убвапнию
        const sortBy = sortType.sortProperty.replace('-', '');//удалить минус из свойства если он будет
        const category = categoryId > 0 ? `category=${categoryId}` : '';

        fetch(`https://64ba32de5e0670a501d5cb15.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
            .then((response) => {
                return response.json()
            }).then((array) => {
            setPizzas(array);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);//при первом рендере scroll вверх
    }, [categoryId, sortType]);

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
                    : pizzas.map((item) =>
                        <PizzaBlock
                            key={item.id}
                            title={item.title}
                            price={item.price} i
                            image={item.imageUrl}
                            sizes={item.sizes}
                            types={item.types}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Home;