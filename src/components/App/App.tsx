import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchBox from '../SearchBox/SearchBox'
import css from './App.module.css'

import NoteList from '../NoteList/NoteList';
import ReactPaginate from 'react-paginate';
import getNotes from '../../services/NoteService';


function App() {
  const [text, setText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1);

   const { data, isSuccess } = useQuery({
    queryKey: ['posts', text, currentPage],
    queryFn: () => getNotes(text, currentPage),
    placeholderData: keepPreviousData,
    
  });

  const totalPages = data?.totalPages ?? 0;


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox Search={setText} />
          {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
          <button className={css.button}>Create note +</button>
        </header>
        <main>
          <NoteList list={data?.notes ?? []} />
        </main>
      </div>
    </>
  )
}

export default App
