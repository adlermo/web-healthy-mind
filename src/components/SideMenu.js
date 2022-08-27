import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';

const SideMenu = () => {
  const { Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (item) => {
    if (item.key === '1') { navigate('/') }
    if (item.key === '2') { navigate('/patients') }
    if (item.key === '3') { navigate('/sessions') }
  };
 console.log(location.pathname)
  return (
    <Sider>
      <Title
        style={{
          color: 'white',
          fontSize: 28,
          margin: '15px'
        }}
      >
        Mente Sã
      </Title>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={location.pathname === '/' ? ['1'] : location.pathname === '/patients' ? ['2'] : location.pathname === '/sessions' ? ['3'] : ['']}
        onClick={clickHandler}
        items={[HomeOutlined, UserOutlined, CalendarOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: index === 0 ? 'Dashboard' : index === 1 ? 'Pacientes' : 'Sessões',
          }),
        )}
      />
    </Sider>
  );
};

export default SideMenu;