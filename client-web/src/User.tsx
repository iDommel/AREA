import "./App.css";
import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Se déconnecter',
    key: '1',
    icon: <LogoutOutlined />,
  }
];

const User: React.FC = () => {
  const navigate = useNavigate();
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      navigate('/');
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
  <div className="user">
    <Dropdown menu={menuProps} trigger={['click']} className="buttonUser">
      <Button>
        <Space>
          User
        </Space>
      </Button>
    </Dropdown>
  </div>
  )
};

export default User;