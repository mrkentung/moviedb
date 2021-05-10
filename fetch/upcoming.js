import { useQuery } from 'react-query';
import api from '../utils/api';

export const getUpcoming = async (page = 1) => {
  const res = await api.get('/movie/upcoming', {
    params: {
      api_key: process.env.API_KEY,
      page: page,
    },
  });

  return res;
};

export const useUpcoming = (page) => {
  return useQuery(['getUpcoming', page], () => getUpcoming(page), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  });
};
