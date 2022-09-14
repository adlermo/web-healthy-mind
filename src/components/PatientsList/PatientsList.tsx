import React from 'react';
import { Layout, Typography, Input, Button, Table, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { usePatientsList } from 'src/services/Patient/hooks';
import { MainBox, UpperBox, BottomBox, EditDeletePatientButton } from './PatientsListStyles';
import SideMenu from '../SideMenu/SideMenu';

const PatientsList: React.FC = () => {
  const filterParams = { page: 1 };
  const { Footer } = Layout;
  const { Title } = Typography;
  const { Search } = Input;
  const { data } = usePatientsList(filterParams);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'birthDate',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Endereço',
      // dataIndex: 'address',
      // key: 'address',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <EditDeletePatientButton onClick={() => console.log(record)}>
            Editar
          </EditDeletePatientButton>
          <EditDeletePatientButton>Remover</EditDeletePatientButton>
        </Space>
      ),
    },
  ];

  const onSearch = (value: string) => console.log(value);

  return (
    <Layout>
      <SideMenu />
      <Layout>
        <MainBox>
          <UpperBox>
            <Title level={3}>Meus pacientes</Title>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              style={{
                width: `45%`,
              }}
            />
            <Button type="primary" href="/register-patient" icon={<PlusCircleOutlined />}>
              Novo paciente
            </Button>
          </UpperBox>
          <BottomBox>
            <Table
              dataSource={data}
              columns={columns}
              style={{
                width: `100%`,
              }}
            />
          </BottomBox>
        </MainBox>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          Mente Sã ©2020 Created by Dev4Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PatientsList;
