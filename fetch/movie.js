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

export const getMovieByGenre = async (genreId, page = 1) => {
  const res = await api.get(`/discover/movie`, {
    params: {
      api_key: process.env.API_KEY,
      with_genres: genreId,
      page: page,
    },
  });

  return res;
};

export const useMovieByGenre = (genreId, page) => {
  return useQuery(['getMovieByGenres', page, genreId], () => getMovieByGenre(genreId, page), {
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
