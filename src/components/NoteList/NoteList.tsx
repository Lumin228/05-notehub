import css from './NoteList.module.css'
import type Notes from '../../types/note';


interface NoteListProps {
    list: Notes[];
}

function NoteList({ list }: NoteListProps) {


    return (
        <ul className={css.list}>
            {list.map((note) => {
                return (<li className={css.listItem} key={note.id}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button}>Delete</button>
                    </div>
                </li>)
            })}
        </ul>
    )
}

export default NoteList