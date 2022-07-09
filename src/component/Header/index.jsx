import React, { useEffect, useRef, useState } from 'react';
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
import {
  displayLoading,
  hideLoading,
} from '../../redux/reducers/loadingReducer';
import Logo from '../../assets/img/logo-01.png';
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
                dispatch(getUserInfoAction());
                setTimeout(() => {
                  navigate('/edit_information');
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
                dispatch(getUserInfoAction());
                setTimeout(() => {
                  navigate('/edit_information');
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
  // const RDmenu = (
  //   <Menu
  //     items={[
  //       // Home Page
  //       {
  //         label: (
  //           <NavLink rel="noopener noreferrer" to={'/'}>
  //             Trang chủ
  //           </NavLink>
  //         ),
  //         key: '0',
  //         danger: true,
  //       },
  //       //Theater
  //       {
  //         label: (
  //           <a target="_blank" rel="noopener noreferrer">
  //             Cụm rạp
  //           </a>
  //         ),
  //         key: '1',
  //         danger: true,
  //       },
  //       //News
  //       {
  //         label: (
  //           <a target="_blank" rel="noopener noreferrer">
  //             Tin tức
  //           </a>
  //         ),
  //         key: '2',
  //         danger: true,
  //       },
  //       // Contact
  //       {
  //         label: (
  //           <a target="_blank" rel="noopener noreferrer">
  //             Liên hệ
  //           </a>
  //         ),
  //         key: '3',
  //         danger: true,
  //       },
  //       {
  //         type: 'divider',
  //       },
  //       // login
  //       {
  //         label: <NavLink to={'/login'}>Đăng nhập</NavLink>,
  //         key: '4',
  //         danger: true,
  //       },
  //       {
  //         label: <NavLink to={'/register'}>Đăng ký</NavLink>,
  //         key: '5',
  //         danger: true,
  //       },
  //     ]}
  //   />
  // );
  const showConfirm = () => {
    confirm({
      title: 'Bạn vẫn muốn đăng xuất khỏi tài khoản?',
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: '2.5rem' }} />
      ),

      onOk() {
        localStorage.clear();
        navigate('/');
        window.location.reload();
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
              trigger={['click']}
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
                    <h1 className="text-dark">
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
      } else if (user.maLoaiNguoiDung === 'KhachHang') {
        return (
          <div className="logout__section d-flex">
            <Dropdown
              overlayStyle={{ zIndex: '11' }}
              overlay={userMenu}
              trigger={['click']}
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
        <div className="logout__section">
          <NavLink to={'/register'}>
            <div className="register__button">
              <a
                href="#"
                className="btn btn-sm animated-button thar-one"
              >
                Đăng ký
              </a>
            </div>
          </NavLink>

          <NavLink to={'/login'}>
            <div className="login__button">
              <a
                href="#"
                className="btn btn-sm animated-button thar-one"
              >
                Đăng nhập
              </a>
            </div>
          </NavLink>

          {/* <Dropdown
            trigger={['click']}
            className="dropdown"
            overlay={RDmenu}
            placement="bottomRight"
          >
            <i
              onClick={(e) => {
                e.preventDefault();
              }}
              className="navigation fa fa-bars"
            ></i>
          </Dropdown> */}
        </div>
      );
    }
  };

  const scrollToTheater = () => {
    window.scrollTo({
      top: 2300,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="name">
          <img
            onClick={() => {
              navigate('/');
            }}
            src={Logo}
            alt=""
          />
        </div>
        <div className="nav_bar">
          <a className="" href="/">
            Trang chủ
          </a>
          <a
            onClick={() => {
              scrollToTheater();
            }}
            className=""
          >
            Cụm rạp
          </a>
          <a className="">Tin tức</a>
          <a className="">Liên hệ</a>
        </div>
        <div className="buttons">{renderUI()}</div>
      </div>
    </div>
  );
}
