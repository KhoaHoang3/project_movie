import React from 'react';
import {
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { getTheaterInfo } from '../../redux/selectors';
import { useSelector } from 'react-redux';

export default function Footer() {
  const { theaterInfo } = useSelector(getTheaterInfo);

  return (
    <div className="footer_2">
      <div className="title">
        <h1>CYBERMOVIE</h1>
      </div>
      <div className="partner">
        <h1>Đối tác:</h1>
        <div className="logo">
          {theaterInfo.map((item, index) => {
            return (
              <img
                style={{ width: 50, height: 50 }}
                key={index}
                src={item.logo}
              ></img>
            );
          })}
        </div>
      </div>
      <div className="app">
        <h1>Mobile Apps:</h1>
        <div className="app_2">
          <FacebookOutlined style={{ marginRight: '1rem' }} />
          <InstagramOutlined />
        </div>
      </div>
    </div>
  );
}
