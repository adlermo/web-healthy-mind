/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Input, Button, Table, Space, Modal, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSessionsList } from 'src/services/Session/hooks';
import { fetchRemoveSession } from 'src/services/Session/service';
import { ISessionParser } from 'src/services/Session/dtos/ISessionParser';
import { usePatientsList } from 'src/services/Patient/hooks';
import { MainBox, UpperBox, BottomBox, ActionBox, ModalText } from './SessionsListStyles';
import SideMenu from '../SideMenu/SideMenu';

interface ISessionParserWithName extends ISessionParser {
  patientName: string;
}

const SessionsList: React.FC = () => {
  const navigate = useNavigate();
  const filterParams = { page: 1 };
  const { Footer } = Layout;
  const { Title } = Typography;
  const { Search } = Input;
  const { data: sessionsList, isLoading } = useSessionsList(filterParams);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Realmente deseja arquivar a sessão?');
  const [removeSessionId, setRemoveSessionId] = useState('');

  const { data: pacientsList } = usePatientsList(filterParams);

  const traverseData = useCallback(
    () =>
      (sessionsList as ISessionParser[]).map((session) => {
        const patientName = pacientsList?.find((patient) => patient.id === session.patientId)?.name;
        return { patientName, ...session };
      }),
    [pacientsList, sessionsList],
  );

  const [data, setData] = useState<ISessionParserWithName[]>([]);

  useEffect(
    () => sessionsList && setData(traverseData() as ISessionParserWithName[]),
    [sessionsList, traverseData],
  );

  const handleSearch = (value: string) => {
    setData(
      (traverseData() as ISessionParserWithName[]).filter(
        (item) => item.subject.includes(value) || item.patientName.includes(value),
      ),
    );
  };

  const showModal = (record: any) => {
    setRemoveSessionId(record.id);
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Arquivando a sessão');

    fetchRemoveSession({
      sessionId: removeSessionId,
    })
      .then(() => {
        message.success('Arquivado com Sucesso');
      })
      .catch((error) => {
        const errorMessage = error.response.data.message;
        message.error(`Erro ao arquivar sessão - ${errorMessage}`);
      });

    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1500);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onEditHandler = (record: any) => {
    navigate('/edit-session', { state: record });
  };

  const onSearch = (value: string) => handleSearch(value);

  const columns = [
    {
      title: 'Id do paciente',
      dataIndex: 'patientId',
      key: 'patientId',
    },
    {
      title: 'Nome',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'Status da sessão',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Título',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Duração da sessão',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Tipo da sessão',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Anotações',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <ActionBox>
            <Button
              type="primary"
              href="/edit-session"
              icon={<EditOutlined />}
              style={{ marginBottom: 15 }}
              onClick={() => onEditHandler(record)}>
              Editar
            </Button>
            <Button type="primary" icon={<DeleteOutlined />} onClick={() => showModal(record)}>
              Arquivar
            </Button>
            <Modal
              title="Arquivar a sessão"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}>
              <ModalText>{modalText}</ModalText>
            </Modal>
          </ActionBox>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <SideMenu />
      <Layout>
        <MainBox>
          <UpperBox>
            <Title level={3}>Minhas sessões</Title>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              style={{
                width: `45%`,
              }}
            />
            <Button type="primary" href="/register-session" icon={<PlusCircleOutlined />}>
              Nova sessão
            </Button>
          </UpperBox>
          <BottomBox>
            <Table
              loading={isLoading}
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
          Mente Sã ©2022 Created by Dev4Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SessionsList;
