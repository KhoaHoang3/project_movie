import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ACCESSTOKEN, http, GROUPID } from '../../axios';
import {
  bookingTicketURL,
  getBannerURL,
  getBoxOfficeListURL,
  getFilmsForManagementURL,
  getListFilmURL,
  getShowtimeEachFilmURL,
  getTheaterInfo,
  getTheaterShowtimeInfoURL,
  userBookingResultURL,
  userLoginURL,
  userRegisterURL,
  deleteFilmManagementURL,
  uploadNewMovieURL,
  updateFilmURL,
  createShowtimeURL,
  getUserListURL,
  deleteUserURL,
  updateUserURL,
  addUserURL,
  getUserInfoURL,
} from '../../axios/apiURL';
import { calendarTheater } from '../../_core/models/boxOfficeCalendar';
import { getBannerFilms } from '../reducers/getBannerReducer';
import { getBoxOfficeList } from '../reducers/getBoxOfficeReducer';
import { getFilmCalendar } from '../reducers/getFilmCalendarReducer';
import { getFilmsManagement } from '../reducers/getFilmsManagementReducer';
import { getListFilms } from '../reducers/getListFilmReducer';
import {
  theaterInfomation,
  theaterShowtimeInfo,
} from '../reducers/getTheaterInfoReducer';
import { getUserInfoEditPage } from '../reducers/getUserInfoReducer';
import { getUserListManagement } from '../reducers/getUserListReducer';
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
        '????ng k?? t??i kho???n th??nh c??ng, web s??? chuy???n h?????ng b???n qua trang ????ng nh???p',
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
        '????ng nh???p th??nh c??ng, web s??? chuy???n h?????ng b???n qua trang ch???',
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
      dispatch(displayLoading());
      const result = await http.get(
        `${getBoxOfficeListURL}?MaLichChieu=${filmCode}`
      );

      const action = getBoxOfficeList(result.data.content);
      dispatch(action);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
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
      toast.success('?????t v?? th??nh c??ng', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      dispatch(hideLoading());

      toast.error(error.response.data.content, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

// get list film action
export const getFilmsForManagementAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getFilmsForManagementURL}?maNhom=${GROUPID}`
      );
      const action = getFilmsManagement(result.data.content);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
};

// delete film action
export const deleteFilmManagementAction = (filmCode) => {
  return async (dispatch) => {
    try {
      const result = await http.delete(
        `${deleteFilmManagementURL}?MaPhim=${filmCode}`
      );

      dispatch(getFilmsForManagementAction());

      toast.success('X??a phim th??nh c??ng !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//upload new movie action
export const uploadNewMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await http.post(uploadNewMovieURL, formData);
      dispatch(getFilmsForManagementAction());

      toast.success('Th??m phim th??nh c??ng !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//update film action
export const updateFilmAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await http.post(updateFilmURL, formData);
      dispatch(getFilmsForManagementAction());

      toast.success('C???p nh???t phim th??nh c??ng !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response.statusText, {
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

// create showtime movie
export const createShowtimeMovieAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.post(createShowtimeURL, data);
      toast.success('T???o l???ch chi???u phim th??nh c??ng !', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

//get user list action
export const getUserListAction = () => {
  return async (dispatch) => {
    try {
      const result = await http.get(
        `${getUserListURL}?MaNhom=${GROUPID}`
      );
      dispatch(getUserListManagement(result.data.content));
    } catch (error) {
      toast.error(error.response.data.content);
    }
  };
};

//delete user action
export const deleteUserAction = (userAccount) => {
  return async (dispatch) => {
    try {
      const result = await http.delete(
        `${deleteUserURL}?TaiKhoan=${userAccount}`
      );
      dispatch(getUserListAction());
      toast.success('X??a ng?????i d??ng th??nh c??ng', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

// update user at admin page
export const updateUserAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.put(updateUserURL, data);
      console.log(result);
      dispatch(getUserListAction());
      toast.success('C???p nh???t th??ng tin th??nh c??ng', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

//add user
export const addUserAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.post(addUserURL, data);
      toast.success('Th??m ng?????i d??ng th??nh c??ng !', {
        position: 'top-center',
        autoClose: 1000,
      });
    } catch (error) {
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

// update user at user setting account
export const updateUserActionV2 = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.put(updateUserURL, data);
      console.log(result);
      toast.success(
        'C???p nh???t th??ng tin th??nh c??ng, h??y ????ng nh???p l???i ????? th???y s??? thay ?????i',
        {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};

// get user info for edit
export const getUserInfoAction = () => {
  return async (dispatch) => {
    try {
      dispatch(displayLoading());
      const result = await http.post(getUserInfoURL);

      await dispatch(getUserInfoEditPage(result.data.content));
      console.log(result);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());

      toast.error(error.response.data.content, {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  };
};
