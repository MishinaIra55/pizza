import styles from './Search.module.scss';
// @ts-ignore
import { ReactComponent as MySVGIcon } from './MySVG.svg';
import React, {  useRef, useState} from "react";

// @ts-ignore
import debounce from 'lodash.debounce';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/filter/slice";


const Search: React.FC = () => {
    const [value, setValue] = useState<string>('');
    //локально создала state + контролируемый input
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current ?.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 150),
        [],
    );



    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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