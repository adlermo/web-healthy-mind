import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Layout } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchCreateSession } from 'src/services/Session/service';
import SideMenu from '../SideMenu/SideMenu';
import { Welcome } from './FormSessionStyles';

const FormSession: React.FC = () => {
  const navigate = useNavigate();
  const { Footer } = Layout;
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('');
  const [comments, setComments] = useState('');

  const onFinish = (values: any) => {
    setPatientId('143c94da-e3e2-4958-ac5c-a44387da15f9');
    setStatus(values.status);
    setSubject(values.subject);
    setDuration(values.duration);
    setType(values.type);
    setComments(values.comments);

    if (status || subject || duration || type || comments) {
      mutateRegisterSession();
    }
  };

  const { mutate: mutateRegisterSession } = useMutation(
    () =>
      fetchCreateSession({
        patientId,
        status,
        subject,
        duration,
        type,
        comments,
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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
            <Welcome>Cadastro da sessão</Welcome>
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
            <Input />
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
            <Input />
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
            <Input />
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
            <Input />
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
            <Input />
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
          Mente Sã ©2020 Created by Dev4Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default FormSession;
