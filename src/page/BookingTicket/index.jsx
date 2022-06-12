import React, { Fragment, useEffect } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBookingSeats,
  getBoxOfficeList,
  getCalendarCode,
  user,
} from '../../redux/selectors';
import '../../assets/styles/screen.css';
import { getBoxOfficeListAction } from '../../redux/thunk/actions';
import style from '../../assets/styles/seats.module.css';
import { useCallback } from 'react';
import { booking } from '../../redux/reducers/seatReducer';

export default function BookingTicket() {
  //get information of user
  const { userLogin } = useSelector(user);

  //get calendar code and information of each film
  const { calendarCode } = useSelector(getCalendarCode);
  const { boxOfficeList } = useSelector(getBoxOfficeList);
  // const { thongTinPhim } = boxOfficeList;
  // console.log(thongTinPhim);
  // const {
  //   diaChi,
  //   gioChieu,
  //   hinhAnh,
  //   ngayChieu,
  //   tenCumRap,
  //   tenPhim,
  //   tenRap,
  // } = thongTinPhim;
  // get film info from localStorage so when refresh page the info won't disapear
  const filmInfo = JSON.parse(
    localStorage.getItem('BOX_OFFICE_LIST')
  );
  const { thongTinPhim } = filmInfo;
  const { diaChi, gioChieu, ngayChieu, tenCumRap, tenPhim, tenRap } =
    thongTinPhim;
  const { bookingSeats } = useSelector(getBookingSeats);
  console.log('bookingseats', bookingSeats);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = getBoxOfficeListAction(calendarCode);
    dispatch(action);
  }, [dispatch]);

  const renderSeat = () => {
    const { danhSachGhe } = filmInfo;

    const seats = danhSachGhe.map((item, index) => {
      let classVipSeat = item.loaiGhe === 'Vip' ? 'vipSeat' : '';
      let classBookedSeat = item.daDat === true ? 'bookedSeat' : '';
      let classBookingSeat = '';
      let bookingSeatIndex = bookingSeats.findIndex(
        (seat) => seat.maGhe === item.maGhe
      );
      if (bookingSeatIndex !== -1) {
        classBookingSeat = 'bookingSeat';
      }
      // if (item.loaiGhe === 'Thuong') {
      //   return (
      //     <button className={`${style['seats']}`} key={index}>
      //       {item.tenGhe}
      //     </button>
      //   );
      // } else if (item.loaiGhe === 'Vip') {
      //   return (
      //     <button
      //       key={index}
      //       className={`${style['seats']} ${style['vipSeat']}`}
      //     >
      //       {item.tenGhe}
      //     </button>
      //   );
      // }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(booking(item));
            }}
            disabled={item.daDat}
            className={`${style['seats']} ${style[classVipSeat]} ${style[classBookedSeat]} ${style[classBookingSeat]} `}
          >
            {item.stt}
          </button>
        </Fragment>
      );
    });

    return seats;
  };

  return (
    <div>
      <section className="header">
        <Header />
      </section>
      <section className="booking__ticket">
        <div className="row booking__ticket__section">
          {/* SCREEN */}
          <div className="col-9 booking__ticket__screen">
            <div className="trapezoid">Màn hình</div>
            <div className="seats">{renderSeat()}</div>
            <div className="define">
              {/* NORMAL SEAT */}
              <div className="normal__seat">
                <button
                  className={`${style['define__normal__seat']}`}
                ></button>
                <p className="normal__seat__title">Ghế thường</p>
              </div>
              {/* VIP SEAT */}
              <div className="vip__seat">
                <button
                  className={`${style['define__vip__seat']}`}
                ></button>
                <p className="vip__seat__title">Ghế VIP</p>
              </div>
              {/* BOOKING SEAT */}
              <div className="booking__seat">
                <button
                  className={`${style['define__booking__seat']}`}
                ></button>
                <p className="booking__seat__title">Ghế đang đặt</p>
              </div>
              {/* BOOKED SEAT */}
              <div className="booked__seat">
                <button
                  className={`${style['define__booked__seat']}`}
                ></button>
                <p className="booked__seat__title">Ghế đã đặt</p>
              </div>
            </div>
          </div>
          {/* PAY */}
          <div className="col-3 booking__ticket__pay">
            <div className="total">
              <h1 className="money text-center">
                {bookingSeats
                  .reduce((total, item) => {
                    return (total += item.giaVe);
                  }, 0)
                  .toLocaleString()}
                đ
              </h1>
            </div>
            <hr></hr>
            {/* FILM_INFO */}
            <div className="film_info">
              <h1 className="film_info_name">Phim: {tenPhim} </h1>
              <h1 className="film_info_theater">Rạp: {tenCumRap}</h1>
              <h1 className="film_info_address">Địa chỉ: {diaChi}</h1>
              <h1 className="film_info_date">
                {ngayChieu} - {gioChieu} - {tenRap}
              </h1>
            </div>
            <hr></hr>
            {/* SEATS_TOTAL */}
            <div className="seats__total d-flex justify-content-between">
              <div className="seats">
                <h1 className="title">Ghế</h1>
                {bookingSeats.map((item, index) => {
                  return (
                    <span className="booking_seats" key={index}>
                      {item.stt}
                    </span>
                  );
                })}
              </div>
              <div className="total">
                <h1>
                  {bookingSeats
                    .reduce((total, item) => {
                      return (total += item.giaVe);
                    }, 0)
                    .toLocaleString()}
                  đ
                </h1>
              </div>
            </div>
            <hr></hr>
            {/* EMAIL */}
            <div className="user__email">
              <h1>Email:</h1>
              <h2>{userLogin.email}</h2>
            </div>
            <hr></hr>
            {/* USER PHONENUMBER */}
            <div className="user__phonenumber">
              <h1>Số điện thoại</h1>
              <h2>{userLogin.soDT}</h2>
            </div>
            <hr></hr>
            {/* PAY BUTTON */}
            <div className="button">
              <button className="pay__button">ĐẶT VÉ</button>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </div>
  );
}
