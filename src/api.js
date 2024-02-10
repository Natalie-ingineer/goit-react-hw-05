import axios from "axios";

export const getTrending = async ({ abortController }) => {
  const API_KEY = "0b29f61dccaa81fc9201dda26795b028";
  const url = `https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1`;

  const options = {
    params: {
      accept: "application/json",
      api_key: API_KEY,
    },
  };

  const response = await axios.get(url, options, {
    signal: abortController.signal,
  });

  return response.data.results;
};

export const getMovieById = async (movieId) => {
  const API_KEY = "0b29f61dccaa81fc9201dda26795b028";
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const options = {
    params: {
      accept: "application/json",
      api_key: API_KEY,
    },
  };

  const response = await axios.get(url, options);

  return response.data;
};

export const getMovieByIdCast = async (movieId) => {
  const API_KEY = "0b29f61dccaa81fc9201dda26795b028";
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  const options = {
    params: {
      accept: "application/json",
      api_key: API_KEY,
    },
  };

  const response = await axios.get(url, options);

  return response.data.cast;
};

// export const getTrending = async (query, { abortController }) => {
//   const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

//   const API_KEY = "0b29f61dccaa81fc9201dda26795b028";
//   const options = {
//     params: {
//       accept: "application/json",
//       api_key: API_KEY,
//     },
//   };

//   const response = await axios.get(url, options, {
//     signal: abortController.signal,
//   });

//   return response.data;
// };
