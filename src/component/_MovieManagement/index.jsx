import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmManagement } from '../../redux/selectors';
import {
  deleteFilmManagementAction,
  getFilmsForManagementAction,
} from '../../redux/thunk/actions';
import {
  SearchOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
const { confirm } = Modal;

export default function MovieManagement() {
  // FOR ANT DESIGN
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const showDeleteConfirm = (filmCode) => {
    confirm({
      title: (
        <h1 style={{ fontSize: '1.2rem' }}>
          Bạn vẫn muốn xóa phim này chứ ?{' '}
        </h1>
      ),
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: '40px' }} />
      ),
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',

      onOk() {
        dispatch(deleteFilmManagementAction(filmCode));
      },

      onCancel() {},
    });
  };

  //DATA
  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: '10%',
      align: 'center',
      ...getColumnSearchProps('maPhim'),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      width: '10%',
      align: 'center',

      render: (text, record, index) => {
        return (
          <img key={index} src={text} height={200} width={180}></img>
        );
      },
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      width: '20%',
      align: 'center',

      ...getColumnSearchProps('tenPhim'),
    },

    // DESCBRIBE
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      width: '45%',
      align: 'center',

      ...getColumnSearchProps('moTa'),
    },
    // ACTION
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                showDeleteConfirm(record.maPhim);
              }}
              size="large"
              icon={<DeleteOutlined style={{ fontSize: '40px' }} />}
              type="danger"
            ></Button>

            <Button
              size="large"
              icon={<FormOutlined style={{ fontSize: '40px' }} />}
              type="primary"
            ></Button>
          </Space>
        );
      },
    },
  ];

  // ----------------------------------
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getFilmsForManagementAction();
    dispatch(action);
  }, [dispatch]);
  const { films } = useSelector(getFilmManagement);
  console.log(films);
  return (
    <div>
      <Table
        style={{ fontSize: '3rem' }}
        columns={columns}
        dataSource={films}
      />
    </div>
  );
}
