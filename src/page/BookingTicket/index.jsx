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
import {
  bookingTicketAction,
  getBoxOfficeListAction,
} from '../../redux/thunk/actions';
import style from '../../assets/styles/seats.module.css';
import { UserOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import { booking } from '../../redux/reducers/seatReducer';
import { calendarTheater } from '../../_core/models/boxOfficeCalendar';
import { Tabs } from 'antd';
import BookingTicketResult from '../BookingTicketResult';
import useWindowResize from '../../utils/useWindowResize';
const { TabPane } = Tabs;

function BookingTicket(props) {
  //get information of user
  const { userLogin } = useSelector(user);

  //get calendar code and information of each film
  const { calendarCode } = useSelector(getCalendarCode);
  const { boxOfficeList } = useSelector(getBoxOfficeList);
  const { thongTinPhim } = boxOfficeList;
  const {
    diaChi,
    gioChieu,
    hinhAnh,
    ngayChieu,
    tenCumRap,
    tenPhim,
    tenRap,
  } = thongTinPhim;

  // get film info from localStorage so when refresh page the info won't disapear
  // const filmInfo = JSON.parse(
  //   localStorage.getItem('BOX_OFFICE_LIST')
  // );
  // const { thongTinPhim } = filmInfo;
  // const { diaChi, gioChieu, ngayChieu, tenCumRap, tenPhim, tenRap } =
  //   thongTinPhim;

  const { bookingSeats } = useSelector(getBookingSeats);

  const dispatch = useDispatch();
  const { width } = useWindowResize();

  useEffect(() => {
    const action = getBoxOfficeListAction(calendarCode);
    dispatch(action);
  }, [dispatch, calendarCode]);

  const renderSeat = () => {
    // const { danhSachGhe } = filmInfo;
    const { danhSachGhe } = boxOfficeList;

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
      let classUserBooking = '';
      if (item.taiKhoanNguoiDat === userLogin.taiKhoan) {
        classUserBooking = 'userBookingSeat';
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
            className={`${style['seats']} ${style[classUserBooking]} ${style[classVipSeat]} ${style[classBookedSeat]} ${style[classBookingSeat]} `}
          >
            {item.taiKhoanNguoiDat === userLogin.taiKhoan ? (
              <UserOutlined style={{ fontSize: '2rem' }} />
            ) : (
              item.stt
            )}
          </button>

          {(index + 1) % 16 === 0 ? <br /> : ''}
        </Fragment>
      );
    });

    return seats;
  };

  const bookingTicketFunc = () => {
    const action = bookingTicketAction(calendarCode, bookingSeats);
    dispatch(action);
  };

  return (
    <div>
      <section className="">
        <Header />
      </section>
      <section className="booking__ticket">
        <div className="row booking__ticket__section">
          {/* SCREEN */}
          <div className="col-8 booking__ticket__screen">
            <div className="trapezoid">M??n h??nh</div>
            <div className="seats">{renderSeat()}</div>
            <div className="define">
              {/* NORMAL SEAT */}
              <div className="normal__seat">
                <button
                  className={`${style['define__normal__seat']}`}
                ></button>
                <p className="normal__seat__title">Gh??? th?????ng</p>
              </div>
              {/* VIP SEAT */}
              <div className="vip__seat">
                <button
                  className={`${style['define__vip__seat']}`}
                ></button>
                <p className="vip__seat__title">Gh??? VIP</p>
              </div>
              {/* BOOKING SEAT */}
              <div className="booking__seat">
                <button
                  className={`${style['define__booking__seat']}`}
                ></button>
                <p className="booking__seat__title">Gh??? ??ang ?????t</p>
              </div>
              {/* BOOKED SEAT */}
              <div className="booked__seat">
                <button
                  className={`${style['define__booked__seat']}`}
                ></button>
                <p className="booked__seat__title">Gh??? ???? ?????t</p>
              </div>
              {/* USER BOOKING SEAT */}
              <div className="user__booking__seat">
                <button
                  className={`${style['define__user__booking__seat']}`}
                >
                  <UserOutlined style={{ fontSize: '2rem' }} />
                </button>
                <p className="user__booking__seat__title">
                  Gh??? ng?????i d??ng ?????t
                </p>
              </div>
            </div>
          </div>
          {/* PAY */}
          <div className="col-4 booking__ticket__pay">
            <div className="total">
              <h1 className="money text-center">
                {bookingSeats
                  .reduce((total, item) => {
                    return (total += item.giaVe);
                  }, 0)
                  .toLocaleString()}
                ??
              </h1>
            </div>
            <hr></hr>
            {/* FILM_INFO */}
            <div className="film_info">
              <h1 className="film_info_name">Phim: {tenPhim}</h1>
              <h1 className="film_info_theater">R???p: {tenCumRap}</h1>
              <h1 className="film_info_address">?????a ch???: {diaChi}</h1>
              <h1 className="film_info_date">
                Ng??y chi???u: {ngayChieu} - Gi??? chi???u: {gioChieu} - R???p:{' '}
                {tenRap}
              </h1>
            </div>
            <hr></hr>
            {/* SEATS_TOTAL */}
            <div className="seats__total d-flex justify-content-between">
              <div className="seats">
                <h1
                  style={{ fontWeight: 'bolder' }}
                  className="title"
                >
                  Gh???
                </h1>
                <span className="booking_seats">
                  {bookingSeats
                    .map((item) => item.stt)
                    .sort()
                    .join('-')}
                </span>
              </div>
              <div className="total">
                <h1>
                  {bookingSeats
                    .reduce((total, item) => {
                      return (total += item.giaVe);
                    }, 0)
                    .toLocaleString()}
                  ??
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
              <h1>S??? ??i???n tho???i</h1>
              <h2>{userLogin.soDT}</h2>
            </div>
            <hr></hr>
            {/* PAY BUTTON */}
            <div className="button">
              <button
                style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                onClick={() => {
                  bookingTicketFunc();
                }}
                className="pay__button"
              >
                ?????T V??
              </button>
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

export default function (props) {
  return (
    <Tabs style={{ marginTop: '8rem' }} defaultActiveKey="1">
      <TabPane
        tab={
          <h1 style={{ fontSize: '1.2rem', marginLeft: '0.5rem' }}>
            01. ?????T GH??? & THANH TO??N
          </h1>
        }
        key="1"
      >
        <BookingTicket />
      </TabPane>
      <TabPane
        tab={
          <h1 style={{ fontSize: '1.2rem' }}>02. K???T QU??? ?????T V??</h1>
        }
        key="2"
      >
        <BookingTicketResult />
      </TabPane>
    </Tabs>
  );
}
