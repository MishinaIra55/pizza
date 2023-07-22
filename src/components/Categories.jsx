import {useState} from "react";

function Categories() {

    const [activeCategorie, setActiveCategorie] = useState(0);

    const categories = ['Все', 'Мясные', 'Вегетарианская','Гриль', 'Острые', 'Закрытые']

    const onClickCategory = (index) => {
        setActiveCategorie(index);
    }

    return(
        <div className="categories">
            <ul>
                {categories.map((item, index) => (
                    <li
                        key={index}
                        onClick={()=> onClickCategory(index)}
                        className={activeCategorie === index ? 'active' : ''}>{item}
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Categories;