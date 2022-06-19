import React, { useState } from 'react';
import {
  Drawer,
  Space,
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { GROUPID } from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import { editFilm } from '../../redux/selectors';
import moment from 'moment';
import { Footer } from 'antd/lib/layout/layout';
import { updateFilmAction } from '../../redux/thunk/actions';

export default function FormEditFilm({ drawer, closeDrawer }) {
  const [form] = Form.useForm();

  const { currentFilm } = useSelector(editFilm);
  const dispatch = useDispatch();
  // get image data
  const getFile = (e) => {
    console.log('Upload Image', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };

  const {
    tenPhim,
    sapChieu,
    hot,
    dangChieu,
    danhGia,
    hinhAnh,
    moTa,
    ngayKhoiChieu,
    trailer,
    maPhim,
  } = currentFilm;
  const oldImage = hinhAnh;
  const onFinish = (values) => {
    const {
      tenPhim,
      trailer,
      hot,
      dangChieu,
      sapChieu,
      hinhAnh,
      moTa,
      ngayKhoiChieu,
      maPhim,
    } = values;
    console.log(values);
    const newNgayKC = moment(ngayKhoiChieu).format('DD/MM/YYYY');
    const formData = new FormData();
    for (let key in values) {
      if (key === 'ngayKhoiChieu') {
        formData.append('ngayKhoiChieu', newNgayKC);
      } else if (key !== 'hinhAnh') {
        formData.append(key, values[key]);
      } else if (values.hinhAnh === undefined) {
        formData.append('hinhAnh', oldImage);
      } else {
        formData.append('File', hinhAnh);
      }
    }
    const action = updateFilmAction(formData);
    dispatch(action);
  };
  return (
    <Drawer
      title={
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0' }}>
          Chỉnh sửa/cập nhật phim
        </h1>
      }
      placement="right"
      size={'large'}
      onClose={() => closeDrawer(false)}
      visible={drawer}
      extra={
        <Space>
          <Button
            htmlType="submit"
            type="primary"
            onClick={() => closeDrawer(false)}
          >
            OK
          </Button>
        </Space>
      }
    >
      {/* FORM */}
      <Form
        style={{ width: '800px' }}
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
          tenPhim: tenPhim,
          danhGia: danhGia,
          moTa: moTa,
          trailer: trailer,
          ngayKhoiChieu: moment(ngayKhoiChieu),
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
        {/* MOVIE_NAME */}
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Hãy nhập tên phim',
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
              Tên phim:{' '}
            </h1>
          }
        >
          <Input name="tenPhim" />
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
              Mã nhóm:{' '}
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
              message: 'Hãy thêm URL trailer phim',
            },
            {
              type: 'url',
              message: 'Hãy nhập đúng định dạng URL',
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
          <Input id="trailer" name="trailer" />
        </Form.Item>
        {/* DESCRBIE */}
        <Form.Item
          name={'moTa'}
          rules={[
            {
              required: true,
              message: 'Hãy thêm mô tả phim ',
            },
          ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Mô tả phim:{' '}
            </h1>
          }
        >
          <Input name="moTa" />
        </Form.Item>
        {/* DATE_AND_TIME */}
        <Form.Item
          name={'ngayKhoiChieu'}
          // rules={[
          //   {
          //     required: true,
          //     message: 'Hãy chọn ngày chiếu ',
          //   },
          // ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Ngày chiếu:{' '}
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
              Đang chiếu
            </h1>
          }
          valuePropName="checked"
          initialValue={dangChieu}
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
              Sắp chiếu
            </h1>
          }
          valuePropName="checked"
          initialValue={sapChieu}
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
          initialValue={hot}
        >
          <Switch />
        </Form.Item>

        {/* IMDB */}
        <Form.Item
          name={'danhGia'}
          rules={[
            {
              required: true,
              message: 'Hãy nhập điểm IMDB',
            },
          ]}
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Điểm IMDB
            </h1>
          }
        >
          <InputNumber name="danhGia" size="large" min={1} max={10} />
        </Form.Item>

        {/* UPLOAD IMAGE */}
        <Form.Item
          getValueFromEvent={getFile}
          name="hinhAnh"
          label={
            <h1
              style={{
                marginRight: '0.5rem',
                transform: 'translateY(10%)',
              }}
            >
              Hình ảnh
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
            <Button icon={<UploadOutlined />}>Tải hình lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              width: '100%',
              padding: '2rem 0',
              fontSize: '1.5rem',
              transform: 'translateX(132px)',
              borderRadius: '10px',
              marginTop: '3rem',
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
              Cập nhật phim
            </h1>
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
