import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css'

interface PaginationProp {
    total: number,
    current: number,
    swipe: (num: number) => void
}

function Pagination ({total, current, swipe}: PaginationProp) {

    return(
                <ReactPaginate
          pageCount={total}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => swipe(selected + 1)}
          forcePage={current - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
    )
}

export default Pagination