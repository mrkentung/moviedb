import { useQuery } from 'react-query';
import api from '../utils/api';

export const getTopRated = async (page = 1) => {
  const res = await api.get('/movie/top_rated', {
    params: {
      api_key: process.env.API_KEY,
      page: page,
    },
  });

  return res;
};

export const useTopRated = (page) => {
  return useQuery(['getTopRated', page], () => getTopRated(page), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  });
};
