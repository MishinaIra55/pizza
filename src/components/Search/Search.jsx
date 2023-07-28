import styles from './Search.module.scss';
import { ReactComponent as MySVGIcon } from './MySVG.svg';

const Search = () => {
    return (
        <div className={styles.container}>
            <input className={styles.root} placeholder="Search pizza..." />
            <div className={styles.svgContainer}>
                <MySVGIcon className={styles.svgIcon} />
            </div>
        </div>

    )
}

export default Search;