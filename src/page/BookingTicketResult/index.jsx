import React, { Fragment, useEffect } from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import { List } from 'antd';
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
  const { result } = useSelector(getUserBookingResult);
  console.log(result);
  const { thongTinDatVe } = result;
  const { dateAndTime } = useSelector(getDateAndTime);
  const data = thongTinDatVe.map((item) => ({
    title: (
      <h2 style={{ fontSize: '1.5rem' }}>Tên phim: {item.tenPhim}</h2>
    ),
    avatar: `${item.hinhAnh}`,
    description: `Ngày đặt: ${moment(item.ngayDat).format(
      'DD/MM/YYYY'
    )}`,

    content: (
      <div>
        <p style={{ fontSize: '1rem' }}>
          Tên rạp:{' '}
          {item.danhSachGhe
            .slice(0, 1)
            .map((theater) => theater.tenHeThongRap)}
        </p>
        <p style={{ fontSize: '1rem' }}>
          {' '}
          Giá vé: {item.giaVe.toLocaleString()} đồng
        </p>
        <p style={{ fontSize: '1rem' }}>
          {' '}
          Thời lượng phim: {item.thoiLuongPhim} phút
        </p>

        <p style={{ fontSize: '1rem' }}>
          Rạp:{' '}
          {item.danhSachGhe
            .slice(0, 1)
            .map((theater) => theater.tenCumRap)}
        </p>

        <p style={{ fontSize: '1rem' }}>
          Ghế đã đặt:{' '}
          {item.danhSachGhe
            .map((theater) => theater.tenGhe)
            .sort()
            .join('-')}
        </p>
      </div>
    ),
  }));

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
          Thông tin đặt vé của {result.hoTen}
        </h1>
        <h2
          style={{ marginBottom: '1.2rem' }}
          className="user__booking__result__subtitle"
        >
          Hãy xem thông tin, địa điểm và thời gian để xem phim vui vẻ
          bạn nhé !
        </h2>
        <div className="user__booking__result__info">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="user__booking__result__container"
          >
            {/* ITEM-1 */}

            <List
              style={{ marginBottom: '1.2rem', width: '1200px' }}
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {},
                pageSize: 3,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  extra={
                    <img
                      style={{ borderRadius: '10px' }}
                      width={200}
                      alt="logo"
                      src={item.avatar}
                    />
                  }
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />

            {/* {result.thongTinDatVe.map((item, index) => {
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
              })} */}
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
