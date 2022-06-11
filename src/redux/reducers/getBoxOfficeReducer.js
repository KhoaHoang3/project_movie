import { createSlice } from '@reduxjs/toolkit';
import { calendarTheater } from '../../_core/models/boxOfficeCalendar';
// let saveBoxOffice = {};
// if (localStorage.getItem('BOX_OFFICE_LIST')) {
//   saveBoxOffice = JSON.parse(
//     JSON.stringify(localStorage.getItem('BOX_OFFICE_LIST'))
//   );
// }

let saveCalendarCode = 0;
if (localStorage.getItem('CALENDAR_CODE')) {
  saveCalendarCode = JSON.parse(
    localStorage.getItem('CALENDAR_CODE')
  );
}

const initialState = {
  calendarCode: saveCalendarCode,
  boxOfficeList: new calendarTheater(),
  // boxOfficeList: saveBoxOffice,
};

const getBoxOfficeReducer = createSlice({
  name: 'boxOfficeList',
  initialState,
  reducers: {
    getBoxOfficeList: (state, action) => {
      const { payload } = action;
      state.boxOfficeList = payload;
      localStorage.setItem(
        'BOX_OFFICE_LIST',
        JSON.stringify(payload)
      );
    },
    getFilmCode: (state, action) => {
      const { payload } = action;
      state.calendarCode = payload;
      localStorage.setItem('CALENDAR_CODE', JSON.stringify(payload));
    },
  },
});

export const { getBoxOfficeList, getFilmCode } =
  getBoxOfficeReducer.actions;

export default getBoxOfficeReducer.reducer;