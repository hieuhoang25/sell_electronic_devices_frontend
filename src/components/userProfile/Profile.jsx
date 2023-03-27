import PersonalInfo from './personal/PersonalInfo';
import React, { memo } from 'react';
import { Tabs } from 'antd';
import Photo from './personal/Avatar';
import MyPurchase from './myPurchase/MyPurchase';
import ChangePassword from './personal/ChangePassword';
import FavoriteProduct from './personal/FavoriteProduct';
import Address from './personal/Address';
import './Profile.css';
const Profile = () => {
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //   dispatch(fetchInfoUer)
    // },[dispatch])
    const items = [
        {
            key: '1',
            label: (
                <div>
                    <div>
                        <div style={{ width: '155%' }}>
                            <Photo />
                            <div>NhatPhu00</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Thông tin cá nhân',
            children: <PersonalInfo />,
        },
        {
            key: '3',
            label: 'Đơn mua',
            children: <MyPurchase />,
        },
        {
            key: '4',
            label: 'Địa chỉ',
            children: <Address />,
        },
        {
            key: '5',
            label: 'Yêu thích',
            children: <FavoriteProduct />,
        },
        {
            key: '6',
            label: 'Đổi mật khẩu',
            children: <ChangePassword />,
        },
    ];
    return (
        <>
            <Tabs defaultActiveKey="2" tabPosition="left" items={items} />
        </>
    );
};
export default memo(Profile);
