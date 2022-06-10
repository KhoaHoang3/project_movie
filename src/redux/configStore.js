import { configureStore } from '@reduxjs/toolkit';
import getBannerReducer from './reducers/getBannerReducer';
import getBoxOfficeReducer from './reducers/getBoxOfficeReducer';
import getFilmCalendarReducer from './reducers/getFilmCalendarReducer';
import { getFilmDetailReducer } from './reducers/getFilmDetailReducer';
import getListFilmReducer from './reducers/getListFilmReducer';
import getTheaterInfoReducer from './reducers/getTheaterInfoReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    getBanner: getBannerReducer,
    getListFilm: getListFilmReducer,
    getTheaterInfo: getTheaterInfoReducer,
    getFilmCalendar: getFilmCalendarReducer,
    getFilmDetail: getFilmDetailReducer,
    user: userReducer,
    getBoxOfficeList: getBoxOfficeReducer,
  },
});
