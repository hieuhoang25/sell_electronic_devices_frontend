import { Button, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginPromptNotification = () => {
    const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <button className={"btn-primary w-100"} onClick={showModal}>
        Thanh toán
      </button>
      <Modal
        open={open}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
        //   <Button key="back" onClick={handleCancel}>
        //     Return
        //   </Button>,
        //   <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
        //     Submit
        //   </Button>,
        //   <Button
        //     key="link"
        //     href="https://google.com"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Search on Google
        //   </Button>,
        ]}
      >
        <div>
            <div>
                <h2>Đăng nhập để tiếp tục mua sắm</h2>
                <Button onClick={() => {navigate('/login')}}>Đến trang đăng nhập</Button>
            </div>
           <div>
            <h4>Chưa có tài khoản: 
           
            {/* <Button type="link"  href="#">Đăng ký tài khoản</Button> */}
           </h4> 
           <Button size={"large"}>Đăng ký </Button>
           </div>
        </div>
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Modal>
    </>
  );
};
export default  LoginPromptNotification;