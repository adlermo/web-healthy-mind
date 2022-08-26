import React from 'react';
import { CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css';
const { Header, Content, Footer, Sider } = Layout;

const Main = () => (
  <Layout>
    <Sider>
      <h1 className="company">Mente Sã</h1>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[HomeOutlined, UserOutlined, CalendarOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: index === 0 ? 'Dashboard' : index === 1 ? 'Pacientes' : 'Sessões',
          }),
        )}
      />
      {/* <Menu>
        <Menu.Item>item 1</Menu.Item>
      </Menu> */}
    </Sider>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{
          padding: 0,
        }}
      />
      <Content
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          content
        </div>
      </Content>
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

export default Main;