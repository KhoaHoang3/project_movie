import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theaterInfo: [],
  theaterShowtime: [],
};

const getTheaterInfoReducer = createSlice({
  name: 'theaterInfo',
  initialState,
  reducers: {
    theaterInfomation: (state, action) => {
      state.theaterInfo = action.payload;
    },
    theaterShowtimeInfo: (state, action) => {
      state.theaterShowtime = action.payload;
    },
  },
});

export const { theaterInfomation, theaterShowtimeInfo } =
  getTheaterInfoReducer.actions;

export default getTheaterInfoReducer.reducer;
