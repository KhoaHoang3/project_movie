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
    <Upload
      accept=".png,.jpeg,.jpg,.doc"
      listType="picture"
      action={'http://localhost:3000/admin/add_movie'}
      multiple={'false'}
      // {...uploadProps}
      beforeUpload={(file) => {
        console.log(file);
        return false;
      }}
      maxCount={1}
      // defaultFileList={[
      //   {
      //     uid: '1',
      //     name: 'movie_image.png',
      //     status: 'done',
      //     url: 'https://www.google.com/',
      //   },
      // ]}
    >
      <Button icon={<UploadOutlined />}>Tải hình lên</Button>
    </Upload>
  );
};
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
    console.log(values);
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
              Sắp chiếu
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
          <InputNumber size="large" min={1} max={10} />
        </Form.Item>

        {/* UPLOAD IMAGE */}
        <Form.Item
          help="File ảnh không quá 1MB"
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

          {/* <input
            name="hinhAnh"
            type={'file'}
            onChange={handleUpdaloadImage}
          ></input>
          <img
            style={{ marginTop: '1rem' }}
            height={200}
            width={150}
            src={img}
            alt=""
            accept="image/jpeg, image/jpg, image/png"
          /> */}
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
              Thêm phim
            </h1>
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
