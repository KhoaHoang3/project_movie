import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ACCESSTOKEN, http, GROUPID } from '../../axios';
import {
  bookingTicketURL,
  getBannerURL,
  getBoxOfficeListURL,
  getListFilmURL,
  getShowtimeEachFilmURL,
  getTheaterInfo,
  getTheaterShowtimeInfoURL,
  userBookingResultURL,
  userLoginURL,
  userRegisterURL,
} from '../../axios/apiURL';
import { calendarTheater } from '../../_core/models/boxOfficeCalendar';
import { getBannerFilms } from '../reducers/getBannerReducer';
import { getBoxOfficeList } from '../reducers/getBoxOfficeReducer';
import { getFilmCalendar } from '../reducers/getFilmCalendarReducer';
import { getListFilms } from '../reducers/getListFilmReducer';
import {
  theaterInfomation,
  theaterShowtimeInfo,
} from '../reducers/getTheaterInfoReducer';
import {
  displayLoading,
  hideLoading,
} from '../reducers/loadingReducer';
import { bookingSuccess } from '../reducers/seatReducer';
import { bookingResult } from '../reducers/userBookingResultReducer';
import {
  loginSuccess,
  registerUserSuccess,
} from '../reducers/userReducer';

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
      const action = getFilmCalendar(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

//user register action
export const userRegisterAction = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      const result = await http.post(userRegisterURL, userInfo);

      const { content } = result.data;

      const { taiKhoan } = content;

      dispatch(registerUserSuccess(taiKhoan));

      toast.success(
        'Đăng ký tài khoản thành công, web sẽ chuyển hướng bạn qua trang đăng nhập',
        {
          position: 'top-center',
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (error) {
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

// user login action

export const userLoginAction = (userInfo, navigate) => {
  return async (dispatch) => {
    try {
      const result = await http.post(userLoginURL, userInfo);

      const action = loginSuccess(result.data.content);
      dispatch(action);
      toast.success(
        'Đăng nhập thành công, web sẽ chuyển hướng bạn qua trang chủ',
        {
          position: 'top-center',
          autoClose: 1400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
};

//get box office list
export const getBoxOfficeListAction = (filmCode) => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getBoxOfficeListURL}?MaLichChieu=${filmCode}`
      );

      const action = getBoxOfficeList(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

// booking ticket action

export const bookingTicketAction = (maLichChieu, danhSachVe) => {
  return async (dispatch) => {
    try {
      dispatch(displayLoading());

      const result = await http.post(bookingTicketURL, {
        maLichChieu,
        danhSachVe,
      });

      //dispatch is a asynchronous function
      //so use await to handle asynchronous
      // call getBoxOfficeList again to refresh booking ticket page
      await dispatch(getBoxOfficeListAction(maLichChieu));

      //clear data when user booking success
      await dispatch(bookingSuccess());

      dispatch(hideLoading());
      toast.success('Đặt vé thành công', {
        position: 'bottom-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
    }
  };
};

// get user booking result
export const getUserBookingResultAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoading());

      const result = await http.post(userBookingResultURL);

      const action = bookingResult(result.data.content);
      dispatch(action);

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
    }
  };
};
