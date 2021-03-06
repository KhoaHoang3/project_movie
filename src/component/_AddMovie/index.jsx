import React, { useEffect, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { uploadNewMovieAction } from '../../redux/thunk/actions';
import { useDispatch } from 'react-redux';
import { GROUPID } from '../../axios';

export default function AddMovie() {
  const [img, setImg] = useState('');
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  //send data to backend
  const onFinish = (values) => {
    const {
      tenPhim,
      trailer,
      moTa,
      sapChieu,
      dangChieu,
      hot,
      ngayKhoiChieu,
      hinhAnh,
      maNhom,
    } = values;
    const newNgayKC = moment(ngayKhoiChieu._d).format('DD/MM/YYYY');

    const formData = new FormData();
    for (let key in values) {
      if (key === 'ngayKhoiChieu') {
        formData.append(key, newNgayKC);
      } else if (key !== 'hinhAnh') {
        formData.append(key, values[key]);
      } else {
        formData.append('File', hinhAnh);
      }
    }

    const action = uploadNewMovieAction(formData);
    dispatch(action);
  };

  // get image data
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };

  return (
    <div style={{}}>
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // initialValues={{
        //   size: componentSize,
        // }}
        // onValuesChange={onFormLayoutChange}
        size={'large'}
        initialValues={{
          maNhom: GROUPID,
        }}
      >
        {/* MOVIE_NAME */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'H??y nh???p t??n phim',
            },
          ]}
          name="tenPhim"
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              T??n phim:{' '}
            </h1>
          }
        >
          <Input />
        </Form.Item>

        {/* MOVIE GROUP */}
        <Form.Item
          name="maNhom"
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              M?? nh??m:{' '}
            </h1>
          }
        >
          <Input name="maNhom" disabled />
        </Form.Item>

        {/* TRAILER */}
        <Form.Item
          name={'trailer'}
          rules={[
            {
              required: true,
              message: 'H??y th??m URL trailer phim',
            },
            {
              type: 'url',
              message: 'H??y nh???p ????ng ?????nh d???ng URL',
            },
          ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Trailer:{' '}
            </h1>
          }
        >
          <Input id="trailer" />
        </Form.Item>
        {/* DESCRBIE */}
        <Form.Item
          name={'moTa'}
          rules={[
            {
              required: true,
              message: 'H??y th??m m?? t??? phim ',
            },
          ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              M?? t??? phim:{' '}
            </h1>
          }
        >
          <Input />
        </Form.Item>
        {/* DATE_AND_TIME */}
        <Form.Item
          name={'ngayKhoiChieu'}
          rules={[
            {
              required: true,
              message: 'H??y ch???n ng??y chi???u ',
            },
          ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Ng??y chi???u:{' '}
            </h1>
          }
        >
          <DatePicker format={'DD/MM/YYYY'} />
        </Form.Item>

        {/* NOW_SHOWING */}
        <Form.Item
          name={'dangChieu'}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              ??ang chi???u
            </h1>
          }
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
        {/* COMING SOON */}
        <Form.Item
          name={'sapChieu'}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              S???p chi???u
            </h1>
          }
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>

        {/* HOT? */}
        <Form.Item
          name={'hot'}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Hot
            </h1>
          }
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>

        {/* IMDB */}
        <Form.Item
          name={'danhGia'}
          rules={[
            {
              required: true,
              message: 'H??y nh???p ??i???m IMDB',
            },
          ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              ??i???m IMDB
            </h1>
          }
        >
          <InputNumber size="large" min={1} max={10} />
        </Form.Item>

        {/* UPLOAD IMAGE */}
        <Form.Item
          help="File ???nh kh??ng qu?? 1MB"
          getValueFromEvent={getFile}
          name="hinhAnh"
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              H??nh ???nh
            </h1>
          }
        >
          <Upload
            status={'done'}
            openFileDialogOnClick
            accept=".png,.jpeg,.jpg,.doc"
            listType="picture"
            beforeUpload={(file) => {
              console.log(file);
              return false;
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>T???i h??nh l??n</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              transform: 'translateX(286px)',
              width: '100%',
              padding: '2rem 0',
              fontSize: '1.5rem',
              borderRadius: '10px',
              marginTop: '3.6rem',
            }}
            type="primary"
          >
            <h1
              style={{
                color: 'white',
                marginBottom: '0',
                lineHeight: '1px',
              }}
            >
              Th??m phim
            </h1>
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="add__movie">
        <h1 className="add__movie__title">
          Th??m phim v??o danh s??ch chi???u
        </h1>
        <form className="add__movie__form">
          <div class="text-field">
            <label for="movie_name">T??n phim</label>
            <input autoComplete="off" type="text" id="movie_name" />
          </div>
          <div class="text-field">
            <label for="movie_trailer">Trailer</label>
            <input
              autoComplete="off"
              type="text"
              id="movie_trailer"
            />
          </div>
          <div class="text-field">
            <label for="movie_trailer">M?? t??? phim</label>
            <input
              autoComplete="off"
              type="text"
              id="movie_describe"
            />
          </div>
        </form>
      </div> */}
    </div>
  );
}
