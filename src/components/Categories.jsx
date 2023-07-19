import {useState} from "react";

function Categories() {

    const [activeCategorie, setActiveCategorie] = useState(1);

    const onClickCategory = (index) => {
        setActiveCategorie(index);
    }

    return(
        <div className="categories">
            <ul>
                <li onClick={()=> onClickCategory(0)} className={activeCategorie ===0 ? 'active' : ''}>Все</li>
                <li onClick={()=> onClickCategory(1)} className={activeCategorie ===1 ? 'active' : ''}>Мясные</li>
                <li onClick={()=> onClickCategory(2)} className={activeCategorie ===2 ? 'active' : ''}>Вегетарианская</li>
                <li onClick={()=> onClickCategory(3)} className={activeCategorie ===3 ? 'active' : ''}>Гриль</li>
                <li onClick={()=> onClickCategory(4)} className={activeCategorie ===4 ? 'active' : ''}>Острые</li>
                <li onClick={()=> onClickCategory(5)} className={activeCategorie ===5 ? 'active' : ''}>Закрытые</li>
            </ul>
        </div>
    )
}

export default Categories;