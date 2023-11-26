import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import React from "react";

type PaginationProps = {
    page: number,
    onChangePage: any
}

const Pagination: React.FC<PaginationProps> = ({page, onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={page - 1}
            previousLabel="< "
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;