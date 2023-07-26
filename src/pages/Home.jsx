import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";

import {useEffect, useState} from "react";


 const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

     const [categoryId, setCategoryId] = useState(0);
     const [sortType, setSortType] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://64ba32de5e0670a501d5cb15.mockapi.io/items?category=' + categoryId)
            .then((response) => {
                return response.json()
            }).then((array) => {
            setPizzas(array);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);//при первом рендере scroll вверх
    }, [categoryId]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onClickCategory={(index)=> setCategoryId(index)}
                />
                <Sort/>
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