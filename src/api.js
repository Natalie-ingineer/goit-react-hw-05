import axios from "axios";

export const fetchMovie = async (query) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const API_KEY = "0b29f61dccaa81fc9201dda26795b028";
  const options = {
    params: {
      accept: "application/json",
      api_key: API_KEY,
    },
  };

  const response = await axios.get(url, options);

  return response.data;
};
