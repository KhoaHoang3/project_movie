import React, { useEffect } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBoxOfficeList,
  getCalendarCode,
  user,
} from '../../redux/selectors';
import '../../assets/styles/screen.css';
import { getBoxOfficeListAction } from '../../redux/thunk/actions';

export default function BookingTicket() {
  //get information of user
  const { userLogin } = useSelector(user);

  //get calendar code and information of each film
  const { calendarCode } = useSelector(getCalendarCode);
  const { boxOfficeList } = useSelector(getBoxOfficeList);
  const { thongTinPhim } = boxOfficeList;
  console.log(thongTinPhim);
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
  // console.log(filmInfo);
  // const { thongTinPhim } = filmInfo;
  // const { diaChi, gioChieu, ngayChieu, tenCumRap, tenPhim, tenRap } =
  //   thongTinPhim;

  const dispatch = useDispatch();

  useEffect(() => {
    const action = getBoxOfficeListAction(calendarCode);
    dispatch(action);
  }, [dispatch]);

  return (
    <div>
      <section className="header">
        <Header />
      </section>
      <section className="booking__ticket">
        <div className="row booking__ticket__section">
          <div className="col-9 booking__ticket__screen">
            <div className="trapezoid">Màn hình</div>
          </div>
          <div className="col-3 booking__ticket__pay">
            <div className="total">
              <h1 className="money text-center">0đ</h1>
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
                <h1>Ghế</h1>
              </div>
              <div className="total">
                <h1>0.000đ</h1>
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
