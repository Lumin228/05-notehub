import axios from "axios";
import type InitialValuesProp from '../types/note';

const token: string = import.meta.env.VITE_DOSTRUP;


export const getNotes = async (text: string, currentPage: number) => {
  const result = await axios.get('https://notehub-public.goit.study/api/notes',
    {
      params: {
        search: text,
        page: currentPage,
        perPage: 12
      },
      headers: {
        Authorization: `Bearer ${token}`,

      }
    }
  )

  return result.data;
}




export const createNoteRequest = async (note: InitialValuesProp) => {
  const res = await axios.post(
    "https://notehub-public.goit.study/api/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};


export const deleteNoteRequest = async (id: string) => {
  const res = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};





