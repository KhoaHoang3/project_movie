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
import {
  createShowtimeMovieAction,
  getTheaterInfoAction,
} from '../../redux/thunk/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { getTheaterInfo } from '../../redux/selectors';
import { useState } from 'react';
import { http } from '../../axios';
import {
  getTheaterInfo,
  getTheaterSystemInfoURL,
} from '../../axios/apiURL';
import { editFilm } from '../../redux/selectors';
import moment from 'moment';

export default function FormCreateCalendar({
  modalCalendar,
  closeModal,
}) {
  // const onChange = (value, dateString) => {
  //   console.log('Selected Time: ', value);
  //   console.log('Formatted Selected Time: ', dateString);
  // };

  // const onOk = (value) => {
  //   console.log('onOk: ', value);
  // };
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { maPhim, ngayGioKhoiChieu, maRap, giaVe } = values;
    const ngayChieuGioChieu = moment(ngayGioKhoiChieu).format(
      'DD/MM/YYYY hh:mm:ss'
    );
    const action = createShowtimeMovieAction({
      maPhim,
      ngayChieuGioChieu,
      maRap,
      giaVe,
    });
    dispatch(action);
  };
  const [form] = Form.useForm();

  const { currentFilm } = useSelector(editFilm);
  const { maPhim } = currentFilm;

  const [theater, setTheater] = useState({
    theaterSystem: [],
    theater: [],
  });

  const changeMoney = (value) => {
    console.log('money', value);
  };

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
        title="T???o l???ch chi???u"
        visible={modalCalendar}
        onOk={() => closeModal(false)}
        onCancel={() => closeModal(false)}
        footer={null}
        style={{ width: '700px' }}
      >
        <Form
          form={form}
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
                M?? phim:{' '}
              </h1>
            }
          >
            <Input
              style={{ fontWeight: 'bolder' }}
              name="maPhim"
              disabled
            />
          </Form.Item>
          {/* THEATER SYSTEM */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'H??y ch???n h??? th???ng r???p',
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
                H??? th???ng r???p:{' '}
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
              placeholder="Ch???n h??? th???ng r???p"
            />
          </Form.Item>
          {/* THEATER */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'H??y ch???n h??? th???ng r???p',
              },
            ]}
            name={'maRap'}
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                C???m r???p:{' '}
              </h1>
            }
          >
            <Select
              options={theater.theater?.map((item) => {
                return {
                  label: item.tenCumRap,
                  value: item.maCumRap,
                };
              })}
              placeholder="Ch???n c???m r???p"
            />
          </Form.Item>
          {/* CHOOSE DATE AND TIME */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'H??y ch???n ng??y/gi??? chi???u',
              },
            ]}
            name={'ngayGioKhoiChieu'}
            label={
              <h1
                style={{
                  marginRight: '0.5rem',
                  transform: 'translateY(10%)',
                }}
              >
                Ng??y gi???:{' '}
              </h1>
            }
          >
            <DatePicker
              format={'DD/MM/YYYY hh:mm:ss A'}
              placeholder="Ch???n ng??y/gi???"
              showTime
              // onChange={onChange}
              // onOk={onOk}
            />
          </Form.Item>
          {/* TICKET PRICE */}
          <Form.Item
            rules={[
              {
                required: true,
                message: 'H??y nh???p gi?? v??',
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
                Gi?? v??:{' '}
              </h1>
            }
          >
            <InputNumber size="large"></InputNumber>
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
                T???o l???ch chi???u
              </h1>
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
