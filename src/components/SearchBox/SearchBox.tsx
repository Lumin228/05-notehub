import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce';

interface SearchBoxProps {
    Search: (value: string) => void;
}

function SearchBox({ Search }: SearchBoxProps) {

    const handleChange = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => Search(event.target.value),
        1000
    );

    return (
        <input
            className={css.input}
            onChange={handleChange}
            type="text"
            placeholder="Search notes"
        />
    )
}

export default SearchBox