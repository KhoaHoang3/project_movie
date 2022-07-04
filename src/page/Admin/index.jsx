import React, { Component, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ArrowLeftOutlined,
  DownOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Space, Dropdown, Modal } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import MovieManagement from '../../component/_MovieManagement';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

export default function Admin(props) {
  const navigate = useNavigate();
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
  const menu = (
    <Menu
      items={[
        {
          label: (
            <h1
              onClick={() => {
                showConfirm();
              }}
              style={{ fontSize: '1.2rem' }}
            >
              Đăng xuất
            </h1>
          ),
          key: '1',
        },
      ]}
    />
  );
  let user = {};
  if (localStorage.getItem('USER_LOGIN')) {
    user = JSON.parse(localStorage.getItem('USER_LOGIN'));
    if (user.maLoaiNguoiDung !== 'QuanTri') {
      toast.error('Bạn không được phép vào trang này', {
        position: 'top-center',
        autoClose: 1000,
      });
      navigate('/');
    }
  }

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const renderUser = () => {
    let user = {};
    if (localStorage.getItem('USER_LOGIN')) {
      user = JSON.parse(localStorage.getItem('USER_LOGIN'));
      return (
        <div className="d-flex" style={{ marginRight: '5rem' }}>
          <Dropdown overlay={menu} trigger={['hover']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  style={{
                    transform: 'translateY(-7px)',
                    marginRight: '0.5rem',
                  }}
                  src={`https://joeschmoe.io/api/v1/${user.hoTen}`}
                />

                <h1 style={{ fontSize: '1.3rem' }}>
                  Xin chào {user.hoTen} !
                </h1>
                <DownOutlined
                  style={{
                    transform: 'translateY(-7px)',
                    color: 'black',
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
      );
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={'300'}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="xl"
        collapsedWidth={'200'}
      >
        <div className="logo">
          <h1
            style={{
              color: 'white',
              fontSize: '1.2rem',
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            CYBERMOVIE
          </h1>
        </div>

        <Menu
          style={{ fontSize: '1.2rem' }}
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={[location.pathname]}
          items={[
            // USER_MANAGEMENT
            {
              key: '/admin/user_management',
              icon: <UserOutlined />,
              label: 'Quản lý người dùng',
              onClick: () => {
                navigate('/admin/user_management');
              },
            },
            // ADD USER
            {
              key: '/admin/add_user',
              icon: <PlusCircleOutlined />,
              label: 'Thêm người dùng',
              onClick: () => {
                navigate('/admin/add_user');
              },
            },
            // MOVIE_MANAGEMENT
            {
              key: '/admin/movie_management',
              icon: <VideoCameraOutlined />,
              label: 'Quản lý phim',
              onClick: () => {
                navigate('/admin/movie_management');
              },
            },
            // ADD_MOVIE
            {
              key: '/admin/add_movie',
              icon: <UploadOutlined />,
              label: 'Thêm phim mới',
              onClick: () => {
                navigate('/admin/add_movie');
              },
            },

            {
              key: '4',
              icon: <ArrowLeftOutlined />,
              label: 'Về trang chủ',
              onClick: () => {
                navigate('/');
              },
            },
          ]}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          {/* <div className="">
            <h1>aiosdjoiajsd</h1>
          </div> */}
          {renderUser()}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            fontSize: '2rem',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
