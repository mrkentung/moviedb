import api from '../utils/api';

export const getConfiguration = async () => {
  const res = await api.get(`/configuration`, {
    params: {
      api_key: process.env.API_KEY,
    },
  });

  return res;
};
