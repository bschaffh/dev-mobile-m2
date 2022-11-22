import API_CONFIG from './config';

const TMBD_BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_DETAILS = '/movie';
const POPULAR_MOVIES = '/movie/popular';
const FIND_MOVIES = '/search/movie'
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const getPosterSource = (posterPath) => {
    const isPosterLocal = posterPath;
    let a = !isPosterLocal ? require("../../assets/noPoster.jpg") : {uri: `${POSTER_BASE_URL}${posterPath}`};
    console.log(a);
    return a;
}

const generateHeaders = () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${API_CONFIG.KEY_v4}`);

    return myHeaders;
}

export const findMoviesByQuery = async (query, page=1) => {
    try {
        const res = await fetch(
            `${TMBD_BASE_URL}${FIND_MOVIES}?query=${query}&page=${page}`, {
                headers: generateHeaders()
            });
        const res_json = await res.json();
            console.log(res_json);
        if (res_json?.success != undefined && res_json.success == "false")
            throw new Error("Impossible de récupérer les films");

        return res_json;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const findPopularMovies = async (page=1) => {
    try {
        const res = await fetch(
            `${TMBD_BASE_URL}${POPULAR_MOVIES}?page=${page}`, {
                headers: generateHeaders()
            });
        const res_json = await res.json();

        if (res_json?.success != undefined && res_json.success == false)
            throw new Error("Impossible de récupérer les films");

        return res_json;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export const getMovieDetailsById = async (movieId) => {
    try {
        const movieDetails = await fetch(`${TMBD_BASE_URL}${MOVIE_DETAILS}/${movieId}?api_key=${API_CONFIG.KEY_v3}`, {});

        const movieDetailsJson = await movieDetails.json();
        
        if (movieDetailsJson.success != undefined && movieDetailsJson.success == false)
            throw new Error("Impossible de récupérer le film");

        return movieDetailsJson;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
