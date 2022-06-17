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

const AliyunOSSUpload = ({ value, onChange }) => {
  const [OSSData, setOSSData] = useState(); // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html

  const mockGetOSSData = () => ({
    dir: 'user-dir/',
    expire: '1577811661',
    host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    accessId: 'c2hhb2RhaG9uZw==',
    policy: 'eGl4aWhhaGFrdWt1ZGFkYQ==',
    signature: 'ZGFob25nc2hhbw==',
  });

  const init = async () => {
    try {
      const result = await mockGetOSSData();
      setOSSData(result);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = ({ fileList }) => {
    console.log('Aliyun OSS:', fileList);
    onChange?.([...fileList]);
  };

  const onRemove = (file) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload = async (file) => {
    if (!OSSData) return false;
    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix; // @ts-ignore

    file.url = OSSData.dir + filename;
    return file;
  };

  const uploadProps = {
    name: 'file',
    fileList: value,
    action: OSSData?.host,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
  };
  return (
    <Upload listType="picture" {...uploadProps}>
      <Button icon={<UploadOutlined />}>Tải hình lên</Button>
    </Upload>
  );
};
export default function AddMovie() {
  //   const [componentSize, setComponentSize] = useState('default');

  //   const onFormLayoutChange = ({ size }) => {
  //     setComponentSize(size);
  //   };

  const onFinish = (values) => {
    console.log(values);
    console.log(moment(values.ngayKhoiChieu._d).format('DD/MM/YYYY'));
  };
  const [form] = Form.useForm();

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
      >
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
          <Input />
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
          <Input id="trailer" />
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
          <Input />
        </Form.Item>
        {/* DATE_AND_TIME */}
        <Form.Item
          name={'ngayKhoiChieu'}
          rules={[
            {
              required: true,
              message: 'Hãy chọn ngày chiếu ',
            },
          ]}
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
          <DatePicker />
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
          //   valuePropName="checked"
        >
          <Switch defaultChecked />
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
        >
          <Switch defaultChecked />
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
          //   valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>

        {/* IMDB */}
        <Form.Item
          name={'danhGia'}
          rules={[
            {
              required: true,
              message: 'Hãy nhập điểm IMDB',
            },

            // {
            //   type: 'number',
            //   message: 'Hãy nhập vào số',
            // },
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
          <Input style={{ width: '10%' }} />
        </Form.Item>

        {/* UPLOAD IMAGE */}
        <Form.Item
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
          name="hinhAnh"
        >
          <AliyunOSSUpload />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            style={{ transform: 'translateX(194%)' }}
            type="primary"
          >
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="add__movie">
        <h1 className="add__movie__title">
          Thêm phim vào danh sách chiếu
        </h1>
        <form className="add__movie__form">
          <div class="text-field">
            <label for="movie_name">Tên phim</label>
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
            <label for="movie_trailer">Mô tả phim</label>
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
