import SideMenu from '../SideMenu/SideMenu'
import { Layout, Row, Col } from 'antd'
import { LayoutBackground, GridItem, ItemTitle, ItemNumber } from './DashboardStyles'

const Dashboard: React.FC = () => {
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
          <LayoutBackground>
            <Row gutter={[20, 20]} wrap={true} >
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Sessões agendadas (dia)</ItemTitle>
                  <ItemNumber>5</ItemNumber>
                </GridItem>
              </Col>
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Sessões agendadas (mês)</ItemTitle>
                  <ItemNumber>15</ItemNumber>
                </GridItem>
              </Col>
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Sessões canceladas (mês)</ItemTitle>
                  <ItemNumber>1</ItemNumber>
                </GridItem>
              </Col>
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Total de pacientes cadastrados</ItemTitle>
                  <ItemNumber>61152</ItemNumber>
                </GridItem>
              </Col>
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Total de sessões (individuais)</ItemTitle>
                  <ItemNumber>5</ItemNumber>
                </GridItem>
              </Col>
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Total de sessões (dupla)</ItemTitle>
                  <ItemNumber>5</ItemNumber>
                </GridItem>
              </Col>
              <Col className='gutter-row'>
                <GridItem>
                  <ItemTitle>Total de sessões (grupo)</ItemTitle>
                  <ItemNumber>5</ItemNumber>
                </GridItem>
              </Col>
            </Row>
          </LayoutBackground>
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

export default Dashboard