import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import {getProvince, getSearchProvince} from '../../services/addressService'


const AddressForm = () => {
    const optionForDropDown = [];
    const [provinceOptions,setProvinceOptions] = useState([]);
    const [inputSearch, setInputSearch] = useState([]);

    // const address = "hồ chí minh";
    const address = "Ja";
    useEffect(() => {
        getProvince().then(data => { 
            const options = data.map(e => {return {value: e.name, label : e.name}});
            console.log(options);
            setProvinceOptions(options);
           return options;
              // return optionForDropDown ;  
              })
      
              
    },[]);

    useEffect(() => {
        getSearchProvince(inputSearch).then(data => { 
            console.log(data);
            const options = data.map(e => {return {value: e.name, label : e.name}});
            console.log(options);
            setProvinceOptions(options);
           return options;
              // return optionForDropDown ;  
              })
      
              
    },[inputSearch]);

    const onChange = (value) => {

        console.log(`selected ${value}`);
        setInputSearch(prev => {return value})
      };
      const onSearch = (value) => {
        console.log('search:', value);
        // setInputSearch(prev => {return value})
      };
    
      const setSelectedValueHandler= () => {
        let input = address;
        const filter = provinceOptions.filter((select) =>  (select.label ?? '').toLowerCase().includes(input.toLowerCase()))
        console.log(filter[0]); 
        setInputSearch(filter.length >0? filter[0].value : '');
      }
    

    return (
    <React.Fragment>
        <Select
    value={inputSearch}
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    defaultValue={address}
   
    filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options= {provinceOptions}
    

  />
    </React.Fragment>
    );
}

export default AddressForm;