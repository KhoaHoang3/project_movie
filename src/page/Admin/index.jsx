import React, { Component, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ArrowLeftOutlined,
  DiffOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';
import MovieManagement from '../../component/_MovieManagement';
import { NavLink } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

export default function Admin(props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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
          selectedKeys={location.pathname}
          defaultSelectedKeys={location.pathname}
          items={[
            {
              key: '/admin/user_management',
              icon: <UserOutlined />,
              label: 'Quản lý người dùng',
              onClick: () => {
                navigate('/admin/user_management');
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
              icon: <DiffOutlined />,
              label: 'Thêm phim mới',
              onClick: () => {
                navigate('/admin/add_movie');
              },
            },

            {
              key: '/admin/showtime',
              icon: <UploadOutlined />,
              label: 'Showtime',
              onClick: () => {
                navigate('/admin/showtime');
              },
            },
            {
              key: '4',
              icon: <ArrowLeftOutlined />,
              label: 'Về trang chủ',
            },
          ]}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            fontSize: '2rem',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
