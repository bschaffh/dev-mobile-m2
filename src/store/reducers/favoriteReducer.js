import { createSlice} from '@reduxjs/toolkit'

const initialState = {
    favoriteMovies: []
};

export const favoriteReducer = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavoriteMovie: (state, action) => {
            state.favoriteMovies.push(action.payload);
        },
        removeFavoriteMovie: (state, action) => {
            const deleteId = action.payload;
            state.favoriteMovies = state.favoriteMovies.filter((movieId) => movieId != deleteId);
        }
    }
})

export const { addFavoriteMovie, removeFavoriteMovie } = favoriteReducer.actions;
export default favoriteReducer.reducer;