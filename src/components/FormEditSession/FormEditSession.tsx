/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, message, Modal, TimePicker } from 'antd';

import React, { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { fetchEditSession } from 'src/services/Session/service';

import moment from 'moment';

import { useListResources } from 'src/services/Resource/hooks';
import { usePatientsList } from 'src/services/Patient/hooks';
import { ISessionParser } from 'src/services/Session/dtos/ISessionParser';
import { queryClient } from 'src/services/queryClient';
import NewResourceModal from '../Modals/NewResource';

const FormEditSession: React.FC<{ session: ISessionParser }> = ({ session }) => {
  const [edit, setEdit] = useState(false);
  const [data_, setData] = useState(Object);

  const { Option } = Select;
  const { TextArea } = Input;
  const formatDuration = 'HH:mm';
  const filterParams = { page: 1 };

  const { data: patientsList } = usePatientsList(filterParams);
  const { data: resourcesList, refetch } = useListResources();

  useEffect(() => {
    setData(session);
  }, [session]);

  const { mutate: mutateEditSession } = useMutation(
    (values: any) =>
      fetchEditSession({
        sessionId: data_.id,
        patientId: values.patientId,
        status: values.status,
        subject: values.subject,
        duration: moment(values.duration).format('HH:mm'),
        type: values.type,
        service: values.service,
        resourceId: values.resourceId,
        comments: values.comments,
        appointmentDate: moment(values.appointmentDate).format('YYYY-MM-DD HH:mm'),
      }),
    {
      onSuccess: () => {
        message.success('Sessão alterada com Sucesso');
        queryClient.invalidateQueries(['sessionList']);
        setEdit(false);
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao editar a sessão - ${errorMessage}`);
      },
    },
  );

  const onFinish = (values: any) => {
    mutateEditSession(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(`Error ao editar a sessão - ${errorInfo}`);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setEdit(true)} icon={<EditOutlined />} />
      <Modal
        title={`Editar Sessão: ${data_?.patientName} - ${data_?.subject}`}
        footer={null} // Removing default footer
        open={edit}
        onCancel={cancelEdit}>
        <Form
          fields={[
            {
              name: ['subject'],
              value: data_.subject,
            },
            {
              name: ['patientId'],
              value: data_.patientId,
            },
            {
              name: ['appointmentDate'],
              value: moment(data_.appointmentDate),
            },
            {
              name: ['status'],
              value: data_.status,
            },
            {
              name: ['type'],
              value: data_.type,
            },
            {
              name: ['service'],
              value: data_.service,
            },
            {
              name: ['comments'],
              value: data_.comments,
            },
            {
              name: ['resources'],
              value: data_.resource,
            },
          ]}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Título"
            name="subject"
            rules={[
              {
                required: true,
                message: 'Insira o título da sessão',
              },
            ]}>
            <Input
              onChange={(e) => {
                data_.subject = e.target.value;
              }}
            />
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
            <Select style={{ width: 300 }}>
              {patientsList?.map((patient: any) => (
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
            <Select style={{ width: 200 }}>
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
            <TimePicker
              placeholder={data_.duration}
              format={formatDuration}
              style={{ width: 200 }}
            />
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
            <Select style={{ width: 200 }}>
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
            <Select style={{ width: 200 }}>
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
            <TextArea
              rows={7}
              style={{ width: 300 }}
              onChange={(e) => {
                data_.subject = e.target.value;
              }}
            />
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
            <Select style={{ width: 200 }}>
              {resourcesList?.map((resource: any) => (
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
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormEditSession;
