import PersonalInfo from './personal/PersonalInfo';
import React, { memo } from 'react';
import { Tabs } from 'antd';
import Photo from './personal/Avatar';
import MyPurchase from './myPurchase/MyPurchase';
import ChangePassword from './personal/ChangePassword';
import FavoriteProduct from './personal/FavoriteProduct';
import Address from './personal/Address';

import { useLocation } from 'react-router-dom';
import './Profile.css';
const Profile = () => {
    // const dispatch = useDispatch();
    // useEffect(()=>{
    //   dispatch(fetchInfoUer)
    // },[dispatch])
    const location = useLocation();
    let profileId = '2';
    if (location.state) {
        profileId = location.state.profileId;
    }

    // alert(profileId);
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
            <Tabs
                defaultActiveKey={!profileId ? '2' : profileId}
                tabPosition="left"
                items={items}
            />
        </>
    );
};
export default memo(Profile);
