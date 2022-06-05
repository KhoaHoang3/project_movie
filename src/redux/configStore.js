import { configureStore } from '@reduxjs/toolkit';
import getBannerReducer from './reducers/getBannerReducer';
import getListFilmReducer from './reducers/getListFilmReducer';
import getTheaterInfoReducer from './reducers/getTheaterInfoReducer';

export const store = configureStore({
  reducer: {
    getBanner: getBannerReducer,
    getListFilm: getListFilmReducer,
    getTheaterInfo: getTheaterInfoReducer,
  },
});
