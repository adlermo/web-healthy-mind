/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Typography, Input, Button, Table, Space, Modal, message, Popover } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { PlusCircleOutlined, EditOutlined, EyeOutlined, FolderOpenFilled } from '@ant-design/icons';

import { usePatientsList } from 'src/services/Patient/hooks';
import { fetchDeletePatient } from 'src/services/Patient/service';

import { IPatientParser } from 'src/services/Patient/dtos/IPatientParser';

import { MainBox, UpperBox, BottomBox, ModalText } from './PatientsListStyles';

import SideMenu from '../SideMenu/SideMenu';
import ViewPatient from '../ViewPatient/ViewPatient';
import FormPatient from '../FormPatient/FormPatient';
import FormEditPatient from '../FormEditPatient/FormEditPatient';

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
  const [archive, setArchive] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Realmente deseja arquivar este paciente?');
  const [removePatientId, setRemovePatientId] = useState('');
  const [viewPatient, setViewPatient] = useState(Object);
  const [editPatient, setEditPatient] = useState(Object);

  const showModal = (value: IPatient) => {
    setRemovePatientId(value.id);
    setArchive(true);
  };

  const showEdit = (value: any) => {
    console.log(value);
    setEditPatient(value);
    setEdit(true);
  };

  const showPatient = (value: any) => {
    setViewPatient(value);
    setView(true);
  };

  const cancelView = () => {
    setView(false);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const [data, setData] = useState<IPatientParser[]>([]);

  useEffect(() => patientsList && setData(patientsList), [patientsList]);

  const confirmArchive = () => {
    setModalText('Arquivando o paciente');
    setConfirmLoading(true);

    fetchDeletePatient({
      patientId: removePatientId,
    })
      .then(() => {
        message.success('Arquivado com Sucesso');
        setData(data.filter((p) => p.id !== removePatientId));
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        message.error(`Erro ao arquivar o paciente - ${errorMessage}`);
      })
      .finally(() => {
        setArchive(false);
        setConfirmLoading(false);
      });
  };

  const cancelArchive = () => {
    setArchive(false);
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
        <Space>
          <Popover content="Ver dados do paciente">
            <Button type="default" onClick={() => showPatient(record)} icon={<EyeOutlined />} />
          </Popover>

          <Popover content="Editar o paciente">
            <Button type="primary" onClick={() => showEdit(record)} icon={<EditOutlined />} />
          </Popover>

          <Popover content="Arquivar paciente">
            <Button
              danger
              type="default"
              onClick={() => showModal(record)}
              icon={<FolderOpenFilled />}
            />
          </Popover>

          <Modal
            title={`Histórico Clínico de Paciente: ${viewPatient.name}`}
            footer={null} // Removing default footer
            width={700}
            open={view}
            onCancel={cancelView}>
            <ViewPatient id={viewPatient.id} />
          </Modal>

          <Modal
            title={`Editar Paciente: ${editPatient.name}`}
            footer={null} // Removing default footer
            width={700}
            open={edit}
            onCancel={cancelEdit}>
            <FormEditPatient
              id={editPatient.id}
              // name={editPatient.name}
              // email={editPatient.email}
              // document={editPatient.document}
              // gender={editPatient.gender}
              // birthDate={editPatient.birthDate}
              // phone={editPatient.phone}
            />
          </Modal>

          <Modal
            title="Arquivar o paciente"
            open={archive}
            onOk={confirmArchive}
            confirmLoading={confirmLoading}
            onCancel={cancelArchive}>
            <ModalText>{modalText}</ModalText>
          </Modal>
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
              <Link to="/register-patient">
                <Button type="primary" icon={<PlusCircleOutlined />}>
                  Novo paciente
                </Button>
              </Link>
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
