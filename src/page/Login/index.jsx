import React from 'react';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../redux/selectors';
import { userLoginAction } from '../../redux/thunk/actions';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const schemaValidation = yup.object().shape({
    taiKhoan: yup.string().required('Vui lòng nhập tài khoản'),
    matKhau: yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const { register, handleSubmit, formState } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaValidation),
  });
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { taiKhoan, matKhau } = data;
    const actionLogin = userLoginAction(
      { taiKhoan, matKhau },
      navigate
    );
    dispatch(actionLogin);
  };

  const userAccount = useSelector(user);
  const { taiKhoan } = userAccount;
  return (
    <div className="login">
      <CustomCard
        effectColor="white" // required
        color="#14AEFF" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
        style={{ width: '100%', height: '100%' }}
      >
        <div className="background__form">
          <h1 className="login__name">ĐĂNG NHẬP</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login__fields"
            action=""
          >
            {/* USERNAME */}
            <div className="text-field">
              <label htmlFor="taiKhoan">Tài khoản</label>
              <input
                autoComplete="off"
                type="text"
                id="taiKhoan"
                placeholder="Vui lòng nhập tài khoản"
                defaultValue={taiKhoan}
                {...register('taiKhoan')}
              />
              {errors.taiKhoan && (
                <p className="text-danger">
                  {errors.taiKhoan.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="text-field password_input">
              <label htmlFor="matKhau">Mật khẩu</label>
              <input
                autoComplete="off"
                type={'password'}
                id="matKhau"
                placeholder="Vui lòng nhập mật khẩu"
                {...register('matKhau')}
              />

              {errors.matKhau && (
                <p className="text-danger">
                  {errors.matKhau.message}
                </p>
              )}
              {/* <span onClick={handleShowPassword} className="eye_icon">
              {iconEye}
            </span> */}
            </div>

            <button type="submit" className="login__button">
              Đăng nhập
            </button>

            <h1 className="register__navigate">
              Bạn chưa có tài khoản?{' '}
              <NavLink to={'/register'}>
                Bấm vào đây để đăng ký
              </NavLink>
            </h1>
          </form>
        </div>
      </CustomCard>
    </div>
  );
}
