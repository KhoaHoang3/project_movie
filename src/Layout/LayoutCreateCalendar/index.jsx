import React, { useEffect } from 'react';
import {
  Cascader,
  Form,
  Modal,
  DatePicker,
  Space,
  Button,
  InputNumber,
  Select,
  Input,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { getTheaterInfoAction } from '../../redux/thunk/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { getTheaterInfo } from '../../redux/selectors';
import { useState } from 'react';
import { http } from '../../axios';
import {
  getTheaterInfo,
  getTheaterSystemInfoURL,
} from '../../axios/apiURL';
import { editFilm } from '../../redux/selectors';

export default function FormCreateCalendar({
  modalCalendar,
  closeModal,
}) {
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const onFinish = (values) => {
    console.log('VALUES', values);
  };
  const { currentFilm } = useSelector(editFilm);
  const { maPhim } = currentFilm;
  console.log(maPhim);

  const [theater, setTheater] = useState({
    theaterSystem: [],
    theater: [],
  });
  // console.log('HTR', theater.heThongRap);
  //   console.log('cumRap', theater.cumRap);

  useEffect(() => {
    async function callTheaterSystemApi() {
      try {
        const result = await http.get(getTheaterInfo);
        setTheater({
          ...theater,
          theaterSystem: result.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    }
    callTheaterSystemApi();
  }, []);

  const handleChangeTheaterSystem = (value) => {
    async function callTheaterApi() {
      try {
        const result = await http.get(
          `${getTheaterSystemInfoURL}?maHeThongRap=${value}`
        );
        setTheater({
          ...theater,
          theater: result.data.content,
        });
      } catch (error) {
        console.log(error);
      }
    }
    callTheaterApi();
  };
  return (
    <div>
      <Modal
        title="Tạo lịch chiếu"
        visible={modalCalendar}
        onOk={() => closeModal(false)}
        onCancel={() => closeModal(false)}
        footer={null}
        style={{ width: '700px' }}
      >
        <Form
          onFinish={onFinish}
          style={{ width: '620px' }}
          size="large"
          layout="horizontal"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            maPhim: maPhim,
          }}
        >
          {/* FILM CODE */}
          <Form.Item
            name="maPhim"
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                Mã phim:{' '}
              </h1>
            }
          >
            <Input name="maPhim" disabled />
          </Form.Item>
          {/* THEATER SYSTEM */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Hãy chọn hệ thống rạp',
              },
            ]}
            name={'heThongRap'}
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                Hệ thống rạp:{' '}
              </h1>
            }
          >
            <Select
              onChange={handleChangeTheaterSystem}
              options={theater.theaterSystem?.map((item) => {
                return {
                  label: item.tenHeThongRap,
                  value: item.maHeThongRap,
                };
              })}
              placeholder="Chọn hệ thống rạp"
            />
          </Form.Item>
          {/* THEATER */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Hãy chọn hệ thống rạp',
              },
            ]}
            name={'cumRap'}
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                Cụm rạp:{' '}
              </h1>
            }
          >
            <Select
              options={theater.theater?.map((item) => {
                return {
                  label: item.tenCumRap,
                  value: item.tenCumRap,
                };
              })}
              placeholder="Chọn cụm rạp"
            />
          </Form.Item>
          {/* CHOOSE DATE AND TIME */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Hãy chọn hệ ngày/giờ chiếu',
              },
            ]}
            name={'ngayChieuGioChieu'}
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                Ngày giờ:{' '}
              </h1>
            }
          >
            <DatePicker
              placeholder="Chọn ngày/giờ"
              showTime
              onChange={onChange}
              onOk={onOk}
            />
          </Form.Item>
          {/* TICKET PRICE */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Hãy nhập giá vé từ 75.000-150.000đ',
              },
            ]}
            name={'giaVe'}
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                Giá vé:{' '}
              </h1>
            }
          >
            <InputNumber max={150000} min={75000} /> đồng
          </Form.Item>
          {/* BUTTON */}
          <Form.Item>
            <Button
              htmlType="submit"
              style={{
                backgroundColor: 'green',
                borderColor: 'green',
                transform: 'translateX(100px)',
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
                Tạo lịch chiếu
              </h1>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
