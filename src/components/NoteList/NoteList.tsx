import css from './NoteList.module.css'
import type Notes from '../../types/note';
import { deleteNoteRequest } from '../../services/NoteService';
import { useMutation, useQueryClient } from '@tanstack/react-query';


interface NoteListProps {
    list: Notes[];
}

function NoteList({ list }: NoteListProps) {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
    mutationFn: (id: string) => deleteNoteRequest(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    }); 


    return (
        <ul className={css.list}>
            {list.map((note) => {
                return (<li className={css.listItem} key={note.id}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button} onClick={() => mutation.mutate(note.id)}>Delete</button>
                    </div>
                </li>)
            })}
        </ul>
    )
}

export default NoteList