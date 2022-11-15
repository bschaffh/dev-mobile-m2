import API_CONFIG from './config';

const TMBD_BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p//original';
const POPULAR_MOVIES = '/movie/popular';
const FIND_MOVIES = '/search/movie'

const generateHeaders = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;charset=utf-8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Authorization", `Bearer ${API_CONFIG.KEY_v4}`);

    return myHeaders;
}

export const findMovies = async (query, page=1) => {
    try {
        const movies = await fetch(
            `${TMBD_BASE_URL}${FIND_MOVIES}?query=${query}&page=${page}`, {
                headers: generateHeaders()
            });
        const movies_json = await movies.json();

        return movies_json;
    }
    catch (error) {
        console.log(error);
    }
}

export const findPopularMovies = async (page=1) => {
    try {
        const movies = await fetch(
            `${TMBD_BASE_URL}${POPULAR_MOVIES}?page=${page}`, {
                headers: generateHeaders()
            });
        const movies_json = await movies.json();

        return movies_json;
    }
    catch (error) {
        console.log(error);
    }
}

export const getPoster = async (posterPath) => {
    try {
        const poster = await fetch(`${POSTER_BASE_URL}${posterPath}`, {
            header: generateHeaders()
        })

        return poster;
    }
    catch(error){
        console.log(error);
    }
}
