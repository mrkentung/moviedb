import { useQuery } from 'react-query';
import api from '../utils/api';

export const getMovieDetail = async (id) => {
  const res = await api.get(`/movie/${id}`, {
    params: {
      api_key: process.env.API_KEY,
    },
  });

  return res;
};

export const getMovieRecomendations = async (id) => {
  const res = await api.get(`/movie/${id}/recommendations`, {
    params: {
      api_key: process.env.API_KEY,
    },
  });

  return res;
};

export const getMovieCredits = async (id) => {
  const res = await api.get(`/movie/${id}/credits`, {
    params: {
      api_key: process.env.API_KEY,
    },
  });

  return res;
};

export const useMovieDetail = (id) => {
  return useQuery(['getDetail', id], () => getMovieDetail(id), {
    refetchOnWindowFocus: false,
  });
};
