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

      toast.success('Xóa phim thành công !', {
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

      toast.success('Thêm phim thành công !', {
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

      toast.success('Cập nhật phim thành công !', {
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
      toast.success('Tạo lịch chiếu phim thành công !', {
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
      toast.success('Xóa người dùng thành công', {
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

// update user
export const updateUserAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await http.put(updateUserURL, data);
      console.log(result);
      dispatch(getUserListAction());
      toast.success('Cập nhật thông tin người dùng thành công', {
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
      toast.success('Thêm người dùng thành công !', {
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
