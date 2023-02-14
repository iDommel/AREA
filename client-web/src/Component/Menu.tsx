import React, { useState } from 'react';
import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Home', '1' ,<HomeOutlined /> ),
  getItem('Worklows', 'sub1', <AppstoreOutlined />, [
    getItem('Create Workflow', '2'),
    getItem('Workflow 1', '3'),
    getItem('Workflow 2', '4'),
  ]),
  getItem('Services', 'sub2', <SettingOutlined />, [
    getItem('Spotify', '5'),
    getItem('Timer', '6'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2'];

const MenuPage: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const navigate = useNavigate();

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleSelect = (e: any) => {
    if (e.key === '1') {
        navigate('/home');
    } else if (e.key === '2') {
        navigate('/Workflow');
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onSelect={(info) => handleSelect(info)}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
      className="Menu"
    />
  );
};


export default MenuPage;