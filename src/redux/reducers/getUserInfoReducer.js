import { createSlice } from '@reduxjs/toolkit';
// save user info to local storage for when we refresh page user info won't disapear and user's info will apear in input field
let saveUserInfo = {};
if (localStorage.getItem('USER_INFO')) {
  saveUserInfo = JSON.parse(localStorage.getItem('USER_INFO'));
}
const initialState = {
  userInfo: {},
};

const getUserInfoReducer = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfoEditPage: (state, action) => {
      const { payload } = action;
      console.log('payload', payload);
      state.userInfo = payload;
      localStorage.setItem('USER_INFO', JSON.stringify(payload));
    },
  },
});

export const { getUserInfoEditPage } = getUserInfoReducer.actions;

export default getUserInfoReducer.reducer;
