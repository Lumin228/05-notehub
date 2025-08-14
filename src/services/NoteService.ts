import axios from "axios";
const token: string = import.meta.env.VITE_DOSTRUP;


  const getNotes = async (text: string, currentPage: number) => {
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

  export default getNotes