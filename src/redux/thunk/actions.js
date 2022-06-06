import { ACCESSTOKEN, http, GROUPID } from '../../axios';
import {
  getBannerURL,
  getListFilmURL,
  getShowtimeEachFilmURL,
  getTheaterInfo,
  getTheaterShowtimeInfoURL,
} from '../../axios/apiURL';
import { getBannerFilms } from '../reducers/getBannerReducer';
import { getFilmCalendar } from '../reducers/getFilmCalendarReducer';
import { getListFilms } from '../reducers/getListFilmReducer';
import {
  theaterInfomation,
  theaterShowtimeInfo,
} from '../reducers/getTheaterInfoReducer';

// Get banner film action

export const getBannerFilmsAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(getBannerURL);
      const action = getBannerFilms(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

//get list film and banner film
export const getListFilmAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getListFilmURL}?maNhom=${GROUPID}`
      );
      const action = getListFilms(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

//Get theater information
export const getTheaterInfoAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(getTheaterInfo);
      const action = theaterInfomation(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

//get theater showtime
export const getTheaterShowtimeInfoAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getTheaterShowtimeInfoURL}?maNhom=${GROUPID}`
      );
      const action = theaterShowtimeInfo(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

//get showtime of each film
export const getShowtimeEachFilmAction = (filmID) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getShowtimeEachFilmURL}?MaPhim=${filmID}`
      );
      console.log(result);
      const action = getFilmCalendar(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};
