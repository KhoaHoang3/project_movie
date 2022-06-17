import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
};

const getFilmsManagementReducer = createSlice({
  name: 'filmsManagement',
  initialState,
  reducers: {
    getFilmsManagement: (state, action) => {
      const { payload } = action;
      state.films = payload;
    },
  },
});

export const { getFilmsManagement } =
  getFilmsManagementReducer.actions;

export default getFilmsManagementReducer.reducer;
