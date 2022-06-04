import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bannerFilms: [],
};

const getBannerReducer = createSlice({
  name: 'film',
  initialState,
  reducers: {
    getBannerFilms: (state, action) => {
      state.bannerFilms = action.payload;
    },
  },
});

export const { getBannerFilms } = getBannerReducer.actions;

export default getBannerReducer.reducer;
