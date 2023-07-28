import styles from './Search.module.scss';
import { ReactComponent as MySVGIcon } from './MySVG.svg';

const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.container}>
            <input
                value={searchValue}
                className={styles.root}
                placeholder="Search pizza..."
            />
            <div className={styles.svgContainer}>
                <MySVGIcon className={styles.svgIcon} />
            </div>
        </div>

    )
}

export default Search;