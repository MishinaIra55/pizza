import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";


export const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://64ba32de5e0670a501d5cb15.mockapi.io/items')
            .then((response) => {
                return response.json()
            }).then((array) => {
            setPizzas(array);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories/>
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
        </>
    )
}