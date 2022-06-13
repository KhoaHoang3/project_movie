import { createSlice } from '@reduxjs/toolkit';
import { ACCESSTOKEN } from '../../axios';

// default value always get from localStorage so we must check store
let user = {};
// if USER_LOGIN already existed in localStorage, we just get it out
// and user doesn't have to login again
if (localStorage.getItem('USER_LOGIN')) {
  user = JSON.parse(localStorage.getItem('USER_LOGIN'));
}

const initialState = {
  taiKhoan: '',
  isLoading: false,
  isToken: false,
  //after that assign userLogin with user
  userLogin: user,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserSuccess: (state, action) => {
      return {
        ...state,
        taiKhoan: action.payload,
        isLoading: false,
      };
    },
    loginSuccess: (state, action) => {
      const { payload } = action;
      localStorage.setItem('USER_LOGIN', JSON.stringify(payload));
      localStorage.setItem(ACCESSTOKEN, payload.accessToken);
      return {
        ...state,
        userLogin: payload,
      };
    },
  },
});

export const { registerUserSuccess, loginSuccess } =
  userReducer.actions;

export default userReducer.reducer;
