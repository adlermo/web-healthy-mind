import { Col, Layout, Row } from 'antd';
import { getUserRole } from 'src/services/Auth/service';
import SideMenu from '../SideMenu/SideMenu';
import { GridItem, ItemNumber, ItemTitle, LayoutBackground } from './DashboardStyles';

const Dashboard: React.FC = () => {
  const currentPath = window.location.pathname;
  const { Content, Footer } = Layout;
  const userRole = getUserRole();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <Content
          style={{
            margin: '25px 20px',
          }}>
          {userRole !== 'patient' && (
            <LayoutBackground>
              <Row gutter={[20, 20]} wrap>
                <Col>
                  <GridItem>
                    <ItemTitle>Sessões agendadas (dia)</ItemTitle>
                    <ItemNumber>5</ItemNumber>
                  </GridItem>
                </Col>
                <Col>
                  <GridItem>
                    <ItemTitle>Sessões agendadas (mês)</ItemTitle>
                    <ItemNumber>15</ItemNumber>
                  </GridItem>
                </Col>
                <Col>
                  <GridItem>
                    <ItemTitle>Sessões canceladas (mês)</ItemTitle>
                    <ItemNumber>1</ItemNumber>
                  </GridItem>
                </Col>
                <Col>
                  <GridItem>
                    <ItemTitle>Total de pacientes cadastrados</ItemTitle>
                    <ItemNumber>61152</ItemNumber>
                  </GridItem>
                </Col>
                <Col>
                  <GridItem>
                    <ItemTitle>Total de sessões (individuais)</ItemTitle>
                    <ItemNumber>5</ItemNumber>
                  </GridItem>
                </Col>
                <Col>
                  <GridItem>
                    <ItemTitle>Total de sessões (dupla)</ItemTitle>
                    <ItemNumber>5</ItemNumber>
                  </GridItem>
                </Col>
                <Col>
                  <GridItem>
                    <ItemTitle>Total de sessões (grupo)</ItemTitle>
                    <ItemNumber>5</ItemNumber>
                  </GridItem>
                </Col>
              </Row>
            </LayoutBackground>
          )}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          Mente Sã ©2022 Created by Dev4Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
