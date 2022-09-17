/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { Layout, Typography, Input, Button, Table, Space } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { PlusCircleOutlined, EditOutlined, FolderOutlined } from '@ant-design/icons';

import { useDeletePatient, usePatientsList } from 'src/services/Patient/hooks';
import { fetchDeletePatient } from 'src/services/Patient/service';

import { IPatientParser } from 'src/services/Patient/dtos/IPatientParser';

import { ActionBox } from '../SessionsList/SessionsListStyles';
import { MainBox, UpperBox, BottomBox } from './PatientsListStyles';

import SideMenu from '../SideMenu/SideMenu';

interface IPatient {
  id: string;
  userId: string;
}

const PatientsList: React.FC = () => {
  const filterParams = { page: 1 };
  const { Footer } = Layout;
  const { Title } = Typography;
  const { Search } = Input;
  const { data: patientsList, isLoading } = usePatientsList(filterParams);

  const [data, setData] = useState<IPatientParser[]>([]);

  useEffect(() => patientsList && setData(patientsList), [patientsList]);

  const handleArchive = (value: IPatient, e: any) => {
    const { id: patientId, userId: workerId } = value;
    // console.log(e.target.innerText); // Getting button description
    fetchDeletePatient({ patientId, workerId })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        },
      )
      .catch();
  };

  const handleEdit = (value: IPatient, e: any) => {
    // e.preventDefault();
    console.log(value);
    console.log(e.target.innerText);
  };

  const handleSearch = (value: string) => {
    setData(
      (patientsList as IPatientParser[]).filter(
        (item) => item.name.includes(value) || item.email.includes(value),
      ),
    );
  };

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
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <ActionBox>
            <Button
              type="primary"
              onClick={(e) => {
                handleEdit(record, e);
              }}
              icon={<EditOutlined />}
              style={{ marginBottom: 5 }}>
              Editar
            </Button>
            <Button
              type="primary"
              onClick={(e) => {
                handleArchive(record, e);
              }}
              icon={<FolderOutlined />}
              style={{ marginTop: 5 }}>
              Arquivar
            </Button>
          </ActionBox>
        </Space>
      ),
    },
  ];

  const onSearch = (value: string) => handleSearch(value);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <Content>
          <MainBox>
            <UpperBox>
              <Title level={3}>Meus pacientes</Title>
              <Search
                placeholder="Nome ou email"
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
                loading={isLoading}
                columns={columns}
                style={{
                  width: `100%`,
                }}
              />
            </BottomBox>
          </MainBox>
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

export default PatientsList;
