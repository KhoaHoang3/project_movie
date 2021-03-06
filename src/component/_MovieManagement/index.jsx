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
  CalendarOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Space,
  Table,
  Modal,
  Drawer,
  Tooltip,
} from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import FormEditFilm from '../../Layout/LayoutEditFilm';
import { edittingFilm } from '../../redux/reducers/editFilmReducer';
import { NavLink } from 'react-router-dom';
import FormCreateCalendar from '../../Layout/LayoutCreateCalendar';
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
          B???n v???n mu???n x??a phim n??y ch??? ?{' '}
        </h1>
      ),
      icon: (
        <ExclamationCircleOutlined style={{ fontSize: '40px' }} />
      ),
      okText: 'C??',
      okType: 'danger',
      cancelText: 'Kh??ng',

      onOk() {
        dispatch(deleteFilmManagementAction(filmCode));
      },

      onCancel() {},
    });
  };

  //DATA
  const columns = [
    {
      title: 'M?? phim',
      dataIndex: 'maPhim',
      key: 'maPhim',
      width: '10%',
      align: 'center',
      ...getColumnSearchProps('maPhim'),
    },
    {
      title: 'H??nh ???nh',
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
      title: 'T??n phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      width: '20%',
      align: 'center',

      ...getColumnSearchProps('tenPhim'),
    },

    // DESCBRIBE
    {
      title: 'M?? t???',
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
            <Tooltip key={'1'} placement="top" title="X??a phim">
              <Button
                onClick={() => {
                  showDeleteConfirm(record.maPhim);
                }}
                size="large"
                icon={<DeleteOutlined style={{ fontSize: '40px' }} />}
                type="danger"
              ></Button>
            </Tooltip>

            <Tooltip
              key={'2'}
              placement="top"
              title="Ch???nh s???a/c???p nh???t phim"
            >
              <Button
                onClick={() => {
                  setDrawer(true);
                  dispatch(edittingFilm(record));
                }}
                size="large"
                icon={<FormOutlined style={{ fontSize: '40px' }} />}
                type="primary"
              ></Button>
            </Tooltip>

            <Tooltip key={'3'} placement="top" title="T???o l???ch chi???u">
              <Button
                onClick={() => {
                  setModalCalendar(true);
                  dispatch(edittingFilm(record));
                }}
                style={{
                  backgroundColor: 'green',
                  borderColor: 'green',
                }}
                type="primary"
                size="large"
                icon={<CalendarOutlined />}
              ></Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  // ----------------------------------
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const [modalCalendar, setModalCalendar] = useState(false);

  useEffect(() => {
    const action = getFilmsForManagementAction();
    dispatch(action);
  }, [dispatch]);
  const { films } = useSelector(getFilmManagement);
  return (
    <div>
      <Table
        style={{ fontSize: '3rem' }}
        columns={columns}
        dataSource={films}
      />

      {drawer && (
        <FormEditFilm drawer={drawer} closeDrawer={setDrawer} />
      )}

      {modalCalendar && (
        <FormCreateCalendar
          modalCalendar={modalCalendar}
          closeModal={setModalCalendar}
        />
      )}
    </div>
  );
}
