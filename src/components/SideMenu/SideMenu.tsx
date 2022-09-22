import { CalendarOutlined, HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Image, Layout, Menu, Typography } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from 'src/services/Auth/service';
import { LogoTitle } from './SideMenuStyles';

const SideMenu: React.FC = () => {
  const { Sider } = Layout;
  const { Title } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = getUserRole();
  const isProfessionalAuthenticated = isAuthenticated() && userRole === '2';
  const isPatientAuthenticated = isAuthenticated() && userRole === '3';

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
    if (item.key === '4') {
      logout();
      navigate('/');
    }
  };

  const patientClickHandler = (item: { key: string }) => {
    if (item.key === '1') {
      navigate('/dashboard');
    }
    if (item.key === '2') {
      logout();
      navigate('/');
    }
  };

  const returnDefaultSelectedKeys = (): string[] | undefined => {
    if (location.pathname === '/') return ['1'];
    if (location.pathname === '/patients') return ['2'];
    if (location.pathname === '/sessions') return ['3'];

    return [''];
  };

  const returnPatientDefaultSelectedKeys = (): string[] | undefined => {
    if (userRole === '3') return ['1'];

    return [''];
  };

  const indexToName = (index: number) => {
    if (index === 0) return 'Dashboard';
    if (index === 1) return 'Pacientes';
    if (index === 2) return 'Sessões';

    return 'Logout';
  };

  const indexToPatientName = (index: number) => {
    if (index === 0) return 'Minhas sessões';
    return 'Logout';
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
          <Title
            style={{
              color: 'white',
              fontSize: 28,
              margin: '15px',
            }}>
            Mente Sã
          </Title>
        </LogoTitle>
        {isPatientAuthenticated && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={returnPatientDefaultSelectedKeys()}
            onClick={patientClickHandler}
            items={[CalendarOutlined, LogoutOutlined].map((icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: indexToPatientName(index),
            }))}
          />
        )}
        {isProfessionalAuthenticated && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={returnDefaultSelectedKeys()}
            onClick={clickHandler}
            items={[HomeOutlined, UserOutlined, CalendarOutlined, LogoutOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: indexToName(index),
              }),
            )}
          />
        )}
      </>
    </Sider>
  );
};

export default SideMenu;
