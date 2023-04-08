import React, { useState, useEffect, useCallback, memo,useContext } from 'react';
import { Col, Row, Space } from 'antd';
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';
import { PAYMETHOD, ENV_URL } from '../../constants/index';
import { USER_INFOS } from '../../constants/user';
import axios from '../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'antd';

import { AimOutlined } from '@ant-design/icons';
import {REQUEST,CHECKOUT_TYPE,CheckoutContext} from './Checkout'
// const payData = [
//   { p_id: 1, name: "VISA" },
//   { p_id: 2, name: "COD" },
//   { p_id: 3, name: "Ví điện tử" }
// ];
const { Panel } = Collapse;
export const ADDRESS_FIELD = {
    PROVINCE: Symbol('province'),
    WARDS: Symbol('wards'),
    LINE: Symbol('address_line'),
    DISTR: Symbol('district'),
    POSTID:  Symbol('postal_id')
};
const getConfigAddressForm = (name) => {
    const { PROVINCE, WARDS, LINE, DISTR } = ADDRESS_FIELD;
    let field = '';
    switch (name) {
        case PROVINCE:
            field = 'Tỉnh/Thành';
            break;
        case WARDS:
            field = 'Phuờng/Xã';
            break;
        case DISTR:
            field = 'Quận/Huyện';
            break;
        case LINE:
            field = 'Địa chỉ';
            break;
        default:
            field = 'unknown';
    }

    return {
        rules: [
            {
                type: 'object',
                required: true,
                message: `Vui lòng nhập ${field}`,
            },
        ],
    };
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: '',
        },
    ],
};

const CheckoutForm = () => {
    const { dispatch,CheckoutReducer } = useContext(CheckoutContext);
    const { PROVINCE, WARDS, LINE, DISTR } = ADDRESS_FIELD;
    const { METHOD } = REQUEST;
    const {PAYMENT : ACTION_PAY, ADDRESS: ACTION_ADDR, PROMO, CHECKOUT } = CHECKOUT_TYPE;
    const [form] = Form.useForm();
  
   
    const inputProvince = Form.useWatch('input_province', form);
    
    

    const [payMethods, setPayMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [userAddresses, setUserAddresses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [otherAddress, setOtherAddress] = useState(false);
    const [inputAddress, setInputAddress] = useState([]);
    
    const [activeKey, setActiveKey]= useState([]);

    const fetchUserInfo = async () => {
        return axios.get(`${ENV_URL}${USER_INFOS}`);
    };
    const fetchPaymentMethod = async () => {
        return axios.get(`${ENV_URL}${PAYMETHOD}`);
    };

    useEffect(() => {
        console.log("Ceh: ",CheckoutReducer);
    },[CheckoutReducer])
    useEffect(() => {
        // await fetchData();
        setLoading(true);
        const fetch = async () => {
            console.log('getPayMethod....');
            await getPayMethods();
            console.log('finish getPayMethod....');
            console.log('');
            console.log('getUserInfo....');
            await getUserInfo();
            console.log('finish getUserInfo....', userInfo);

            console.log('');
            console.log('getAddress....');
            await getAddresses();
            // console.log('finish Address....');
        };
        fetch();

        setLoading(false);
        console.log('after fetch userInfo....', userInfo);
        console.log('finish getInfo....', getInfo());
        // getAddresses();
    }, []);
    useEffect(() => {
        setLoading(true);
        getInfo();
        getAddresses();

        setLoading(false);
    }, [userInfo]);
    useEffect(() => {
        setLoading(true);
        let index = userAddresses.findIndex((a) => a.id === getDefaultAddress().id);
        console.log('index: ', index);
        // getInfo();
        // getAddresses();
        setSelectedAddress(index);

        console.log('usserAddresses: ', userAddresses);

        setLoading(false);
    }, [userAddresses]);

    useEffect(() => {
        setLoading(true);
        // getInfo();
        // getAddresses();
        getSelectedAddress();
        setLoading(false);

        dispatch({type: ACTION_ADDR, payload: getSelectedAddress()})
    }, [selectedAddress]);

    const getSelectedAddress = (ADDRESS_FIELD) => {
        if (!userAddresses || userAddresses === undefined || selectedAddress === undefined)
            return undefined;
        if (!ADDRESS_FIELD) return { ...userAddresses[selectedAddress] };

        // console.log('getUserAddress: ', userAddresses[selectedAddress]);
        if (userAddresses[selectedAddress] === undefined) return '';
        // console.log(':  ', ADDRESS_FIELD.description);
        let { [ADDRESS_FIELD.description]: f } = userAddresses[selectedAddress];
        return f;
    };

    const getInputAddress = () => {

    }
    const getPayMethods = async () => {
        try {
            let methods = await (await fetchPaymentMethod()).data;
            setPayMethods((prev) => [...methods]);
        }catch(e) {
            console.log(e.message);;
        }
    };
    const getUserInfo = async () => {
        try {
            let user_info = await (await fetchUserInfo()).data;
            console.log('user info; ', user_info);
            // setUserInfo((prev) =>{ return {...prev,...user_info}} );
            setUserInfo(user_info);
        }catch(e) {
            console.log(e.message);
        }
       
    };
    const getInfo = () => {
        const { full_name: name, email, phone, addresses } = userInfo;

        return { name: name, email, phone, addresses };
    };

    const getAddresses = async () => {
        console.log(' inside getAddress...');
        const { addresses } = getInfo();
        console.log('userInfo addresses: ', addresses);
        // if(!addresses) return
        if (!addresses || addresses.length === 0) {
            console.log('set user iniit');

            const inital = [
                {
                    id: -1,
                    address_line: '',
                    district: '',
                    postal_id: '',
                    province: '',
                    wards: '',
                },
            ];
            setUserAddresses((prev) => {
                return [...inital];
            });
        } else {
            console.log('set when found');
            // let defaultAddress = addresses.filter( a => a.is_default)
            // console.log(defaultAddress[0].province);
            console.log('da: ', addresses);
            let sorted = addresses.sort((a, b) => (a.is_default ? -1 : 1));
            console.log('%csorted: ', 'color: red', sorted); // b - a for reverse sort

            setUserAddresses((prev) => {
                return addresses;
            });

            // return {...(defaultAddress[0])};
        }
    };

    function getDefaultAddress() {
        // console.log("userAddress: ", userAddresses);
        let defaultAddress = userAddresses.filter((a) => a.is_default);
        // console.log(defaultAddress[0]);
        return { ...defaultAddress[0] };
    }

    const methodOnChangeHandler = useCallback(({ target: { value } }) => {
        console.log('radio checked', value);
        // let value =  e.target.value;
        let selected = payMethods.findIndex((i) => i.id === value);
        console.log('selected: ', payMethods[selected]);
        setSelectedMethod((prev) => {
            return payMethods[selected];
        });

    });
    useEffect(() => {
        console.log('call dispatch');
        dispatch({type: ACTION_PAY, payload: selectedMethod});
    },[selectedMethod])

    const onChangeUsingAddressHandler = () => {
        console.log("other address failed");
        setOtherAddress(false);
    }
    const onChangeUsingOtherAddressHandler = () => {
        if(otherAddress) return 
      
        console.log("other address true");
        setOtherAddress(true);

    }
    
    useEffect(() => {
        console.log('otherAddress state: ', otherAddress);
        let key = otherAddress? [1] : [];
        setActiveKey(prev => key)
    },[otherAddress])

    return (
        <>
            {isLoading && <div>Loadding</div>}
            {!isLoading && (
                <section className="checkout-form">
                    <Row justify="center" className="form_row" gutter={[22, 22]}>
                        <Col span={22} className="form_col p-1">
                            <Form
                                className="checkout-form-f"
                                layout="vertical"
                                name="basic"
                                form={form}
                                //  initialValues={{ province: `${!getDefaultAddress().province? "dda" : ''}`}}
                            >
                                <h4>Phương thức thanh toán</h4>
                                <Form.Item name="payment" className="payment-form">
                                    <Radio.Group onChange={methodOnChangeHandler}>
                                        <Space wrap size={[5, 12]} style={{ width: '400px' }}>
                                            {payMethods.map((item, index) => {
                                                return (
                                                    <Radio key={index} value={item.id}>
                                                        {item.method}
                                                    </Radio>
                                                );
                                            })}
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>

                                {/* <div> */}
                                <Row className="form_row contact-info">
                                    <Col span={24} className="form_col checkout-form-user-info">
                                        <h4>Thông tin khách hàng</h4>
                                        <div  className="info-container">
                                           
                                                <div className='info-row'>
                                                    {/* <div> */}
                                                        <div>Họ tên: </div>
                                                        <div className='content' > {getInfo().name} </div>
                                                    {/* </div> */}
                                                </div>
                                                <div className='info-row'>
                                                    {/* <div> */}
                                                        <div>Email: </div>
                                                        <div className='content'> {getInfo().email} </div>
                                                    {/* </div> */}
                                                </div>
                                                  
                                               
                                        </div>

                                        <div  className="info-container">
                                           
                                        <div  className='info-row'>
                                                    {/* <div> */}
                                                        <div>Số điện thoại: </div>
                                                        <div className='content'> {getInfo().phone} </div>
                                                    {/* </div> */}
                                                </div>
                                               
                                        </div>
                                        <div  className="info-container">
                                           
                                           <div  className='info-row'>
                                           {getDefaultAddress().id === -1 && (
                                                <div>Địa chỉ khác</div>
                                            )}
                                        
                                            {getDefaultAddress().id >= 0 && (
                                                <Row className='default-area' align="middle" justify="space-around" >
                                                <Button className='default-btn' disabled={!otherAddress} onClick={onChangeUsingAddressHandler}>Sử dụng địa chỉ mặc định</Button>
                                                <Form.Item
                                                    {...{
                                                        labelCol: { span: 6 },
                                                        wrapperCol: {
                                                            span: 24,
                                                        },
                                                    }}
                                                    className="address-selected"
                                                    // label={`Địa chỉ giao hàng: ${
                                                    //     getDefaultAddress().id
                                                    // }`}
                                                    >
                                                  
                                                    <Radio.Group
                                                    disabled={otherAddress}
                                                        className="address-selected-radio-group"
                                                        value={selectedAddress}
                                                        onChange={(e) =>
                                                            setSelectedAddress((prev) => {
                                                                return e.target.value;
                                                            })
                                                        }>
                                                        {userAddresses.map((value, index) => (
                                                            <Radio.Button value={index}>
                                                                {`${
                                                                    value.is_default
                                                                        ? 'Mặc định'
                                                                        : `Địa chỉ ${index}`
                                                                }`}
                                                            </Radio.Button>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Row>
                                               
                                            )}
                                            </div>
                                           </div>
                                        
                                    
                                    </Col>
                                    {/* <Col span={6}>Phone:</Col>  */}
                                </Row>
                                <Row>
                                    <Col span={24} className="user-address">
                                        <h4>
                                           
                                            {getDefaultAddress().id === -1 && (
                                                <div>Địa chỉ khác</div>
                                            )}
                                        
                                            {/* {getDefaultAddress().id >= 0 && (
                                                <Row span={24} align="middle" justify="space-around" >
                                                <Button className='default-btn' disabled={!otherAddress} onClick={onChangeUsingAddressHandler}>Sử dụng địa chỉ mặc định</Button>
                                                <Form.Item
                                                    {...{
                                                        labelCol: { span: 6 },
                                                        wrapperCol: {
                                                            span: 24,
                                                        },
                                                    }}
                                                    className="address-selected"
                                                    // label={`Địa chỉ giao hàng: ${
                                                    //     getDefaultAddress().id
                                                    // }`}
                                                    >
                                                  
                                                    <Radio.Group
                                                    disabled={otherAddress}
                                                        className="address-selected-radio-group"
                                                        value={selectedAddress}
                                                        onChange={(e) =>
                                                            setSelectedAddress((prev) => {
                                                                return e.target.value;
                                                            })
                                                        }>
                                                        {userAddresses.map((value, index) => (
                                                            <Radio.Button value={index}>
                                                                {`${
                                                                    value.is_default
                                                                        ? 'Mặc định'
                                                                        : `Địa chỉ ${index}`
                                                                }`}
                                                            </Radio.Button>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>
                                                </Row>
                                               
                                            )} */}
                                        </h4>
                                        <div>
                                            {!isLoading && userAddresses !== undefined && (
                                                <>
                                                <Row><h4 style={{paddingBottom: ".5rem"}}>Địa chỉ giao hàng </h4></Row>
                                                <Row className="address-row" span={24}>
                                          
                                                    <Col className="icon" span={4}>
                                                        <AimOutlined
                                                            style={{
                                                                fontSize: '20px',
                                                            }}></AimOutlined>
                                                    </Col>
                                                    {!otherAddress && (
                                                        <Col
                                                            className="user-add-def-container"
                                                            span={20}>
                                                            <Row>
                                                                <Col className='address-field' span={12}>
                                                                <span className='title'> 
                                                                Tỉnh/Thành:{`  `}
                                                                </span>
                                                                 
                                                                    <span>
                                                                        {getSelectedAddress(
                                                                            PROVINCE,
                                                                        )}
                                                                    </span>
                                                                </Col>
                                                                <Col
                                                                className='address-field' >
                                                                  <span className='title'> 
                                                                  Quận/Huyện:{' '}
                                                                </span>
                                                                 
                                                                    <span>
                                                                        {getSelectedAddress(DISTR)}
                                                                    </span>
                                                                </Col>

                                                                <Col
                                                                className='address-field' >
                                                                 <span className='title'> 
                                                                 Địa chỉ:{' '}
                                                                </span>
                                                                 
                                                                 
                                                                    <span>
                                                                        {getSelectedAddress(LINE)},{' '}
                                                                        {getSelectedAddress(WARDS)}
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    )}
                                                    {otherAddress && (
                                                        <Col
                                                            className="other-add-container"
                                                            span={20}
                                                            style={{
                                                                backgroundColor: 'gold',
                                                            }}>
                                                            <Row>
                                                                <Col span={12}>
                                                                    Tỉnh/Thành:{' '}
                                                                    <span>
                                                                    {inputProvince}
                                                                        {/* {getSelectedAddress(
                                                                            PROVINCE,
                                                                        )} */}
                                                                    </span>
                                                                </Col>
                                                                <Col>
                                                                    Quận/Huyện:{' '}
                                                                    <span>
                                                                        {getSelectedAddress(DISTR)}
                                                                    </span>
                                                                </Col>

                                                                <Col>
                                                                    Địa chỉ:{' '}
                                                                    <span>
                                                                        {getSelectedAddress(LINE)},{' '}
                                                                        {getSelectedAddress(WARDS)}
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    )}
                                                </Row>
                                                </>
                                            )}
                                        </div>
                                    </Col>
                                </Row>

                                <></>
                                <Collapse collapsible={otherAddress? 'disabled' : 'header'}
       
                                 className='other-address-collapse'  onChange={onChangeUsingOtherAddressHandler} activeKey={activeKey}>
                                    <Panel  disable={true} showArrow={true} header={`Sử dụng địa chỉ khác ${otherAddress}`} key="1">
                                        <Form.Item name="input_province" label="Địa chỉ">
                                            <Input
                                                placeholder="Địa chỉ"
                                                style={{
                                                    width: '100%',
                                                    marginBottom: '0.5rem',
                                                }}
                                                value={''}
                                            />
                                        </Form.Item>
                                        <Row gutter={[16, 16]}>
                                            <Col span={8}>
                                                <Form.Item label="Tỉnh thành">
                                                    <Input
                                                        value={''}
                                                        placeholder="Tỉnh/Thành"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item label="Quận/Huyện">
                                                    <Input
                                                        placeholder="Quận/Huyện"
                                                        value={''}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item label="Phường/Xã">
                                                    <Input
                                                        placeholder="Phường/Xã"
                                                        value={''}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item label="Mã bưu cục">
                                                    <Input
                                                        placeholder="Zip code"
                                                        value={''}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>

                                {/* </div> */}
                            </Form>
                        </Col>

                        <Col className="discount-section" span={22}>
                            Mã giảm giá
                            <Space
                                style={{ marginLeft: '0.5rem', width: '80%' }}
                                direction="horizontal">
                                <Input style={{ width: '100%' }} placeholder="Nhập mã giảm giá" />
                                <Button style={{ width: 80 }}>Áp dụng</Button>
                            </Space>
                        </Col>
                    </Row>
                </section>
            )}
        </>
    );
};
export default memo(CheckoutForm);
