import React, { memo, useCallback, useState } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { http, ACCESSTOKEN } from '../../axios';
import { Icon } from '@mui/material';
import { userRegisterURL } from '../../axios/apiURL';
import { toast } from 'react-toastify';
import { userRegisterAction } from '../../redux/thunk/actions';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
  const schemaValidation = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email !')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email không đúng định dạng !'
      ),
    taiKhoan: yup
      .string()
      .required('Vui lòng nhập tài khoản')
      .matches(
        /^.*(?=.{8,})(?=.*\d)/,
        'Tài khoản phải có ít nhất 8 kí tự và 1 chữ số !'
      ),
    matKhau: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự in hoa, 1 chữ số và 1 kí tự đặc biệt'
      ),
    xacMinhMatKhau: yup
      .string()
      .required('Vui lòng xác minh lại mật khẩu !')
      .oneOf([yup.ref('matKhau'), null], 'Mật khẩu không khớp !'),
    hoTen: yup.string().required('Vui lòng nhập họ tên !'),
    soDT: yup.string().required('Vui lòng nhập số điện thoại !'),
  });
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = formState;

  const onSubmit = (data) => {
    const { taiKhoan, matKhau, email, hoTen } = data;
    const actionRegister = userRegisterAction(
      {
        taiKhoan,
        matKhau,
        email,
        hoTen,
      },
      navigate
    );
    dispatch(actionRegister);
  };

  const [type, setType] = useState('password');
  const [iconEye, setIconEye] = useState(
    <EyeInvisibleOutlined style={{ paddingTop: '0' }} />
  );

  const [typeConfirm, setTypeConfirm] = useState('password');
  const [iconEyeConfirm, setIconEyeConfirm] = useState(
    <EyeInvisibleOutlined style={{ paddingTop: '0' }} />
  );

  const handleShowPassword = useCallback(() => {
    if (type === 'password') {
      setIconEye(<EyeOutlined style={{ paddingTop: '0' }} />);
      setType('text');
    } else {
      setType('password');
      setIconEye(
        <EyeInvisibleOutlined style={{ paddingTop: '0' }} />
      );
    }
  }, [type]);

  const handleShowPasswordConfirm = useCallback(() => {
    if (typeConfirm === 'password') {
      setIconEyeConfirm(<EyeOutlined />);
      setTypeConfirm('text');
    } else {
      setTypeConfirm('password');
      setIconEyeConfirm(<EyeInvisibleOutlined />);
    }
  }, [typeConfirm]);

  return (
    <div className="register">
      <CustomCard
        effectColor="white" // required
        color="#14AEFF" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
        style={{ width: '100%', height: '100%' }}
      >
        <div className="background__form">
          <h1 className="register__name">ĐĂNG KÝ</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="register__fields"
            action=""
          >
            {/* NAME */}
            <div className="text-field">
              <label htmlFor="hoTen">Họ tên</label>
              <input
                autoComplete="off"
                type="text"
                id="hoTen"
                placeholder="Vui lòng nhập họ tên "
                {...register('hoTen')}
              />
              {errors.hoTen && (
                <p className="text-danger">{errors.hoTen.message}</p>
              )}
            </div>

            {/* USERNAME */}
            <div className="text-field">
              <label htmlFor="taiKhoan">Tài khoản</label>
              <input
                autoComplete="off"
                type="text"
                id="taiKhoan"
                placeholder="Vui lòng nhập tài khoản"
                {...register('taiKhoan')}
              />
              {errors.taiKhoan && (
                <p className="text-danger">
                  {errors.taiKhoan.message}
                </p>
              )}
            </div>
            {/* EMAIL */}
            <div className="text-field">
              <label htmlFor="email">Email</label>
              <input
                autoComplete="off"
                type="email"
                id="email"
                placeholder="Vui lòng nhập email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>

            {/* PHONE NUMBER */}
            <div className="text-field">
              <label htmlFor="soDT">Số điện thoại</label>
              <input
                autoComplete="off"
                type="number"
                id="soDT"
                placeholder="Vui lòng nhập số điện thoại"
                {...register('soDT')}
              />
              {errors.soDT && (
                <p className="text-danger">{errors.soDT.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="text-field password_input">
              <label htmlFor="matKhau">Mật khẩu</label>
              <input
                autoComplete="off"
                type={type}
                id="matKhau"
                placeholder="Vui lòng nhập mật khẩu"
                {...register('matKhau')}
              />

              {errors.matKhau && (
                <p className="text-danger">
                  {errors.matKhau.message}
                </p>
              )}
              <span onClick={handleShowPassword} className="eye_icon">
                {iconEye}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="text-field confirm_password_input">
              <label htmlFor="password">Xác minh mật khẩu</label>
              <input
                autoComplete="off"
                type={typeConfirm}
                id="xacMinhMatKhau"
                placeholder="Vui lòng nhập lại mật khẩu"
                {...register('xacMinhMatKhau')}
              />
              {errors.xacMinhMatKhau && (
                <p className="text-danger">
                  {errors.xacMinhMatKhau.message}
                </p>
              )}
              <span
                onClick={handleShowPasswordConfirm}
                className="eye_icon"
              >
                {iconEyeConfirm}
              </span>
            </div>

            <button type="submit" className="submit__button">
              Đăng ký
            </button>
          </form>
        </div>
      </CustomCard>
    </div>
  );
}

export default memo(Register);
