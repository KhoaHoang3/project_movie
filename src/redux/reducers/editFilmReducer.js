import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFilm: {},
};

const editFilmReducer = createSlice({
  name: 'editFilm',
  initialState,
  reducers: {
    edittingFilm: (state, action) => {
      const { payload } = action;
      state.currentFilm = payload;
    },
  },
});

export const { edittingFilm } = editFilmReducer.actions;

export default editFilmReducer.reducer;
