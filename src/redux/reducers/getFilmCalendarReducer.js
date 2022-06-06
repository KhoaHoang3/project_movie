import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  calendar: [],
};

const getFilmCalendarReducer = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    getFilmCalendar: (state, action) => {
      state.calendar = action.payload;
    },
  },
});

export const { getFilmCalendar } = getFilmCalendarReducer.actions;

export default getFilmCalendarReducer.reducer;
