import { useQuery } from 'react-query';
import api from '../utils/api';

const getGenres = async () => {
  const res = await api.get('/genre/movie/list', {
    params: {
      api_key: process.env.API_KEY,
    },
  });

  return res;
};

export const useGenres = () => {
  return useQuery('getGenres', () => getGenres(), {
    refetchOnWindowFocus: false,
  });
};

export const getPopular = async (page = 1) => {
  const res = await api.get('/movie/popular', {
    params: {
      api_key: process.env.API_KEY,
      page: page,
    },
  });

  return res;
};

export const usePopular = (page) => {
  return useQuery(['getPopular', page], () => getPopular(page), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  });
};
