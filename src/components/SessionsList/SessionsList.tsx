/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from 'src/services/queryClient';

import { Layout, Typography, Input, Button, Table, Space, Modal, message, Popover } from 'antd';
import { PlusCircleOutlined, FolderOpenFilled } from '@ant-design/icons';

import { useSessionsList } from 'src/services/Session/hooks';
import { fetchRemoveSession } from 'src/services/Session/service';
import { usePatientsList } from 'src/services/Patient/hooks';

import { ISessionParser } from 'src/services/Session/dtos/ISessionParser';
import FormEditSession from '../FormEditSession/FormEditSession';
import { MainBox, UpperBox, BottomBox, ModalText } from './SessionsListStyles';

import SideMenu from '../SideMenu/SideMenu';
import ViewSessionModal from '../Modals/ViewSession';

interface ISessionParserWithName extends ISessionParser {
  patientName: string;
}

const SessionsList: React.FC = () => {
  const filterParams = { page: 1 };
  const { Footer } = Layout;
  const { Title } = Typography;
  const { Search } = Input;
  const { data: sessionsList, isLoading } = useSessionsList(filterParams);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
    setOpen(true);
    setRemoveSessionId(record.id);
  };

  const { mutate: handleArchive } = useMutation(
    () => {
      setConfirmLoading(true); // Adding load to arqchive session
      return fetchRemoveSession({ sessionId: removeSessionId });
    },
    {
      onSuccess: () => {
        message.success('Arquivado com Sucesso');
        queryClient.invalidateQueries(['sessionList']);
        setConfirmLoading(false); // Adding load to arqchive session
        setOpen(false);
      },
      onError: (error: any) => {
        const errorMessage = error.response.data.message;
        message.error(`Erro ao arquivar sess??o - ${errorMessage}`);
        setOpen(false);
      },
    },
  );

  const handleCancel = () => {
    setOpen(false);
  };

  const onSearch = (value: string) => handleSearch(value);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'Status da sess??o',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'T??tulo',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Dura????o da sess??o',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Tipo da sess??o',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Anota????es',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'A????es',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Popover content="Ver dados da sess??o">
            <ViewSessionModal data={record} />
          </Popover>

          <Popover content="Editar sess??o">
            <FormEditSession session={record} />
          </Popover>

          <Popover content="Arquivar sess??o">
            <Button
              danger
              type="default"
              icon={<FolderOpenFilled />}
              onClick={() => showModal(record)}
            />
          </Popover>

          <Modal
            title="Arquivar a sess??o"
            open={open}
            onOk={() => handleArchive()}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}>
            <ModalText>Realmente deseja arquivar a sess??o?</ModalText>
          </Modal>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <MainBox>
          <UpperBox>
            <Title level={3}>Minhas sess??es</Title>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              style={{
                width: `45%`,
              }}
            />
            <Link to="/register-session">
              <Button type="primary" icon={<PlusCircleOutlined />}>
                Nova sess??o
              </Button>
            </Link>
          </UpperBox>
          <BottomBox>
            <Table
              loading={isLoading}
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 10 }}
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
          Mente S?? ??2022 Created by Dev4Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SessionsList;
