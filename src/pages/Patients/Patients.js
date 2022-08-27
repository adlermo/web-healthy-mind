import React from 'react';
import { CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, Typography } from 'antd';
import './Patients.css';
const { Footer, Sider } = Layout;
const { Title } = Typography;

const Patients = () => (
  <Layout>
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
        defaultSelectedKeys={['2']}
        items={[HomeOutlined, UserOutlined, CalendarOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: index === 0 ? 'Dashboard' : index === 1 ? 'Pacientes' : 'Sessões',
          }),
        )}
      />
    </Sider>
    <Layout>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Mente Sã ©2020 Created by Dev4Tech
      </Footer>
    </Layout>
  </Layout>
);

export default Patients;