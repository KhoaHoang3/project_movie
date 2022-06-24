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

const { TabPane } = Tabs;

export default function EditInformation() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getUserInfoAction();
    dispatch(action);
  }, []);

  const { userInfo } = useSelector(getUserInfoEditPage);

  // const { taiKhoan, email, soDT, hoTen, maLoaiNguoiDung, maNhom } =
  //   user;
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
  // const data = Array.from({
  //   length: 23,
  // }).map((_, i) => ({
  //   href: 'https://ant.design',
  //   title: `ant design part ${i}`,
  //   avatar: 'https://joeschmoe.io/api/v1/random',
  //   description:
  //     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  //   content:
  //     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  // }));

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

  const onFinish = (values) => {
    const action = updateUserActionV2(values);
    dispatch(action);
  };

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
                matKhau: matKhau,
                email: email,
                maNhom: maNhom,
                soDT: soDT,
                maLoaiNguoiDung: maLoaiNguoiDung,
              }}
            >
              {/* NAME */}
              <Form.Item
                name={'hoTen'}
                label={<h2 style={{ fontSize: '1.2rem' }}>Họ tên</h2>}
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
                  <h2 style={{ fontSize: '1.2rem' }}>Mật khẩu</h2>
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
