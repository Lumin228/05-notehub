import { Field, Formik, Form } from 'formik';
import css from './NoteForm.module.css'
import { useEffect } from 'react';
import type InitialValuesProp from '../../types/note';
import { createNoteRequest, getNotes } from '../../services/NoteService';

interface NoteFormProp {
    closeModal: () => void;
}




function NoteForm({ closeModal }: NoteFormProp) {
    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeModal]);
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
    const formValues: InitialValuesProp = { title: '', content: '', tag: 'Todo' }


const sayRes = (values: InitialValuesProp, {resetForm}) => {
  console.log(values);
  createNoteRequest(values)
  resetForm();
  closeModal();
};

    return (
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>
                <Formik initialValues={formValues} onSubmit={sayRes}>
                    <Form>
                        <div className={css.formGroup}>
                            <label htmlFor="title">Title</label>
                            <Field id="title" type="text" name="title" className={css.input} />
                            <span data-name="title" className={css.error} />
                        </div>
                        <div className={css.formGroup}>
                            <label htmlFor="content">Content</label>
                            <Field as='textarea'
                                id="content"
                                name="content"
                                rows={8}
                                className={css.textarea}
                            />
                            <span data-name="content" className={css.error} />
                        </div>
                        <div className={css.formGroup}>
                            <label htmlFor="tag">Tag</label>
                            <Field as="select" id="tag" name="tag" className={css.select}>
                                <option value="Todo">Todo</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Meeting">Meeting</option>
                                <option value="Shopping">Shopping</option>
                            </Field>
                            <span data-name="tag" className={css.error} />
                        </div>
                        <div className={css.actions}>
                            <button type="button" onClick={closeModal} className={css.cancelButton}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                
                                className={css.submitButton}
                                disabled={false}
                            >
                                Create note
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}


export default NoteForm