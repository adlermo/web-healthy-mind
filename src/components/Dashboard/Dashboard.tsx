import { Col, Layout, Row, Divider, Descriptions, Badge } from 'antd';
import { getUserRole } from 'src/services/Auth/service';
import SideMenu from '../SideMenu/SideMenu';
import {
  GridItem,
  PatientGridItem,
  ItemNumber,
  ItemTitle,
  LayoutBackground,
  PatientItemTitle,
} from './DashboardStyles';

const Dashboard: React.FC = () => {
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
          {userRole === 'patient' && (
            <LayoutBackground>
              <Row gutter={[0, 40]} wrap>
                <Col span={24}>
                  <PatientGridItem>
                    <PatientItemTitle>Titulo da sessao</PatientItemTitle>
                    <Divider />
                    <Descriptions layout="vertical" bordered>
                      <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                      </Descriptions.Item>
                    </Descriptions>
                  </PatientGridItem>
                </Col>
                <Col span={24}>
                  <PatientGridItem>
                    <PatientItemTitle>Titulo da sessao</PatientItemTitle>
                    <Divider />
                    <Descriptions layout="vertical" bordered>
                      <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                      </Descriptions.Item>
                    </Descriptions>
                  </PatientGridItem>
                </Col>
              </Row>
            </LayoutBackground>
          )}
          {userRole === 'professional' && (
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
