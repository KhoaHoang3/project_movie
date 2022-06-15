import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingSeats: [],
};

const seatReducer = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    booking: (state, action) => {
      const { payload } = action;
      let seatIndex = state.bookingSeats.findIndex(
        (seat) => seat.stt === payload.stt
      );
      // if seatIndex === -1 it's mean that seat doesn't exist in array bookingSeats
      // then state.bookingSeat will add the seat that user are booking
      if (seatIndex === -1) {
        state.bookingSeats.push(payload);
        // if that seat already existed in bookingSeats array
        // it's will delete that seat at index position if user click on that seat again
      } else {
        state.bookingSeats.splice(seatIndex, 1);
      }
      //2nd solution:
      /** if(seatIndex !== -1){ seatIndex !== -1 means the seat already existed in bookingSeats array
       * state.bookingSeats.splice(seatIndex,1)
       * } else{
       * state.bookingSeats.push(payload)
       * }*/
    },

    bookingSuccess: (state, action) => {
      state.bookingSeats = [];
    },
  },
});

export const { booking, bookingSuccess } = seatReducer.actions;

export default seatReducer.reducer;
