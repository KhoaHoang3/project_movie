import { createSlice } from '@reduxjs/toolkit';
import { BookingResult } from '../../_core/models/userBookingResult';

const initialState = {
  // email: '',
  // hoTen: '',
  // loaiNguoiDung: { maLoaiNguoiDung: '', tenLoai: '' },
  // maLoaiNguoiDung: '',
  // maNhom: '',
  // matKhau: '',
  // taiKhoan: '',
  // thongTinDatVe: [],
  // dateTime: '',
  result: new BookingResult(),
};

const userBookingResult = createSlice({
  name: 'bookingResult',
  initialState,
  reducers: {
    bookingResult: (state, action) => {
      const { payload } = action;
      state.result = payload;
    },
  },
});

export const { bookingResult } = userBookingResult.actions;

export default userBookingResult.reducer;
