import React, { useEffect } from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import { Tag, Rate } from 'antd';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEachFilmCalendar,
  getFilmDetail,
} from '../../redux/selectors';
import moment from 'moment';
import { getShowtimeEachFilmAction } from '../../redux/thunk/actions';
import { Tab } from 'bootstrap';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/circle.css';
import { toast } from 'react-toastify';
import {
  getDateAndTime,
  getFilmCode,
} from '../../redux/reducers/getBoxOfficeReducer';
import $ from 'jquery';

const { TabPane } = Tabs;

export default function Detail() {
  //stop video modal
  $('#modalTrailer').on('hidden.bs.modal', function (e) {
    $('#modalTrailer iframe').attr(
      'src',
      $('#modalTrailer iframe').attr('src')
    );
  });
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
          {moment(ngayChieuGioChieu).format('DD.MM.YYYY hh:mm A')}
        </NavLink>
      );
    }
  };

  const { filmDetail } = useSelector(getFilmDetail);
  const dispatch = useDispatch();
  const {
    maPhim,
    danhGia,
    moTa,
    ngayKhoiChieu,
    tenPhim,
    trailer,
    hinhAnh,
  } = filmDetail;
  const { calendar } = useSelector(getEachFilmCalendar);

  useEffect(() => {
    const action = getShowtimeEachFilmAction(maPhim);
    dispatch(action);
  }, []);
  return (
    <>
      <section className="header">
        <Header />
      </section>

      <section className="film">
        <div
          style={{
            backgroundImage: `url(${hinhAnh})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
          }}
        >
          <CustomCard
            style={{ minHeight: '100vh' }}
            effectColor="orange" // required
            color="black" // default color is white
            blur={25} // default blur value is 10px
            borderRadius={0} // default border radius value is 10px
          >
            <div className="film__detail row">
              <div className="film__image col-4">
                <div className="film__poster">
                  <img
                    style={{
                      width: '120%',
                      height: '34rem',
                      borderRadius: '10px',
                    }}
                    src={`${hinhAnh}`}
                    alt=""
                  />
                </div>
                <div className="film__trailer">
                  <a
                    data-toggle="modal"
                    data-target="#modalTrailer"
                    className="play-btn"
                    href=""
                  ></a>
                </div>
              </div>
              <div className="film__info col-4">
                <h1 className="font-weight-bold">
                  Tên phim: {tenPhim}
                </h1>

                <h1 className="font-weight-bold">Ngày công chiếu</h1>
                <h1 className="font-weight-bold">
                  {moment(ngayKhoiChieu).format('DD.MM.YYYY')}
                </h1>
                <p>Mô tả: {moTa}</p>
              </div>
              <div className="circle">
                <h1 className="text-warning font-weight-bold">
                  Đánh giá
                </h1>
                <div className="rating">
                  <Rate
                    className="d-flex justify-content-center"
                    style={{
                      color: 'green',
                      width: '100%',
                      fontSize: '3rem',
                    }}
                    allowHalf
                    value={calendar.danhGia / 2}
                  />
                  ;
                </div>
                <div
                  className={`c100 p${
                    calendar.danhGia * 10
                  } big green point`}
                >
                  <span>{calendar.danhGia}0%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
              </div>
            </div>
            <div className="tabs">
              <Tabs
                defaultActiveKey="1"
                centered
                style={{
                  width: '125rem',
                  backgroundColor: 'white',
                  borderRadius: '2rem',
                }}
              >
                {/* CALENDAR */}
                <TabPane
                  style={{
                    fontSize: '2rem',
                  }}
                  tab={
                    <h1 style={{ fontSize: '1.5rem' }}>Lịch chiếu</h1>
                  }
                  key="1"
                >
                  <Tabs tabPosition={'left'}>
                    {calendar.heThongRapChieu?.map((item, index) => {
                      return (
                        <TabPane
                          tab={
                            <div className="">
                              <img
                                style={{
                                  width: '4.125rem',
                                  height: '4.125rem',
                                }}
                                src={item.logo}
                              ></img>
                            </div>
                          }
                          key={index}
                        >
                          {item.cumRapChieu?.map((theater, index) => {
                            return (
                              <div
                                key={index}
                                className="d-flex mb-5"
                              >
                                <img
                                  src={theater.hinhAnh}
                                  style={{
                                    width: '6.5rem',
                                    height: '7.5rem',
                                  }}
                                  alt=""
                                />
                                <div className="name_address ml-3">
                                  <p
                                    style={{
                                      fontSize: '1.2rem',
                                      fontWeight: 'bold',
                                    }}
                                  >
                                    {theater.tenCumRap}
                                  </p>
                                  <p style={{ fontSize: '1.2rem' }}>
                                    Địa chỉ:{' '}
                                    <span>{theater.diaChi}</span>
                                  </p>
                                  <p style={{ fontSize: '1.2rem' }}>
                                    Ngày - giờ chiếu: (click vào ngày
                                    giờ bạn muốn để đặt vé)
                                  </p>
                                  <div className="row">
                                    {theater.lichChieuPhim
                                      .slice(0, 12)
                                      ?.map((film, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="col-2 mb-3"
                                          >
                                            <Tag
                                              style={{
                                                marginRight: '10rem',
                                                marginBottom:
                                                  '1.5rem',
                                              }}
                                              color="green"
                                            >
                                              {renderCalendar(
                                                film.maLichChieu,
                                                film.ngayChieuGioChieu
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
              </Tabs>
              {/* <Tabs
                style={{ width: '96.875rem' }}
                tabPosition={'left'}
              >
                {calendar.heThongRapChieu?.map((item, index) => {
                  return (
                    <TabPane
                      tab={
                        <img
                          style={{
                            width: '3.125rem',
                            height: '3.125rem',
                          }}
                          src={item.logo}
                        ></img>
                      }
                      key={index}
                    >
                      <Tabs tabPosition="left">
                        {item.cumRapChieu?.map((theater, index) => {
                          return (
                            <TabPane
                              tab={
                                <div className="d-flex text-left">
                                  <div className="image">
                                    <img
                                      style={{
                                        width: '3.125rem',
                                        height: '3.125rem',
                                      }}
                                      src={theater.hinhAnh}
                                    ></img>
                                  </div>
                                  <div className="name_address ml-3">
                                    <p>{theater.tenCumRap}</p>
                                    <p>{theater.diaChi}</p>
                                  </div>
                                </div>
                              }
                              key={index}
                            >
                              <div className="row">
                                {theater.lichChieuPhim?.map(
                                  (film, index) => {
                                    return (
                                      <div
                                        className="col-2 mb-3"
                                        key={index}
                                      >
                                        <Tag color="green">
                                          <p>Rạp: {film.tenRap}</p>
                                          <p>
                                            Thời lượng:{' '}
                                            {film.thoiLuong} phút
                                          </p>
                                          <p>
                                            Giá vé:{' '}
                                            {film.giaVe.toLocaleString()}{' '}
                                            đồng
                                          </p>
                                        </Tag>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </TabPane>
                          );
                        })}
                      </Tabs>
                    </TabPane>
                  );
                })}
              </Tabs> */}
            </div>
          </CustomCard>
        </div>
        {/* MODAL TRAILER */}
        <div
          className="modal fade"
          id="modalTrailer"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          role="dialog"
        >
          <div
            role="document"
            className="modal-dialog modal-dialog-centered"
          >
            <div className="modal-content">
              <div className="modal-body">
                <iframe
                  id="trailer_1"
                  width={720}
                  height={600}
                  src={trailer}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  data-dismiss="modal"
                >
                  <span
                    // onClick={() => {
                    //   handleStopVideo1();
                    // }}
                    className="text-white"
                    aria-hidden="true"
                  >
                    X
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </>
  );
}
