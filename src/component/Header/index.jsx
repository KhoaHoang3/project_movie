import React, { useEffect, useState } from 'react';
import { Button, Radio, Modal } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <div className="name">
        <h1>
          <VideoCameraOutlined style={{ fontSize: 80 }} />
        </h1>
      </div>
      <div className="nav_bar">
        <a className="text-white">Trang chủ</a>
        <a className="text-white">Cụm rạp</a>
        <a className="text-white">Tin tức</a>
        <a className="text-white">Liên hệ</a>
      </div>
      <div className="buttons">
        <NavLink to={'/register'}>
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
        </NavLink>
      </div>
    </div>
  );
}
