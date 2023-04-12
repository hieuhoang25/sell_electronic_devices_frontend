import React, { useState, memo, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, Form, Input, Radio, Modal } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import DatePickerCalendar from './DatePicker';
import './PersonalInfo.css';
import { useSelector } from 'react-redux';
import axios from '../../../services/axios';

const ChangeEmailForm = () => {
    // const { TextArea } = Input();
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
    };
    return (
        <Form
            name="complex-form"
            onFinish={onFinish}
            labelCol={{
                span: 0,
            }}
            wrapperCol={{
                span: 24,
            }}
        >
            <Form.Item
                style={{
                    marginBottom: 0,
                }}
            >
                <Form.Item
                    name="first"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(24% - 2px)',
                        margin: '0 2px',
                    }}
                >
                    <Input
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,.26)',
                            borderRadius: '0px',
                        }}
                        type="number"
                        bordered={false}
                    />
                </Form.Item>
                <Form.Item
                    name="second"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(24% - 2px)',
                        margin: '0 2px',
                    }}
                >
                    <Input
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,.26)',
                            borderRadius: '0px',
                        }}
                        type="number"
                        bordered={false}
                    />
                </Form.Item>
                <Form.Item
                    name="third"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(24% - 2px)',
                        margin: '0 2px',
                    }}
                >
                    <Input
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,.26)',
                            borderRadius: '0px',
                        }}
                        type="number"
                        bordered={false}
                    />
                </Form.Item>
                <Form.Item
                    name="four"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        display: 'inline-block',
                        width: 'calc(24% - 2px)',
                        margin: '0 2px',
                    }}
                >
                    <Input
                        style={{
                            borderBottom: '1px solid rgba(0,0,0,.26)',
                            borderRadius: '0px',
                        }}
                        type="number"
                        bordered={false}
                    />
                </Form.Item>
            </Form.Item>
        </Form>
    );
};
const UserForm = () => {
    const [infoUser, setInfoUser] = useState();
    useEffect(async () => {
        const reponse_info = await axios
            .get(process.env.REACT_APP_URL + 'user/info')
            .catch((error) => console.log(error));
        setInfoUser(reponse_info.data);
        // infoUser = reponse_info.data;
    }, []);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    //modal để thay đổi email
    const ModalChangePassword = () => {
        return (
            <>
                <Modal
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Trở lại
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <div>
                        Để tăng cường bảo mật cho tài khoản của bạn, hãy xác
                        minh thông tin
                    </div>
                    <Button>Xác minh bằng mã OTP gửi qua email</Button>

                    <ChangeEmailForm />
                </Modal>
            </>
        );
    };
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    const formItemLayout =
        formLayout === 'horizontal'
            ? {
                  labelCol: {
                      span: 5,
                  },
                  wrapperCol: {
                      span: 14,
                  },
              }
            : null;
    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                  wrapperCol: {
                      span: 14,
                      offset: 5,
                  },
              }
            : null;
    return (
        <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{
                layout: formLayout,
            }}
            onValuesChange={onFormLayoutChange}
        >
            {/* <Form.Item label="Tên đăng nhập">
                <div>NhatPhu00</div>
            </Form.Item> */}
            <Form.Item label="Tên">
                <Input value={infoUser?.full_name} />
            </Form.Item>
            <Form.Item label="Email">
                <Input
                    disabled
                    style={{
                        width: 'calc(100% - 90px)',
                    }}
                    value={infoUser?.email}
                />
                <Button onClick={showModal} type="text">
                    Thay đổi
                </Button>
            </Form.Item>
            <Form.Item label="Số điện thoại">
                <Input
                    disabled
                    style={{
                        width: 'calc(100% - 90px)',
                    }}
                    value={infoUser?.phone}
                />
                <Button type="text">Thay đổi</Button>
            </Form.Item>
            {/* <Form.Item label="Giới tính">
                <Radio.Group>
                    <Radio value={1}>Nam</Radio>
                    <Radio value={2}>Nữ</Radio>
                </Radio.Group>
            </Form.Item> */}
            {/* <Form.Item label="Ngày sinh">
                <DatePickerCalendar />
            </Form.Item> */}
            <Form.Item {...buttonItemLayout}>
                <Button loading={true} icon={<SaveOutlined />} type="primary">
                    Lưu
                </Button>
            </Form.Item>
            <ModalChangePassword />
        </Form>
    );
};
function PersonalInfo() {
    const [date, setDate] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setDate(newValue);
    };
    //radio value
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    //loading button
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setLoading(true);
    }

    return (
        <div
            style={{
                width: '100%',
                minHeight: '750px',
                backgroundColor: 'rgba(0,0,0,.09)',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    margin: 'auto',
                    width: 600,
                    height: 600,
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 13%)',
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    padding: '50px',
                    marginTop: '50px',
                }}
            >
                <div>
                    <h3>Hồ Sơ Của Tôi</h3>
                    <h5 style={{ opacity: 0.9 }}>
                        Quản lý thông tin hồ sơ để bảo mật tài khoản
                    </h5>
                    <hr style={{ opacity: 0.2 }} />
                    <UserForm />
                </div>
            </div>
        </div>
    );
}

export default memo(PersonalInfo);
