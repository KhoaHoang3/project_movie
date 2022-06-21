import { Form, Input, Select, Button } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GROUPID, http } from '../../axios';
import { getKindOfUserURL } from '../../axios/apiURL';
import { addUserAction } from '../../redux/thunk/actions';

export default function AddUser() {
  const [form] = Form.useForm();
  const [kindOfUser, setKindOfUser] = useState([]);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const action = addUserAction(values);
    dispatch(action);
  };
  useEffect(() => {
    async function callApiKindOfUser() {
      try {
        const result = await http.get(getKindOfUserURL);
        setKindOfUser(result.data.content);
      } catch (error) {
        console.log(error);
      }
    }
    callApiKindOfUser();
  }, []);
  return (
    <div>
      <Form
        style={{ fontSiez: '1.2rem' }}
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        size="large"
        initialValues={{
          maNhom: GROUPID,
        }}
      >
        {/* NAME */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên người dùng',
            },
          ]}
          name={'hoTen'}
          label={
            <h1 style={{ fontSize: '1rem', marginRight: '1rem' }}>
              Họ tên
            </h1>
          }
        >
          <Input name="hoTen"></Input>
        </Form.Item>
        {/* GROUP */}
        <Form.Item
          name={'maNhom'}
          label={
            <h1
              style={{
                fontSize: '1rem',
                marginRight: '1rem',
              }}
            >
              Mã nhóm
            </h1>
          }
        >
          <Input
            style={{ fontWeight: 'bolder' }}
            name="maNhom"
            disabled
          ></Input>
        </Form.Item>
        {/* USER ACCOUNT */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập tài khoản',
            },
          ]}
          name={'taiKhoan'}
          label={
            <h1 style={{ fontSize: '1rem', marginRight: '1rem' }}>
              Tài khoản
            </h1>
          }
        >
          <Input name="taiKhoan"></Input>
        </Form.Item>
        {/* PASSWORD */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập mật khẩu',
            },
            {
              pattern: /(?=.{8,})(?=.*\d)/,
              message: 'Mật khẩu phải có ít nhât 8 ký tự và 1 chữ số',
            },
          ]}
          name={'matKhau'}
          label={
            <h1 style={{ fontSize: '1rem', marginRight: '1rem' }}>
              Mật khẩu
            </h1>
          }
        >
          <Input.Password name="matKhau"></Input.Password>
        </Form.Item>
        {/* EMAIL */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập email',
            },
            {
              type: 'email',
              message: 'Email không đúng định dạng',
            },
          ]}
          name={'email'}
          label={
            <h1 style={{ fontSize: '1rem', marginRight: '1rem' }}>
              Email
            </h1>
          }
        >
          <Input name="email"></Input>
        </Form.Item>
        {/* PHONE NUMBER */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập số điện thoại',
            },
          ]}
          name={'soDT'}
          label={
            <h1 style={{ fontSize: '1rem', marginRight: '1rem' }}>
              Số điện thoại
            </h1>
          }
        >
          <Input name="soDT"></Input>
        </Form.Item>
        <Form.Item
          name={'maLoaiNguoiDung'}
          label={
            <h1 style={{ fontSize: '1rem', marginRight: '1rem' }}>
              Loại người dùng
            </h1>
          }
          rules={[
            {
              required: true,
              message: 'Hãy chọn loại người dùng',
            },
          ]}
        >
          <Select
            options={kindOfUser?.map((item) => {
              return {
                label: item.tenLoai,
                value: item.maLoaiNguoiDung,
              };
            })}
          ></Select>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              transform: 'translateX(286px)',
              width: '20%',
              padding: '2rem 0',
              fontSize: '1.2rem',
              borderRadius: '10px',
              marginTop: '0rem',
            }}
            type="primary"
          >
            <h1
              style={{
                color: 'white',
                marginBottom: '0',
                lineHeight: '1px',
              }}
            >
              Thêm người dùng
            </h1>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
