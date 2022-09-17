import { CalendarOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Image, Layout, Menu, Typography } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated } from 'src/services/Auth/service';
import { LogoTitle } from './SideMenuStyles';

const SideMenu: React.FC = () => {
  const { Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (item: { key: string }) => {
    if (item.key === '1') {
      navigate('/');
    }
    if (item.key === '2') {
      navigate('/patients');
    }
    if (item.key === '3') {
      navigate('/sessions');
    }
  };

  const returnDefaultSelectedKeys = (): string[] | undefined => {
    if (location.pathname === '/') return ['1'];
    if (location.pathname === '/patients') return ['2'];
    if (location.pathname === '/sessions') return ['3'];

    return [''];
  };

  const indexToName = (index: number) => {
    if (index === 0) return 'Dashboard';
    if (index === 1) return 'Pacientes';

    return 'Sessões';
  };

  return (
    <Sider>
      <>
        <LogoTitle>
          <Image
            width={100}
            src="mente-sa-logo.png"
            style={{
              marginTop: '20px',
            }}
          />
          {/* <img src="public/mente-sa-logo.png" alt="Mente Sã logo"></img> */}
          <Title
            style={{
              color: 'white',
              fontSize: 28,
              margin: '15px',
            }}>
            Mente Sã
          </Title>
        </LogoTitle>
        {isAuthenticated() && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={returnDefaultSelectedKeys()}
            onClick={clickHandler}
            items={[HomeOutlined, UserOutlined, CalendarOutlined].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: indexToName(index),
            }))}
          />
        )}
      </>
    </Sider>
  );
};

export default SideMenu;
