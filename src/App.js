import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import Skeleton from "./components/PizzaBlock/Skeleton";



function App() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://64ba32de5e0670a501d5cb15.mockapi.io/items')
            .then((response) => {
                return response.json()
            }).then((array) => {
               setPizzas(array);
        });
    },[]);



    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzas.map((item) => (
                            <PizzaBlock
                                key={item.id}
                                title={item.title}
                                price={item.price} i
                                image={item.imageUrl}
                                sizes={item.sizes}
                                types={item.types}
                            />
                        ))
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
