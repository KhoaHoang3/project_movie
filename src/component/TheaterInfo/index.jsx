import React, { memo, useEffect, useState } from 'react';
import { Tag, Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBoxOfficeListAction,
  getTheaterInfoAction,
  getTheaterShowtimeInfoAction,
} from '../../redux/thunk/actions';
import {
  getCalendarCode,
  getTheaterInfo,
  getTheaterShowtimeInfo,
} from '../../redux/selectors';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { getFilmCode } from '../../redux/reducers/getBoxOfficeReducer';
const { TabPane } = Tabs;

function TheaterInfo() {
  const [tabPosition, setTabPosition] = useState('left');
  const { calendarCode } = useSelector(getCalendarCode);

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  const dispatch = useDispatch();
  const { theaterShowtime } = useSelector(getTheaterShowtimeInfo);
  //dispatch action theater information
  useEffect(() => {
    const action = getTheaterInfoAction();
    dispatch(action);
  }, [dispatch]);

  //dispatch action theater showtime action
  useEffect(() => {
    const actionThunk = getTheaterShowtimeInfoAction();
    dispatch(actionThunk);
  }, [dispatch]);

  //get box office list info
  useEffect(() => {
    const action = getBoxOfficeListAction(calendarCode);
    dispatch(action);
  }, [dispatch]);

  // check user login or not
  const renderCalendar = (maLichChieu, ngayChieuGioChieu) => {
    if (localStorage.getItem('USER_LOGIN')) {
      return (
        <NavLink
          style={{ fontSize: '1.2rem' }}
          onClick={() => {
            dispatch(getFilmCode(maLichChieu));
          }}
          to={`/booking_ticket/${maLichChieu}`}
        >
          {moment(ngayChieuGioChieu).format('DD.MM.YYYY hh:mm A')}
        </NavLink>
      );
    } else {
      return (
        <NavLink
          style={{ fontSize: '1.2rem' }}
          onClick={() => {
            toast.error('Bạn phải đăng nhập để đặt vé !', {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
            });
          }}
          to={'/login'}
        >
          {moment(ngayChieuGioChieu).format('DD.MM.YYYY hh:mm A')}
        </NavLink>
      );
    }
  };

  return (
    <div className="container">
      <h1 className="theater__info">THÔNG TIN CÁC RẠP CHIẾU</h1>
      <Tabs
        style={{ width: '95rem', borderRadius: '2rem' }}
        tabPosition={tabPosition}
      >
        {theaterShowtime.map((item, index) => {
          return (
            <TabPane
              key={index}
              tab={
                <img
                  style={{
                    width: '5rem',
                    height: '5rem',
                    borderRadius: '50%',
                  }}
                  src={item.logo}
                ></img>
              }
            >
              <Tabs tabPosition={tabPosition}>
                {item.lstCumRap.map((theater, index) => {
                  return (
                    <TabPane
                      key={index}
                      tab={
                        <div className="d-flex justify-content-center">
                          <div className="image-1">
                            <img
                              style={{ width: 120, height: 130 }}
                              src={theater.hinhAnh}
                            ></img>
                          </div>

                          <div className="address text-left ml-3 d-flex flex-column justify-content-center">
                            <p
                              style={{ fontSize: '1.2rem' }}
                              className="font-weight-bold"
                            >
                              Tên rạp:
                            </p>

                            <p style={{ fontSize: '1.2rem' }}>
                              {theater.tenCumRap}
                            </p>
                            {/* <p className="font-weight-bold">
                              Địa chỉ:
                            </p>
                            <p>{theater.diaChi}</p> */}
                          </div>
                        </div>
                      }
                    >
                      {theater.danhSachPhim.map((film, index) => {
                        return (
                          <div key={index} className="d-flex mb-5">
                            <div className="image-2">
                              <img
                                style={{ width: 120, height: 130 }}
                                src={film.hinhAnh}
                              ></img>
                            </div>
                            <div className="name ml-3 ">
                              <p
                                style={{ fontSize: '1.2rem' }}
                                className="font-weight-bold"
                              >
                                Tên phim:
                              </p>
                              <p style={{ fontSize: '1.2rem' }}>
                                {film.tenPhim}
                              </p>
                              <div>
                                <p
                                  style={{ fontSize: '1.2rem' }}
                                  className="font-weight-bold"
                                >
                                  Địa chỉ:
                                </p>
                                <p style={{ fontSize: '1.2rem' }}>
                                  {theater.diaChi}
                                </p>
                              </div>
                              <p
                                style={{ fontSize: '1.2rem' }}
                                className="font-weight-bold"
                              >
                                Ngày và giờ chiếu:
                              </p>
                              <div className="row">
                                {film.lstLichChieuTheoPhim
                                  .slice(0, 6)
                                  ?.map((date, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="col-4"
                                      >
                                        <Tag
                                          className="time"
                                          color="green"
                                          style={{
                                            marginRight: '16rem',
                                            marginBottom: '1.2rem',
                                          }}
                                        >
                                          {renderCalendar(
                                            date.maLichChieu,
                                            date.ngayChieuGioChieu
                                          )}
                                          {/* <NavLink
                                            className={''}
                                            key={index}
                                            to={'/booking_ticket/$'}
                                          >
                                            {moment(
                                              date.ngayChieuGioChieu
                                            ).format(
                                              'DD.MM.YYYY hh:mm A'
                                            )}
                                          </NavLink> */}
                                        </Tag>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </TabPane>
          );
        })}
        {/* <TabPane  tab="Tab 1" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane> */}
      </Tabs>
    </div>
  );
}

export default memo(TheaterInfo);
