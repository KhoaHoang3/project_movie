import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  userInfo: {},
};

const getUserListReducer = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getUserListManagement: (state, action) => {
      const { payload } = action;
      state.users = payload;
    },
    getUserInfoEdit: (state, action) => {
      const { payload } = action;
      state.userInfo = payload;
    },
  },
});

export const { getUserListManagement, getUserInfoEdit } =
  getUserListReducer.actions;

export default getUserListReducer.reducer;
