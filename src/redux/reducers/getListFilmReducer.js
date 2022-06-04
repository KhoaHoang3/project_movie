import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listFilms: [],
};

const getListFilmReducer = createSlice({
  name: 'listFilm',
  initialState,
  reducers: {
    getListFilms: (state, action) => {
      state.listFilms = action.payload;
    },
  },
});

export const { getListFilms } = getListFilmReducer.actions;

export default getListFilmReducer.reducer;
