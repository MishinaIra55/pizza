import {useState} from "react";

function Categories() {

    const [activeCategorie, setActiveCategorie] = useState(1);

    return(
        <div className="categories">
            <ul>
                <li className={activeCategorie ===0 ? 'active' : ''}>Все</li>
                <li className={activeCategorie ===1 ? 'active' : ''}>Мясные</li>
                <li className={activeCategorie ===2 ? 'active' : ''}>Вегетарианская</li>
                <li className={activeCategorie ===3 ? 'active' : ''}>Гриль</li>
                <li className={activeCategorie ===4 ? 'active' : ''}>Острые</li>
                <li className={activeCategorie ===5 ? 'active' : ''}>Закрытые</li>
            </ul>
        </div>
    )
}

export default Categories;