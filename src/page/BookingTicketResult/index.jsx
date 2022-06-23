import React, { Fragment, useEffect } from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Pagination } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookingResultAction } from '../../redux/thunk/actions';
import {
  getDateAndTime,
  getUserBookingResult,
  user,
} from '../../redux/selectors';
import moment from 'moment';

export default function BookingTicketResult() {
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getUserBookingResultAction();
    dispatch(action);
  }, [dispatch]);
  const { userLogin } = useSelector(user);
  const { result } = useSelector(getUserBookingResult);
  const { thongTinDatVe } = result;
  const { dateAndTime } = useSelector(getDateAndTime);

  return (
    <Fragment>
      {/* HEADER */}
      <section className="">
        <Header />
      </section>

      {/* USER BOOKING RESULT */}
      <div className="user__booking__result">
        <h1
          style={{ color: '#5bb56f' }}
          className="user__booking__result__title"
        >
          Thông tin đặt vé của {userLogin.hoTen}
        </h1>
        <h2 className="user__booking__result__subtitle">
          Hãy xem thông tin, địa điểm và thời gian để xem phim vui vẻ
          bạn nhé !
        </h2>
        <div className="user__booking__result__info">
          <div className="user__booking__result__container">
            <div className="row ">
              {/* ITEM-1 */}

              {result.thongTinDatVe.map((item, index) => {
                return (
                  <div key={index} className="col-6 mt-5">
                    <div className="user__booking__result__info_2 d-flex ">
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          className="rounded-circle"
                          src={item.hinhAnh}
                          alt=""
                          height={200}
                          width={200}
                        />
                      </div>
                      <div className="ml-3">
                        <h1
                          style={{
                            fontSize: '1.5rem',
                            color: '#0b4dbe',
                          }}
                        >
                          Tên phim: {item.tenPhim}
                        </h1>
                        <h1 style={{ fontSize: '1.2rem' }}>
                          Ngày đặt:{' '}
                          {moment(item.ngayDat).format(
                            'DD/MM/YYYY hh:mm A'
                          )}
                        </h1>
                        <h1 style={{ fontSize: '1.2rem' }}>
                          Ngày chiếu:{' '}
                          {moment(dateAndTime).format(
                            'DD/MM/YYYY hh:mm A'
                          )}
                        </h1>
                        <h1 style={{ fontSize: '1.2rem' }}>
                          Thời lượng: {item.thoiLuongPhim}p
                        </h1>
                        <h1 style={{ fontSize: '1.2rem' }}>
                          Giá vé: {item.giaVe.toLocaleString()} đ
                        </h1>
                        {/* FOR THEATER INFO */}
                        <h1 style={{ fontSize: '1.2rem' }}>
                          Rạp:{' '}
                          {item.danhSachGhe
                            .slice(0, 1)
                            .map((theater) => theater.tenHeThongRap)}
                        </h1>
                        <h1 style={{ fontSize: '1.2rem' }}>
                          Ghế đã đặt:{' '}
                          <span
                            style={{
                              color: '#5bb56f',
                              fontWeight: 'bolder',
                            }}
                          >
                            {' '}
                            {item.danhSachGhe
                              .map((seat) => seat.tenGhe)
                              .sort()
                              .join('-')}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* <div className="col-6">
                <div className="user__booking__result__info_2 d-flex ">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      className="rounded-circle"
                      src="https://movienew.cybersoft.edu.vn/hinhanh/avengers-infinity-war.jpg"
                      alt=""
                      height={150}
                      width={150}
                    />
                  </div>
                  <div className="ml-3">
                    <h1>Tên phim: Avenger Infinity War</h1>
                    <h1>Ngày đặt: 13-6-2022</h1>
                    <h1>Thời lượng: 120p</h1>
                    <h1>Giá vé: 75.000đ</h1>
                   
                    <h1>Rạp: </h1>
                    <h1>Ghế đã đặt:</h1>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/*FOOTER  */}
      <section className="footer">
        <Footer />
      </section>
    </Fragment>
  );
}
