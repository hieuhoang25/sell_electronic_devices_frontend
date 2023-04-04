import React, { memo, useState,useEffect} from 'react';
import { Button, Dropdown, Menu} from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE, CATEGORY } from '../../constants/index';



const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  export const getCategories = async() => {
    return  await axios({
        method: 'get',
        url: `${BASE}${CATEGORY}`,
    })
}
function CategoriesDropDown() {
    
const [categories, setCategories] = useState([]);
useEffect( () => {
     getCategories().then(res => {
        setCategories((prev) => res.data)
     }); 
},[])
console.log("CATEG: ", categories);
const MenuItems = categories.map((value, index) => {return {key: ''+ index,  label: ( <a href={`/${value.title}`}></a>)};})
  console.log("MENUITEM: ", MenuItems);

  const menuI = categories.map((value, index) => {
      return (
          <div className={'box'}>
              <Menu.Item key={index}>
              <Link to={`/product/${value.key}`} key={value.key}>
                            <div  key={index}>
                                <a
                                    // className="f_flex"
                                    // style={{ width: '100%' }}
                                    href="/category"
                                >
                                    <span>{value.title}</span>
                                </a>
                            </div>
                        </Link>
             
              
              </Menu.Item>
          </div>
      );
  });

  return (

      <>
        <Dropdown className='header-dropdown'
          overlay={
            <Menu  className={'category'}>
            {menuI}
              {/* <Menu.Item key="0">
                Menu Item One
              </Menu.Item>
              <Menu.Item key="1">
              Menu Item Two
              </Menu.Item>
              <Menu.Item key="1">
              Menu Item Three
              </Menu.Item> */}
            </Menu>
          }
          trigger={['hover','click']}>
         
          <Button style={{ marginBottom:"1rem"}} className="ant-dropdown-button" 
             >
            Danh mục sản phẩm
          </Button>
        </Dropdown>
      </>
  );
}
export default CategoriesDropDown