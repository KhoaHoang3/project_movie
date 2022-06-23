import React, { useEffect } from 'react';
import { Space, Button, Form, Input, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/selectors';
import { GROUPID, http } from '../../axios';
import { useState } from 'react';
import { getKindOfUserURL } from '../../axios/apiURL';
import { updateUserAction } from '../../redux/thunk/actions';
import { toast } from 'react-toastify';

export default function FormEditUser({ visible, closeModal }) {
  const [form] = Form.useForm();
  const { userInfo } = useSelector(getUserList);
  const { email, hoTen, maLoaiNguoiDung, matKhau, soDT, taiKhoan } =
    userInfo;
  const [kindOfUser, setKindOfUser] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getApiKindOfUser() {
      try {
        const result = await http.get(getKindOfUserURL);
        setKindOfUser(result.data.content);
      } catch (error) {
        toast.error(error.response.data.content, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    }
    getApiKindOfUser();
  }, []);
  const onFinish = (values) => {
    const action = updateUserAction(values);
    dispatch(action);
  };

  return (
    <div>
      <Modal
        width={700}
        footer={null}
        title={
          <h1 style={{ fontSize: '1.2rem' }}>
            Cập nhật thông tin người dùng
          </h1>
        }
        visible={visible}
        onOk={() => closeModal(false)}
        onCancel={() => closeModal(false)}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          size="large"
          form={form}
          style={{ fontSize: '1.2rem' }}
          initialValues={{
            maNhom: GROUPID,
            email: email,
            hoTen: hoTen,
            maLoaiNguoiDung: maLoaiNguoiDung,
            matKhau: matKhau,
            soDT: soDT,
            taiKhoan: taiKhoan,
          }}
        >
          {/* NAME */}
          <Form.Item
            name={'hoTen'}
            label={<h1 style={{ fontSize: '1.2rem' }}>Họ tên</h1>}
          >
            <Input name="hoTen"></Input>
          </Form.Item>
          {/* GROUP */}
          <Form.Item
            name={'maNhom'}
            label={<h1 style={{ fontSize: '1.2rem' }}>Mã nhóm</h1>}
          >
            <Input name="maNhom" disabled></Input>
          </Form.Item>
          {/* USER ACCOUNT */}
          <Form.Item
            name={'taiKhoan'}
            label={<h1 style={{ fontSize: '1.2rem' }}>Tài khoản</h1>}
          >
            <Input name="taiKhoan" disabled></Input>
          </Form.Item>
          {/* PASSWORD */}
          <Form.Item
            name={'matKhau'}
            label={<h1 style={{ fontSize: '1.2rem' }}>Mật khẩu</h1>}
          >
            <Input.Password name="matKhau"></Input.Password>
          </Form.Item>
          {/* EMAIL */}
          <Form.Item
            name={'email'}
            label={<h1 style={{ fontSize: '1.2rem' }}>Email</h1>}
          >
            <Input name="email"></Input>
          </Form.Item>
          {/* PHONE NUMBER */}
          <Form.Item
            name={'soDT'}
            label={
              <h1 style={{ fontSize: '1.2rem' }}>Số điện thoại</h1>
            }
          >
            <Input name="soDT"></Input>
          </Form.Item>
          {/* KIND OF USER */}
          <Form.Item
            name={'maLoaiNguoiDung'}
            label={
              <h1 style={{ fontSize: '1.2rem' }}>Loại người dùng</h1>
            }
          >
            <Select
              options={kindOfUser?.map((item) => {
                return {
                  label: item.tenLoai,
                  value: item.maLoaiNguoiDung,
                };
              })}
              name="maLoaiNguoiDung"
              size="large"
            ></Select>
          </Form.Item>
          {/* BUTTON SUBMIT */}
          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                width: '100%',
                padding: '2rem 0',
                fontSize: '1.2rem',
                borderRadius: '10px',
                marginTop: '2rem',
              }}
              type="primary"
            >
              <h1
                style={{
                  color: 'white',
                  marginBottom: '0',
                  lineHeight: '5px',
                }}
              >
                Cập nhật
              </h1>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
