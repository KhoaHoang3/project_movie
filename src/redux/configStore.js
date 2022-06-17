import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import getBannerReducer from './reducers/getBannerReducer';
import getBoxOfficeReducer from './reducers/getBoxOfficeReducer';
import getFilmCalendarReducer from './reducers/getFilmCalendarReducer';
import { getFilmDetailReducer } from './reducers/getFilmDetailReducer';
import getFilmsManagementReducer from './reducers/getFilmsManagementReducer';
import getListFilmReducer from './reducers/getListFilmReducer';
import getTheaterInfoReducer from './reducers/getTheaterInfoReducer';
import loadingReducer from './reducers/loadingReducer';
import seatReducer from './reducers/seatReducer';
import userBookingResultReducer from './reducers/userBookingResultReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    getBanner: getBannerReducer,
    getListFilm: getListFilmReducer,
    getTheaterInfo: getTheaterInfoReducer,
    getFilmCalendar: getFilmCalendarReducer,
    getFilmDetail: getFilmDetailReducer,
    user: userReducer,
    getBoxOfficeList: getBoxOfficeReducer,
    seats: seatReducer,
    bookingResult: userBookingResultReducer,
    loading: loadingReducer,
    filmManagement: getFilmsManagementReducer,
  },
});
