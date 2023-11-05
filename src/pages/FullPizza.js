import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://651e831944a3a8aa47687f71.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPizza();
    }, []);


    return (
        <div className='container'>
            <img src={pizza.imageUrl}/>
            <h2> {pizza.title}</h2>
            <p>{pizza.price} грн</p>
        </div>
    )
};

export default FullPizza;