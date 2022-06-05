import React, { memo, useEffect, useState } from 'react';
import { Tag, Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTheaterInfoAction,
  getTheaterShowtimeInfoAction,
} from '../../redux/thunk/actions';
import {
  getTheaterInfo,
  getTheaterShowtimeInfo,
} from '../../redux/selectors';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;

function TheaterInfo() {
  const [tabPosition, setTabPosition] = useState('left');

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

  return (
    <div className="container" style={{}}>
      <h1>THÔNG TIN CÁC RẠP CHIẾU</h1>
      <Tabs tabPosition={tabPosition}>
        {theaterShowtime.map((item, index) => {
          return (
            <TabPane
              key={index}
              tab={
                <img
                  style={{
                    width: 50,
                    height: 50,
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
                            <p className="font-weight-bold">
                              Tên rạp:
                            </p>

                            <p>{theater.tenCumRap}</p>
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
                              <p className="font-weight-bold">
                                Tên phim:
                              </p>
                              <p>{film.tenPhim}</p>
                              <div>
                                <p className="font-weight-bold">
                                  Địa chỉ:
                                </p>
                                <p>{theater.diaChi}</p>
                              </div>
                              <p className="font-weight-bold">
                                Giờ chiếu:
                              </p>
                              <div className="row">
                                {film.lstLichChieuTheoPhim.map(
                                  (date, index) => {
                                    return (
                                      <div className="col-2">
                                        <Tag
                                          className="time mb-2"
                                          color="green"
                                        >
                                          <NavLink
                                            className={''}
                                            key={index}
                                            to={'/'}
                                          >
                                            {moment(
                                              date.ngayChieuGioChieu
                                            ).format('hh:mm A')}
                                          </NavLink>
                                        </Tag>
                                      </div>
                                    );
                                  }
                                )}
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
