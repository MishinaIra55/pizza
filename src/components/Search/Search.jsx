import styles from './Search.module.scss';
import { ReactComponent as MySVGIcon } from './MySVG.svg';
import {useContext, useRef} from "react";
import {SearchContext} from "../../App";

const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext);
    const inputRef = useRef();

    const onClickClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={styles.root}
                placeholder="Search pizza..."
                onClick={onClickClear}
            />
            <div className={styles.svgContainer}>
                <MySVGIcon className={styles.svgIcon} />
            </div>
        </div>

    )
}

export default Search;