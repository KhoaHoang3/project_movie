import React, { memo, useState } from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Icon } from '@mui/material';

function Register() {
  const schemaValidation = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email !')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Email không đúng định dạng !'
      ),
    username: yup
      .string()
      .required('Vui lòng nhập tài khoản')
      .matches(
        /^.*(?=.{8,})(?=.*\d)/,
        'Tài khoản phải có ít nhất 8 kí tự và 1 chữ số !'
      ),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Mật khẩu phải có ít nhất 8 kí tự, 1 kí tự in hoa, 1 chữ số và 1 kí tự đặc biệt'
      ),
    confirmPassword: yup
      .string()
      .required('Vui lòng xác minh lại mật khẩu')
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp !'),
  });
  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  const [type, setType] = useState('password');
  const [iconEye, setIconEye] = useState(<EyeInvisibleOutlined />);

  const [typeConfirm, setTypeConfirm] = useState('password');
  const [iconEyeConfirm, setIconEyeConfirm] = useState(
    <EyeInvisibleOutlined />
  );

  const handleShowPassword = () => {
    if (type === 'password') {
      setIconEye(<EyeOutlined />);
      setType('text');
    } else {
      setType('password');
      setIconEye(<EyeInvisibleOutlined />);
    }
  };

  const handleShowPasswordConfirm = () => {
    if (typeConfirm === 'password') {
      setIconEyeConfirm(<EyeOutlined />);
      setTypeConfirm('text');
    } else {
      setTypeConfirm('password');
      setIconEyeConfirm(<EyeInvisibleOutlined />);
    }
  };

  return (
    <div className="register">
      <CustomCard
        effectColor="white" // required
        color="#14AEFF" // default color is white
        blur={25} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
        style={{ width: '100%', height: '100%' }}
      >
        <div className="background__form">
          <h1>ĐĂNG KÝ</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="register__fields"
            action=""
          >
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
                <p className="text-danger mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* USERNAME */}
            <div className="text-field">
              <label htmlFor="username">Tài khoản</label>
              <input
                autoComplete="off"
                type="text"
                id="username"
                placeholder="Vui lòng nhập tài khoản"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-danger mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="text-field password_input">
              <label htmlFor="password">Mật khẩu</label>
              <input
                autoComplete="off"
                type={type}
                id="password"
                placeholder="Vui lòng nhập mật khẩu"
                {...register('password')}
              />

              {errors.password && (
                <p className="text-danger mt-2">
                  {errors.password.message}
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
                id="confirm_password"
                placeholder="Vui lòng nhập lại mật khẩu"
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-danger mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
              <span
                onClick={handleShowPasswordConfirm}
                className="eye_icon"
              >
                {iconEyeConfirm}
              </span>
            </div>

            <button type="submit" className="button">
              Gửi
            </button>
          </form>
        </div>
      </CustomCard>
    </div>
  );
}

export default memo(Register);
