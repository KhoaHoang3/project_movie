import { configureStore } from '@reduxjs/toolkit';
import getBannerReducer from './reducers/getBannerReducer';
import getListFilmReducer from './reducers/getListFilmReducer';

export const store = configureStore({
  reducer: {
    getBanner: getBannerReducer,
    getListFilm: getListFilmReducer,
  },
});
