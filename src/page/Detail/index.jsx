import React, { useEffect } from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import { Tag } from 'antd';
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
import '../../assets/styles/circle.css';

const { TabPane } = Tabs;

export default function Detail() {
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
  console.log('CALENDAR', calendar);
  console.log(calendar.heThongRapChieu);

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
            backgroundPosition: 'center',
          }}
        >
          <CustomCard
            style={{ minHeight: '100vh' }}
            effectColor="#C780FF" // required
            color="black" // default color is white
            blur={20} // default blur value is 10px
            borderRadius={0} // default border radius value is 10px
          >
            <div className="film__detail row">
              <div className="film__image col-4">
                <img
                  style={{ width: '80%', height: '34rem' }}
                  src={`${hinhAnh}`}
                  alt=""
                />
              </div>
              <div className="film__info col-4">
                <h1>Tên phim: {tenPhim}</h1>

                <h1>Ngày công chiếu</h1>
                <h1>{moment(ngayKhoiChieu).format('DD.MM.YYYY')}</h1>
                <p>Mô tả: {moTa}</p>
              </div>
              <div className="circle">
                <h1>Đánh giá</h1>
                <div
                  className={`c100 p${
                    calendar.danhGia * 10
                  } big green`}
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
                {/* {calendar.heThongRapChieu.map((item, index) => {
                  return (
                    <TabPane
                      key={index}
                      tab={
                        <img
                          style={{
                            width: '3.125rem',
                            height: '3.125rem',
                          }}
                          src={item.logo}
                        ></img>
                      }
                    >
                      <Tabs
                        style={{ width: '1600px' }}
                        tabPosition="left"
                      >
                        {item.cumRapChieu.map((theater, index) => {
                          return (
                            <TabPane
                              key={index}
                              tab={
                                <div className="d-flex text-left">
                                  <div className="image">
                                    <img
                                      style={{
                                        width: '3.125rem',
                                        height: '3.125rem',
                                      }}
                                      src={theater.hinhAnh}
                                      alt=""
                                    />
                                  </div>
                                  <div className="name_address ml-3">
                                    <h1>{theater.tenCumRap}</h1>
                                    <h1>{theater.diaChi}</h1>
                                  </div>
                                </div>
                              }
                            >
                              <div className="row">
                                {theater.lichChieuPhim.map(
                                  (film, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="col-2 mb-3"
                                      >
                                        <Tag color="green">
                                          <p>
                                            Rạp chiếu: {film.tenRap}
                                          </p>
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
                })} */}
              </Tabs>
            </div>
          </CustomCard>
        </div>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </>
  );
}
