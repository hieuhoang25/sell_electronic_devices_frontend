import { DownOutlined } from '@ant-design/icons';
import { Button, Tree } from 'antd';
import React, { memo } from 'react';
const Category = ({ treeData, onSelectCategory }) => {
    return (
        <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelectCategory}
            treeData={treeData}
        />
    );
};

export default memo(Category);
