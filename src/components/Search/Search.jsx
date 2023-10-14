import styles from './Search.module.scss';
import { ReactComponent as MySVGIcon } from './MySVG.svg';
import { useContext, useRef, useState} from "react";
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce';

const Search = () => {
    const [value, setValue] = useState(''); //локально создала state + контролируемый input
    const { setSearchValue} = useContext(SearchContext);
    const inputRef = useRef();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        inputRef.current.focus();
    };

    const updateSearchValue = debounce((str) => {
        setSearchValue(str);
    }, 1000);

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    } ;



    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput }
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