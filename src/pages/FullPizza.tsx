import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const FullPizza = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;

}>();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://651e831944a3a8aa47687f71.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
               alert('Error....');
               navigate('/')
            }
        }
        fetchPizza();
    }, []);

    if (!pizza) {
        return 'loading pizzas....'
    }

    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt='pizza'/>
            <h2> {pizza.title}</h2>
            <p>{pizza.price} грн</p>
        </div>
    )
};

export default FullPizza;