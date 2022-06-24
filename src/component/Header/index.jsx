import React, { useEffect, useState } from 'react';
import {
  Button,
  Radio,
  Modal,
  Menu,
  Dropdown,
  Space,
  Avatar,
} from 'antd';
import {
  VideoCameraOutlined,
  ExclamationCircleOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { user } from '../../redux/selectors';
import { Select } from 'antd';
import { getUserInfoAction } from '../../redux/thunk/actions';
import { ACCESSTOKEN } from '../../axios';
const { Option } = Select;
const { confirm } = Modal;

export default function Header() {
  const dispatch = useDispatch();
  const adminMenu = (
    <Menu
      items={[
        {
          label: (
            <h1
              onClick={() => {
                navigate('/edit_information');
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className="update__info"
            >
              Cập nhật tài khoản/ lịch sử đặt vé
            </h1>
          ),
          key: '0',
          danger: true,
        },
        {
          label: (
            <NavLink to={'/admin'}>
              <h1 className="update__info">Đi đến trang admin</h1>
            </NavLink>
          ),
          key: '1',
          danger: true,
        },
        {
          type: 'divider',
        },
        {
          label: (
            <h1
              onClick={() => {
                showConfirm();
              }}
              className="user__logout"
            >
              Đăng xuất
            </h1>
          ),
          key: '2',
          danger: true,
        },
      ]}
    />
  );

  const userMenu = (
    <Menu
      items={[
        {
          label: (
            <h1
              onClick={() => {
                navigate('/edit_information');
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className="update__info"
            >
              Cập nhật tài khoản/ lịch sử đặt vé
            </h1>
          ),
          key: '0',
          danger: true,
        },
        {
          type: 'divider',
        },
        {
          label: (
            <h1
              onClick={() => {
                showConfirm();
              }}
              className="user__logout"
            >
              Đăng xuất
            </h1>
          ),
          key: '1',
          danger: true,
        },
      ]}
    />
  );
  const showConfirm = () => {
    confirm({
      title: 'Bạn vẫn muốn đăng xuất khỏi tài khoản?',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: '2.5rem' }} />
      ),

      onOk() {
        localStorage.clear();
        navigate('/');
      },

      onCancel() {},
    });
  };
  const navigate = useNavigate();
  const userAccount = useSelector(user);
  const { hoTen } = userAccount;

  //renderUI when user login or not
  const renderUI = () => {
    let user = {};
    if (localStorage.getItem('USER_LOGIN')) {
      user = JSON.parse(localStorage.getItem('USER_LOGIN'));
      if (user.maLoaiNguoiDung === 'QuanTri') {
        return (
          <div className="logout__section d-flex">
            <Dropdown
              overlayStyle={{ zIndex: '11' }}
              overlay={adminMenu}
              trigger={['hover']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{
                      transform: 'translateY(2px)',
                      marginRight: '0.5rem',
                    }}
                    src={`https://joeschmoe.io/api/v1/${user.hoTen}`}
                  />
                  <div className="user">
                    <h1
                      style={{
                        fontSize: '1.2rem',
                        marginRight: '1.2rem',
                      }}
                      className="text-dark"
                    >
                      Xin chào, {user.hoTen} !
                    </h1>
                  </div>
                  <DownOutlined
                    style={{
                      color: 'black',
                      transform: 'translate(-18px,4px)',
                    }}
                  />
                </Space>
              </a>
            </Dropdown>
            {/* <div className="user">
              <h1
                style={{ fontSize: '1.2rem', marginRight: '1.2rem' }}
                className="text-white"
              >
                Xin chào, {user.hoTen} !
              </h1>
            </div> */}
            {/* <button
              style={{ fontSize: '1.2rem' }}
              onClick={() => {
                showConfirm();
              }}
              className="logout__button"
            >
              Đăng xuất
            </button> */}
          </div>
        );
      } else if (user.maLoaiNguoiDung === 'KhachHang') {
        return (
          <div className="logout__section d-flex">
            <Dropdown
              overlayStyle={{ zIndex: '11' }}
              overlay={userMenu}
              trigger={['hover']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{
                      transform: 'translateY(2px)',
                      marginRight: '0.5rem',
                      fontSize: '1.2rem',
                    }}
                    src={`https://joeschmoe.io/api/v1/${user.hoTen}`}
                  />
                  <div className="user">
                    <h1
                      style={{
                        fontSize: '1.2rem',
                        marginRight: '1.2rem',
                      }}
                      className="text-dark"
                    >
                      Xin chào, {user.hoTen} !
                    </h1>
                  </div>
                  <DownOutlined
                    style={{
                      color: 'black',
                      transform: 'translate(-18px,4px)',
                    }}
                  />
                </Space>
              </a>
            </Dropdown>
          </div>
        );
      }
    } else {
      return (
        <div>
          <NavLink to={'/register'}>
            <button
              style={{ fontSize: '1.2rem' }}
              className="register__button"
              type="transparent"
              shape="round"
            >
              Đăng ký
            </button>
          </NavLink>

          <NavLink to={'/login'}>
            <button
              style={{ fontSize: '1.2rem' }}
              className="login__button"
              type="transparent"
              shape="round"
            >
              Đăng nhập
            </button>
          </NavLink>
        </div>
      );
    }
  };
  return (
    <div className="header">
      <div className="name">
        <h1>
          <VideoCameraOutlined style={{ fontSize: 80 }} />
        </h1>
      </div>
      <div className="nav_bar">
        <a className="" href="/">
          Trang chủ
        </a>
        <a className="">Cụm rạp</a>
        <a className="">Tin tức</a>
        <a className="">Liên hệ</a>
      </div>
      <div className="buttons">
        {renderUI()}
        {/* <NavLink to={'/register'}>
          <button
            className="register__button"
            type="transparent"
            shape="round"
          >
            Đăng ký
          </button>
        </NavLink>

        <NavLink to={'/login'}>
          <button
            className="login__button"
            type="transparent"
            shape="round"
          >
            Đăng nhập
          </button>
        </NavLink> */}
      </div>
    </div>
  );
}
