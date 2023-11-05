import {useParams} from "react-router-dom";

export const FullPizza = () => {
    const { id } = useParams();

    return (
        <div className='container'>
            <img src=''/>
            <h2> 33333</h2>
            <p>Інформація про піццу</p>
        </div>
    )
};

export default FullPizza;