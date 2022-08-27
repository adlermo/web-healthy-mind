import React from 'react';
import { CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, Row, Col, Typography } from 'antd';
import './index.css';
const { Content, Footer, Sider } = Layout;
const { Title } = Typography;

const Main = () => (
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
        defaultSelectedKeys={['1']}
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
      <Content
        style={{
          margin: '25px 20px',
        }}
      >
        <div
          className='site-layout-background'
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
            <Row gutter={[20, 20]} wrap={true} >
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Sessões agendadas (dia)</span>
                        <span className='item-number'>5</span>
                    </div>
                </Col>
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Sessões agendadas (mês)</span>
                        <span className='item-number'>15</span>
                    </div>
                </Col>
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Sessões canceladas (mês)</span>
                        <span className='item-number'>1</span>
                    </div>
                </Col>
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Total de pacientes cadastrados</span>
                        <span className='item-number'>61152</span>
                    </div>
                </Col>
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Total de sessões (individuais)</span>
                        <span className='item-number'>5</span>
                    </div>
                </Col>
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Total de sessões (dupla)</span>
                        <span className='item-number'>5</span>
                    </div>
                </Col>
                <Col className='gutter-row'>
                    <div className='grid-item'>
                        <span className='item-title'>Total de sessões (grupo)</span>
                        <span className='item-number'>5</span>
                    </div>
                </Col>
            </Row>
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