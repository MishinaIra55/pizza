import styles from './NotFoundBlock.module.scss';
import React from "react";

const NotFoundBlock: React.FC = () => {
    return (
        <>
            <h1 className={styles.found}> Not found.Try again.</h1>
            <p className={styles.description}>К сожалению данная страница отсутствует</p>
        </>

    )
}

export default NotFoundBlock;