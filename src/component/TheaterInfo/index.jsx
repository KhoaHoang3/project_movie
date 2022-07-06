import React, { memo, useEffect, useState } from 'react';
import { Tag, Tabs, Radio, Space, Collapse } from 'antd';
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
import {
  getDateAndTime,
  getFilmCode,
} from '../../redux/reducers/getBoxOfficeReducer';
import useWindowSize from '../../utils/useWindowResize';
import useWindowResize from '../../utils/useWindowResize';
const { TabPane } = Tabs;
const { Panel } = Collapse;

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

  // check user login or not
  const renderCalendar = (maLichChieu, ngayChieuGioChieu) => {
    if (localStorage.getItem('USER_LOGIN')) {
      return (
        <NavLink
          style={{ fontSize: '1.2rem' }}
          onClick={() => {
            dispatch(getFilmCode(maLichChieu));
            dispatch(getDateAndTime(ngayChieuGioChieu));
          }}
          to={`/booking_ticket/${maLichChieu}`}
        >
          {moment(ngayChieuGioChieu).format('DD/MM/YYYY hh:mm A')}
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
          {moment(ngayChieuGioChieu).format('DD/MM/YYYY hh:mm A')}
        </NavLink>
      );
    }
  };
  const { width } = useWindowResize();

  return (
    <div className="container__theater__info">
      <h1 className="theater__info">THÔNG TIN CÁC RẠP CHIẾU</h1>
      {width > 1345 ? (
        <Tabs
          className="theater__info__calendar"
          tabPosition={tabPosition}
        >
          {theaterShowtime.map((item, index) => {
            return (
              <TabPane
                key={index}
                tab={
                  <img
                    style={{
                      width: '3rem',
                      height: '3rem',
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
                                style={{
                                  width: 120,
                                  height: 130,
                                  borderRadius: '10px',
                                }}
                                src={theater.hinhAnh}
                              ></img>
                            </div>

                            <div className="address text-left ml-3 d-flex flex-column justify-content-center">
                              {item.maHeThongRap === 'BHDStar' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',
                                    fontSize: '1.2rem',
                                    color: 'green',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'CGV' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'red',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'CineStar' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'purple',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'Galaxy' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'orange',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap ===
                                'LotteCinima' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'red',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'MegaGS' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: '#eeb730',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : (
                                ''
                              )}
                              <p
                                style={{
                                  fontWeight: 'bolder',

                                  fontSize: '1rem',
                                }}
                              >
                                {theater.diaChi}
                              </p>
                            </div>
                          </div>
                        }
                      >
                        {theater.danhSachPhim.map((film, index) => {
                          return (
                            <div key={index} className="d-flex mb-5">
                              <div className="image-2">
                                <img
                                  style={{
                                    width: 120,
                                    height: 130,
                                    borderRadius: '10px',
                                  }}
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

                                <p
                                  style={{ fontSize: '1.2rem' }}
                                  className="font-weight-bold"
                                >
                                  Ngày và giờ chiếu:
                                </p>
                                <div className="">
                                  {film.lstLichChieuTheoPhim
                                    .slice(0, 6)
                                    ?.map((date, index) => {
                                      return (
                                        <div key={index} className="">
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
        </Tabs>
      ) : (
        <Tabs className="theater__info__calendar__smaller" centered>
          {theaterShowtime.map((item, index) => {
            return (
              <TabPane
                tab={
                  <img
                    style={{
                      width: '3rem',
                      height: '3rem',
                    }}
                    src={item.logo}
                  ></img>
                }
                key={index}
              >
                <Collapse accordion>
                  {item.lstCumRap.map((theater, index) => {
                    return (
                      <Panel
                        header={
                          <div className="d-flex justify-content-center">
                            <div className="image-1">
                              <img
                                style={{
                                  width: 120,
                                  height: 130,
                                  borderRadius: ' 10px',
                                }}
                                src={theater.hinhAnh}
                              ></img>
                            </div>

                            <div className="address text-left ml-3 d-flex flex-column justify-content-center">
                              <p
                                style={{ fontSize: '1.2rem' }}
                                className="font-weight-bold"
                              ></p>

                              {item.maHeThongRap === 'BHDStar' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',
                                    fontSize: '1.2rem',
                                    color: 'green',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'CGV' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'red',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'CineStar' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'purple',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'Galaxy' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'orange',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap ===
                                'LotteCinima' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: 'red',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : item.maHeThongRap === 'MegaGS' ? (
                                <p
                                  style={{
                                    fontWeight: 'bolder',

                                    fontSize: '1.2rem',
                                    color: '#eeb730',
                                  }}
                                >
                                  {theater.tenCumRap}
                                </p>
                              ) : (
                                ''
                              )}
                              <p style={{ fontSize: '1.2rem' }}>
                                {theater.diaChi}
                              </p>
                            </div>
                          </div>
                        }
                        key={index}
                      >
                        {theater.danhSachPhim.map((film, index) => {
                          return (
                            <div key={index} className="d-flex mb-3">
                              <div className="film__image">
                                <img
                                  style={{
                                    width: 120,
                                    height: 130,
                                    borderRadius: ' 10px',
                                    marginRight: '2rem',
                                  }}
                                  src={film.hinhAnh}
                                  alt=""
                                />
                              </div>
                              <div className="date__and__time">
                                <p
                                  style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bolder',
                                  }}
                                >
                                  Phim: {film.tenPhim}
                                </p>
                                <p
                                  style={{
                                    fontSize: '1.2rem',
                                  }}
                                >
                                  Ngày chiếu, giờ chiếu (click ngày
                                  giờ bạn muốn để đặt vé):
                                </p>
                                <div className="">
                                  {film.lstLichChieuTheoPhim
                                    .slice(0, 6)
                                    .map((date, index) => {
                                      return (
                                        <div key={index} className="">
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
                                          </Tag>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Panel>
                    );
                  })}
                  {/* <Panel header="This is panel header 1" key="1">
                    <p>123</p>
                  </Panel> */}
                </Collapse>
              </TabPane>
            );
          })}
        </Tabs>
      )}
    </div>
  );
}

export default memo(TheaterInfo);
