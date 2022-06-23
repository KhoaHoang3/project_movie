import React, { useEffect } from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import { Form, Tabs, Button, Input, Select } from 'antd';
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

const { TabPane } = Tabs;

export default function EditInformation() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(getUserInfoEditPage);
  let user = {};
  if (localStorage.getItem('USER_LOGIN')) {
    user = JSON.parse(localStorage.getItem('USER_LOGIN'));
  }
  // const { taiKhoan, email, soDT, hoTen, maLoaiNguoiDung, maNhom } =
  //   user;
  const { taiKhoan, email, soDT, hoTen, maLoaiNguoiDung, maNhom } =
    user;
  const { matKhau } = userInfo;
  const onFinish = (values) => {
    const action = updateUserActionV2(values);
    dispatch(action);
  };
  useEffect(() => {
    console.log('renderinggg');
    const action = getUserInfoAction();
    dispatch(action);
  }, []);

  return (
    <div>
      <section className="header">
        <Header />
      </section>

      <section className="edit__info container">
        <h1>Cài đặt tài khoản</h1>
        <hr />
        <Tabs tabPosition={'left'}>
          {/* EDIT INFORMATION */}
          <TabPane
            style={{ marginRight: '1.2rem', width: '900px' }}
            tab={
              <h2 style={{ fontSize: '1.2rem' }}>
                Thông tin tài khoản
              </h2>
            }
            key="1"
          >
            <Form
              layout="vertical"
              size="large"
              style={{ fontSize: '1.2rem' }}
              onFinish={onFinish}
              form={form}
              initialValues={{
                hoTen: hoTen,
                taiKhoan: taiKhoan,
                email: email,
                maNhom: maNhom,
                soDT: soDT,
                maLoaiNguoiDung: maLoaiNguoiDung,
              }}
            >
              {/* NAME */}
              <Form.Item
                label={<h2 style={{ fontSize: '1.2rem' }}>Họ tên</h2>}
                name={'hoTen'}
              >
                <Input name="hoTen"></Input>
              </Form.Item>
              {/* ACCOUNT */}
              <Form.Item
                label={
                  <h2 style={{ fontSize: '1.2rem' }}>Tài khoản</h2>
                }
                name={'taiKhoan'}
              >
                <Input
                  disabled
                  style={{ fontWeight: 'bolder' }}
                  name="taiKhoan"
                ></Input>
              </Form.Item>
              {/* GROUP ID */}
              <Form.Item
                label={
                  <h2 style={{ fontSize: '1.2rem' }}>Mã nhóm</h2>
                }
                name={'maNhom'}
              >
                <Input
                  disabled
                  style={{ fontWeight: 'bolder' }}
                  name="maNhom"
                ></Input>
              </Form.Item>
              {/* PASSWORD */}
              <Form.Item
                help="Nhập mật khẩu mới nếu bạn muốn đổi mật khẩu"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu',
                  },
                ]}
                label={
                  <h2 style={{ fontSize: '1.2rem' }}>
                    Nhập lại mật khẩu cũ
                  </h2>
                }
                name={'matKhau'}
              >
                <Input.Password name="matKhau"></Input.Password>
              </Form.Item>
              {/* EMAIL */}
              <Form.Item
                label={<h2 style={{ fontSize: '1.2rem' }}>Email</h2>}
                name={'email'}
              >
                <Input name="email"></Input>
              </Form.Item>
              {/* PHONE NUMBER */}
              <Form.Item
                label={
                  <h2 style={{ fontSize: '1.2rem' }}>
                    Số điện thoại
                  </h2>
                }
                name={'soDT'}
              >
                <Input name="soDT"></Input>
              </Form.Item>
              {/* KIND OF USER */}
              <Form.Item
                label={
                  <h2 style={{ fontSize: '1.2rem' }}>
                    Loại người dùng
                  </h2>
                }
                name={'maLoaiNguoiDung'}
              >
                <Select
                  disabled
                  options={[
                    { label: 'Khách hàng', value: 'KhachHang' },
                    { label: 'Quản Trị', value: 'QuanTri' },
                  ]}
                  name="maLoaiNguoiDung"
                ></Select>
              </Form.Item>
              {/* BUTTON SUBMIT */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  style={{
                    width: '50%',
                    padding: '2rem 0',
                    fontSize: '1.2rem',
                    borderRadius: '10px',
                    marginTop: '2rem',
                    transform: 'translateX(50%)',
                  }}
                  type="primary"
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
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* BOOKING HISTORY */}
          <TabPane
            tab={
              <h2 style={{ fontSize: '1.2rem' }}>Lịch sử đặt vé</h2>
            }
            key="2"
          ></TabPane>
        </Tabs>
      </section>

      <section className="footer">
        <Footer />
      </section>
    </div>
  );
}
