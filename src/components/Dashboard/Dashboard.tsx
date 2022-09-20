import { Col, Layout, Row, Divider, Descriptions, Badge } from 'antd';
import { getUserRole } from 'src/services/Auth/service';
import moment from 'moment';
// import { useSessionsList } from 'src/services/Session/hooks';
import SideMenu from '../SideMenu/SideMenu';
// import { ISessionParser } from 'src/services/Session/dtos/ISessionParser';
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
  // const filterParams = { page: 1 };
  // const { data: sessionsList } = useSessionsList(filterParams);
  const sessionsList = [
    {
      patientId: 1,
      status: 'Agendado',
      subject: 'Hipnose',
      duration: '01:00',
      type: 'Individual',
      comments: 'Agendamento de sessão 01',
      service: 'Remote',
      resourceId: 1,
      appointmentDate: '2023-08-10 16:00',
    },
    {
      patientId: 2,
      status: 'Cancelado',
      subject: 'Conflito',
      duration: '00:30',
      type: 'Casal',
      comments: 'Agendamento de sessão 02',
      service: 'Remote',
      resourceId: 1,
      appointmentDate: '2023-09-03 16:00',
    },
    {
      patientId: 3,
      status: 'Atendido',
      subject: 'Constelacao Familiar',
      duration: '02:00',
      type: 'Grupo',
      comments: 'Agendamento de sessão 03',
      service: 'Remote',
      resourceId: 1,
      appointmentDate: '2023-05-25 16:00',
    },
    {
      patientId: 4,
      status: 'Agendado',
      subject: 'Fobia',
      duration: '00:45',
      type: 'Individual',
      comments: 'Agendamento de sessão 04',
      service: 'Remote',
      resourceId: 1,
      appointmentDate: '2023-02-11 16:00',
    },
  ];
  // console.log(sessionsList);
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
                {sessionsList.map((session) => {
                  return (
                    <Col span={24} key={session.patientId}>
                      <PatientGridItem>
                        <Divider orientation="left" plain>
                          <PatientItemTitle>{session.subject}</PatientItemTitle>
                        </Divider>
                        <Descriptions layout="vertical" size="middle" bordered>
                          <Descriptions.Item
                            label="Data da sessão"
                            span={1}
                            style={{ marginBottom: 20 }}>
                            {moment(session.appointmentDate).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                          <Descriptions.Item label="Status" span={1}>
                            {session.status}
                          </Descriptions.Item>
                          <Descriptions.Item label="Duração da sessão" span={1}>
                            {session.duration}
                          </Descriptions.Item>
                          <Descriptions.Item label="Tipo de sessão" span={1}>
                            {session.type}
                          </Descriptions.Item>
                          <Descriptions.Item label="Tipo de serviço" span={1}>
                            {session.service}
                          </Descriptions.Item>
                          <Descriptions.Item label="Recurso" span={1}>
                            {session.resourceId}
                          </Descriptions.Item>
                          <Descriptions.Item label="Anotações complementares" span={3}>
                            {session.comments}
                          </Descriptions.Item>
                        </Descriptions>
                      </PatientGridItem>
                    </Col>
                  );
                })}
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
