/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import moment from 'moment';

import type { DatePickerProps } from 'antd';
import { Button, Form, Input, message, Layout, DatePicker, Select, TimePicker } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchCreateSession } from 'src/services/Session/service';
import { usePatientsList } from 'src/services/Patient/hooks';
import { useListResources } from 'src/services/Resource/hooks';
import { Welcome } from './FormSessionStyles';
import SideMenu from '../SideMenu/SideMenu';
import NewResourceModal from '../Modals/NewResource';

const FormSession: React.FC = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const { Footer } = Layout;
  const { Option } = Select;
  const { TextArea } = Input;
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [service, setService] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [resourceId, setResourceId] = useState('');
  const formatDuration = 'HH:mm';
  const filterParams = { page: 1 };

  const { data } = usePatientsList(filterParams);
  const { data: resourcesList, refetch } = useListResources();

  const { mutate: mutateRegisterSession } = useMutation(
    (values: any) =>
      fetchCreateSession({
        patientId,
        status,
        subject: values.subject,
        duration: moment(values.duration).format('HH:mm'),
        type,
        service,
        resourceId,
        comments: values.comments,
        appointmentDate: moment(appointmentDate).format('YYYY-MM-DD HH:mm'),
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

  const onFinish = (values: any) => {
    mutateRegisterSession(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(`Erro - ${errorInfo}`);
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

  const handleServiceChange = (value: string) => {
    setService(value);
  };

  const handleResourcesChange = (value: string) => {
    setResourceId(value);
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
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              disabledDate={(curr) => curr && curr < moment().endOf('day')}
              onChange={onDateChange}
              style={{ width: 200 }}
            />
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
              <Option value="cancelada">Cancelada</Option>
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
              <Option value="dupla">Casal</Option>
              <Option value="grupo">Grupo</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Serviço"
            name="service"
            rules={[
              {
                required: true,
                message: 'Insira a categoria de serviço',
              },
            ]}>
            <Select style={{ width: 200 }} onChange={handleServiceChange}>
              <Option value="remote">Remoto</Option>
              <Option value="presential">Presencial</Option>
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
            <Select style={{ width: 200 }} onChange={handleResourcesChange}>
              {resourcesList?.map((resource) => (
                <Option value={resource.id} key={resource.id}>
                  {resource.title}
                </Option>
              ))}
            </Select>
            <NewResourceModal callback={refetch} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Link to="/sessions">
              <Button
                type="default"
                style={{
                  marginRight: 30,
                }}>
                Cancelar
              </Button>
            </Link>

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
