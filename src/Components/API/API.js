import axios from "axios";

const BASE_URL = "https://pixabay.com/api";
const KEY = "21923762-625ed23d6fd96f8b8b3fcd755";

const getAPI = (search, currPage = 1) => {
  const url = `${BASE_URL}/?q=${search}&page=${currPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(url);
};

export default getAPI;
