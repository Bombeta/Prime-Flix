// Bade da URL: https://api.themoviedb.org/3/
// ULR DA API: /movie/now_playing?api_key=3f8a34de060d36f77d236dfda2afe1f8&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;