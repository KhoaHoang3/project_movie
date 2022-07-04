import React, { useEffect } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import {
  List,
  Space,
  Avatar,
  Form,
  Tabs,
  Button,
  Input,
  Select,
} from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {
  getUserInfoAction,
  updateUserActionV2,
} from '../../redux/thunk/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoEditPage } from '../../redux/selectors';
import BookingTicketResult from '../BookingTicketResult';
import {
  displayLoading,
  hideLoading,
} from '../../redux/reducers/loadingReducer';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { memo } from 'react';

const { TabPane } = Tabs;

function EditInformation() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(getUserInfoEditPage);
  const {
    matKhau,
    taiKhoan,
    email,
    soDT,
    hoTen,
    maLoaiNguoiDung,
    maNhom,
  } = userInfo;
  const { thongTinDatVe } = userInfo;
  console.log(userInfo);

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

  // const [values, setValues] = useState({
  //   taiKhoan: taiKhoan,
  //   email: email,
  //   matKhau: matKhau,
  //   soDT: soDT,
  // });

  // const onSubmit = (values) => {
  //   const action = updateUserActionV2(values);
  //   dispatch(action);
  // };
  const [values, setValues] = useState({
    hoTen: hoTen,
    taiKhoan: taiKhoan,
    email: email,
    maLoaiNguoiDung: maLoaiNguoiDung,
    maNhom: maNhom,
    matKhau: matKhau,
    soDT: soDT,
  });

  const handleChangeInput = (e) => {
    let { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = updateUserActionV2(values);
    dispatch(action);
  };

  const [type, setType] = useState('password');
  const [eye, setEye] = useState(<EyeInvisibleOutlined />);

  const handleChangeType = () => {
    if (type === 'password') {
      setType('text');
      setEye(<EyeOutlined />);
    } else {
      setType('password');
      setEye(<EyeInvisibleOutlined />);
    }
  };

  return (
    <div>
      <section className="header">
        <Header />
      </section>

      <section className="edit__info container">
        <h1>Cài đặt tài khoản</h1>
        <hr />
        <Tabs className="edit__info__tabs" tabPosition={'left'}>
          {/* EDIT INFORMATION */}
          <TabPane
            className="infomation__tab"
            defaultActiveKey="0"
            tab={
              <h2 style={{ fontSize: '1.2rem' }}>
                Thông tin tài khoản
              </h2>
            }
            key="0"
          >
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="text-field">
                <label htmlFor="hoTen">Họ tên</label>
                <input
                  value={values.hoTen}
                  defaultValue={hoTen}
                  autoComplete="off"
                  type="text"
                  id="hoTen"
                  onChange={handleChangeInput}
                  // {...register('hoTen')}
                />
                {/* {errors.hoTen && (
                  <p className="text-danger">
                    {errors.hoTen.message}
                  </p>
                )} */}
              </div>
              {/* ACCOUNT */}
              <div className="text-field">
                <label htmlFor="taiKhoan">Tài khoản</label>
                <input
                  style={{
                    backgroundColor: 'rgba(238,238,238,1)',
                    cursor: 'no-drop',
                  }}
                  readOnly={true}
                  value={values.taiKhoan}
                  defaultValue={taiKhoan}
                  autoComplete="off"
                  type="text"
                  id="taiKhoan"
                  onChange={handleChangeInput}

                  // {...register('taiKhoan')}
                />
              </div>
              {/* GROUPID */}
              {/* <div className="text-field">
                <label htmlFor="maNhom">Mã nhóm</label>
                <input
                  style={{
                    backgroundColor: 'rgba(238,238,238,1)',
                    cursor: 'no-drop',
                  }}
                  readOnly={true}
                  value={values.maNhom}
                  defaultValue={maNhom}
                  autoComplete="off"
                  type="text"
                  id="maNhom"
                  onChange={handleChangeInput}

                  // {...register('maNhom')}
                />
              </div> */}
              {/* PASSWORD */}
              <div
                style={{ position: 'relative' }}
                className="text-field"
              >
                <label htmlFor="matKhau">Mật khẩu</label>
                <input
                  value={values.matKhau}
                  defaultValue={matKhau}
                  autoComplete="off"
                  type={type}
                  id="matKhau"
                  onChange={handleChangeInput}

                  // {...register('matKhau')}
                />
                <span
                  onClick={() => {
                    handleChangeType();
                  }}
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '22px',
                    top: '18px',
                  }}
                >
                  {eye}
                </span>

                {/* {errors.matKhau && (
                  <p className="text-danger">
                    Mật khẩu không được bỏ trống
                  </p>
                )} */}
              </div>
              {/* email */}
              <div className="text-field">
                <label htmlFor="email">Email</label>
                <input
                  value={values.email}
                  defaultValue={email}
                  autoComplete="off"
                  type="text"
                  id="email"
                  onChange={handleChangeInput}

                  // {...register('email')}
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="text-field">
                <label htmlFor="soDT">Số điện thoại</label>
                <input
                  value={values.soDT}
                  defaultValue={soDT}
                  autoComplete="off"
                  type="text"
                  id="soDT"
                  onChange={handleChangeInput}

                  // {...register('soDT')}
                />
              </div>

              {/* KIND OF USER */}
              {/* <div className="text-field">
                <label htmlFor="maLoaiNguoiDung">Mã người dùng</label>
                <input
                  style={{
                    backgroundColor: 'rgba(238,238,238,1)',
                    cursor: 'no-drop',
                  }}
                  readOnly={true}
                  defaultValue={maLoaiNguoiDung}
                  autoComplete="off"
                  type="text"
                  id="maLoaiNguoiDung"
                />
              </div> */}

              <button
                type="submit"
                style={{
                  width: '50%',
                  padding: '2rem 0',
                  fontSize: '1.2rem',
                  borderRadius: '10px',
                  marginTop: '2rem',
                  transform: 'translateX(50%)',
                  backgroundColor: '#00c6ff',
                  borderColor: '#00c6ff',
                }}
              >
                <h2
                  style={{
                    color: 'white',
                    marginBottom: '0',
                    lineHeight: '5px',
                  }}
                >
                  Cập nhật
                </h2>
              </button>
            </form>
          </TabPane>

          {/* BOOKING HISTORY */}
          <TabPane
            tab={
              <h2 style={{ fontSize: '1.2rem' }}>Lịch sử đặt vé</h2>
            }
            key="1"
          >
            <List
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
          </TabPane>
        </Tabs>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </div>
  );
}

export default memo(EditInformation);
