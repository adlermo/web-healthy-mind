import React from 'react'
import { Layout, Row, Col } from 'antd'
import SideMenu from '../../components/SideMenu'
import './index.css'

const Main = () => {
  const { Content, Footer } = Layout

  return (
    <Layout>
      <SideMenu />
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
  )
}

export default Main