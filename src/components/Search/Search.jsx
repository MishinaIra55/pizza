import styles from './Search.module.scss';
import { ReactComponent as MySVGIcon } from './MySVG.svg';

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.container}>
            <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={styles.root}
                placeholder="Search pizza..."
                onClick={()=> setSearchValue('')}
            />
            <div className={styles.svgContainer}>
                <MySVGIcon className={styles.svgIcon} />
            </div>
        </div>

    )
}

export default Search;