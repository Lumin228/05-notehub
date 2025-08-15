import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import SearchBox from '../SearchBox/SearchBox'
import css from './App.module.css'
import NoteList from '../NoteList/NoteList';
import {getNotes} from '../../services/NoteService';
import NoteForm from '../NoteForm/NoteFrom';
import Pagination from '../Pagination/Pagination';


function App() {
  const [text, setText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const setCloseModal = () => setIsModalOpen(false);

 

  const { data, isSuccess } = useQuery({
    queryKey: ['posts', text, currentPage, isModalOpen],
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
            <Pagination total={totalPages} current={currentPage} swipe={setCurrentPage} />
          )}
          <button className={css.button} onClick={openModal}>Create note +</button>
        </header>
        <main>
          {isModalOpen && (<NoteForm closeModal={setCloseModal} />)}
          <NoteList list={data?.notes ?? []} />
        </main>
      </div>
    </>
  )
}

export default App
