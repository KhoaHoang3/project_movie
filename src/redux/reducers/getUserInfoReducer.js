import { createSlice } from '@reduxjs/toolkit';
import { userInfo } from '../../_core/models/userInformation';
// save user info to local storage for when we refresh page user info won't disapear and user's info will apear in input field
// let saveUserInfo = {};
// if (localStorage.getItem('USER_INFO')) {
//   saveUserInfo = JSON.parse(localStorage.getItem('USER_INFO'));
// }
const initialState = {
  // userInfo: saveUserInfo,
  userInfo: new userInfo(),
};

const getUserInfoReducer = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfoEditPage: (state, action) => {
      const { payload } = action;
      state.userInfo = payload;
      // localStorage.setItem(
      //   'USER_INFO',
      //   JSON.stringify(state.userInfo)
      // );
    },
  },
});

export const { getUserInfoEditPage } = getUserInfoReducer.actions;

export default getUserInfoReducer.reducer;
