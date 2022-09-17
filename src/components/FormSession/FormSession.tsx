/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import moment from 'moment';
import type { DatePickerProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Input, message, Layout, DatePicker, Select, TimePicker } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchCreateSession, fetchEditSession } from 'src/services/Session/service';
import { usePatientsList } from 'src/services/Patient/hooks';
import { Welcome } from './FormSessionStyles';
import SideMenu from '../SideMenu/SideMenu';
import NewResourceModal from '../Modals/NewResource';

const FormSession: React.FC = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const currentPath = window.location.pathname;
  const { Footer } = Layout;
  const { Option } = Select;
  const { TextArea } = Input;
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');
  const [comments, setComments] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [resources, setResources] = useState(Array<string>);
  const formatDuration = 'HH:mm';
  const filterParams = { page: 1 };

  const { data } = usePatientsList(filterParams);

  const { mutate: mutateRegisterSession } = useMutation(
    () =>
      fetchCreateSession({
        patientId,
        status,
        subject,
        duration,
        type,
        comments,
        appointmentDate: moment(appointmentDate).toISOString(),
      }),
    {
      onSuccess: () => {
        message.success('Sessão registrada com Sucesso');
        navigate('/sessions');
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao registrar sessão - ${errorMessage}`);
      },
    },
  );

  const { mutate: mutateEditSession } = useMutation(
    () =>
      fetchEditSession({
        sessionId: location.state?.id.toString(),
        patientId,
        status,
        subject,
        duration,
        type,
        comments,
        appointmentDate: moment(appointmentDate).toISOString(),
      }),
    {
      onSuccess: () => {
        message.success('Sessão editada com Sucesso');
        navigate('/sessions');
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao editar a sessão - ${errorMessage}`);
      },
    },
  );

  const onFinish = (values: any) => {
    setSubject(values.subject);
    setDuration(values.duration);
    setComments(values.comments);

    if (currentPath === '/register-session' && (subject || duration || comments)) {
      mutateRegisterSession();
    }

    if (currentPath === '/edit-session' && (subject || duration || comments)) {
      mutateEditSession();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  const onDateChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setAppointmentDate(dateString);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handlePatientChange = (value: string) => {
    setPatientId(value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleResourcesChange = (value: string) => {
    setResources([...resources, value]);
  };

  return (
    <Layout>
      <SideMenu />
      <Layout>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Welcome>
              {currentPath === '/register-session' ? 'Cadastro da sessão' : 'Editar a sessão'}
            </Welcome>
          </Form.Item>

          <Form.Item
            label="Título"
            name="subject"
            rules={[
              {
                required: true,
                message: 'Insira o título da sessão',
              },
            ]}>
            <Input style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            label="Selecione o paciente"
            name="patientId"
            rules={[
              {
                required: true,
                message: 'Selecione o paciente',
              },
            ]}>
            <Select style={{ width: 300 }} onChange={handlePatientChange}>
              {data?.map((patient) => (
                <Option key={patient.id}>{patient.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Data da Sessão"
            name="appointmentDate"
            rules={[
              {
                required: true,
                message: 'Data da sessão',
              },
            ]}>
            <DatePicker onChange={onDateChange} style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
                message: 'Insira o status da sessão',
              },
            ]}>
            <Select style={{ width: 200 }} onChange={handleStatusChange}>
              <Option value="agendada">Agendada</Option>
              <Option value="finalizada">Finalizada</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Duração"
            name="duration"
            rules={[
              {
                required: true,
                message: 'Insira a duração da sessão',
              },
            ]}>
            <TimePicker format={formatDuration} style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            label="Tipo"
            name="type"
            rules={[
              {
                required: true,
                message: 'Insira o tipo da sessão',
              },
            ]}>
            <Select style={{ width: 200 }} onChange={handleTypeChange}>
              <Option value="individual">Individual</Option>
              <Option value="casal">Casal</Option>
              <Option value="grupo">Grupo</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Anotações"
            name="comments"
            rules={[
              {
                required: true,
                message: 'Anotações extras',
              },
            ]}>
            <TextArea rows={7} style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            label="Recursos"
            name="resources"
            rules={[
              {
                required: false,
                message: 'Selecione os recursos',
              },
            ]}>
            <Select
              mode="tags"
              defaultValue="nenhum"
              style={{ width: 200 }}
              onChange={handleResourcesChange}>
              <Option value="nenhum">Nenhum</Option>
              {/* TODO: map resources from db */}
            </Select>
            <NewResourceModal />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Button
              type="default"
              href="/sessions"
              style={{
                marginRight: 30,
              }}>
              Cancelar
            </Button>

            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
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

export default FormSession;
