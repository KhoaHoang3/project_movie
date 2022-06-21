import React, { useEffect, useRef, useState } from 'react';
import {
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Tooltip,
  Modal,
} from 'antd';
import Highlighter from 'react-highlight-words';
import {
  deleteUserAction,
  getUserListAction,
} from '../../redux/thunk/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../redux/selectors';
import { toast } from 'react-toastify';
import FormEditUser from '../../Layout/LayoutEditUser';
import { getUserInfoEdit } from '../../redux/reducers/getUserListReducer';
const { confirm } = Modal;

export default function UserManagement() {
  // ---------------------
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
  const columns = [
    // NAME
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      width: '20%',
      align: 'center',
      ...getColumnSearchProps('hoTen'),
    },
    // EMAIL
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '22%',
      align: 'center',

      ...getColumnSearchProps('email'),
    },
    // PHONE NUMBER
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      width: '22%',
      align: 'center',

      ...getColumnSearchProps('soDt'),
    },
    // KIND OF USERS
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      key: 'maLoaiNguoiDung',
      width: '20%',
      align: 'center',
      ...getColumnSearchProps('maLoaiNguoiDung'),
      render: (text, record, index) => {
        {
          return record.maLoaiNguoiDung === 'QuanTri' ? (
            <Tag
              style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}
              color="green"
            >
              Quản trị
            </Tag>
          ) : (
            <Tag
              style={{ fontSize: '1.2rem', padding: '0.5rem 1rem' }}
              color="blue"
            >
              Khách hàng
            </Tag>
          );
        }
      },
    },
    // ACTION
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '40%',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Tooltip key={'1'} placement="top" title="Xóa người dùng">
              <Button
                onClick={() => {
                  console.log(record);
                  let user = {};
                  if (localStorage.getItem('USER_LOGIN')) {
                    user = JSON.parse(
                      localStorage.getItem('USER_LOGIN')
                    );
                    if (
                      user.maLoaiNguoiDung === 'QuanTri' &&
                      record.maLoaiNguoiDung === 'QuanTri'
                    ) {
                      toast.error(
                        'Bạn không thể xóa người dùng này',
                        {
                          position: 'top-center',
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                        }
                      );
                    } else {
                      showConfirm(record.taiKhoan);
                    }
                  }
                }}
                type="danger"
                size="large"
                icon={<DeleteOutlined style={{ fontSize: '40px' }} />}
              ></Button>
            </Tooltip>

            <Tooltip
              key={'2'}
              placement="top"
              title="Chỉnh sửa/ cập nhật người dùng"
            >
              <Button
                onClick={() => {
                  dispatch(getUserInfoEdit(record));
                  setVisible(true);
                }}
                type="primary"
                size="large"
                icon={<FormOutlined style={{ fontSize: '40px' }} />}
              ></Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const showConfirm = (accountUser) => {
    confirm({
      title: <h1>Bạn vẫn muốn xóa người dùng này ?</h1>,
      icon: <ExclamationCircleOutlined />,
      cancelText: 'Hủy',
      okText: 'Đồng ý',

      onOk() {
        const action = deleteUserAction(accountUser);
        dispatch(action);
      },

      onCancel() {},
    });
  };

  // ------------------------
  const dispatch = useDispatch();
  useEffect(() => {
    const action = getUserListAction();
    dispatch(action);
  }, [dispatch]);
  const { users } = useSelector(getUserList);
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Table columns={columns} dataSource={users} />

      {visible && (
        <FormEditUser visible={visible} closeModal={setVisible} />
      )}
    </div>
  );
}
