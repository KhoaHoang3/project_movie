import { configureStore } from '@reduxjs/toolkit';
import getBannerReducer from './reducers/getBannerReducer';
import getFilmCalendarReducer from './reducers/getFilmCalendarReducer';
import { getFilmDetailReducer } from './reducers/getFilmDetailReducer';
import getListFilmReducer from './reducers/getListFilmReducer';
import getTheaterInfoReducer from './reducers/getTheaterInfoReducer';

export const store = configureStore({
  reducer: {
    getBanner: getBannerReducer,
    getListFilm: getListFilmReducer,
    getTheaterInfo: getTheaterInfoReducer,
    getFilmCalendar: getFilmCalendarReducer,
    getFilmDetail: getFilmDetailReducer,
  },
});
