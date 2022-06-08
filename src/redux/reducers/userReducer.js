import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taiKhoan: '',
  isLoading: false,
  isToken: false,
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
  },
});

export const { registerUserSuccess } = userReducer.actions;

export default userReducer.reducer;
