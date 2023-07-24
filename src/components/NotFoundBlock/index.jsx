import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
    return (
        <>
            <h1 className={styles.found}> Not found.Try again.</h1>
            <p className={styles.description}>К сожалению данная страница отсутствует</p>
        </>

    )
}

export default NotFoundBlock;