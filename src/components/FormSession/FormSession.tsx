import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SideMenu from '../SideMenu/SideMenu';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Form, Input, message, Layout } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchCreateSession } from 'src/services/Session/service';
import { getCurrentWorkerId } from 'src/services/Auth/service';
import { Welcome } from './FormSessionStyles';

const FormSession: React.FC = () => {
  const navigate = useNavigate();
  const currentWorkerId = getCurrentWorkerId();
  const { Footer } = Layout;
  const { TextArea } = Input;
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionDescription, setSessionDescription] = useState('');

  const onFinish = (values: any) => {
    setPatientId('33')
    setPatientName(values.patientName);
    setSessionDate(values.sessionDate);
    setSessionDescription(values.sessionDescription);

    if (patientId && patientName && sessionDate ) {
      mutateRegisterSession();
    }
  };

  const { mutate: mutateRegisterSession } = useMutation(
    () =>
      fetchCreateSession({
        workerId: currentWorkerId && JSON.parse(currentWorkerId),
        patientId: patientId,
        patientName: patientName,
        sessionDate: sessionDate,
        sessionDescription: sessionDescription ? sessionDescription : ''
      }),
    {
      onSuccess: () => {
        message.success('Paciente registrado com Sucesso')
        navigate('/dashboard')
      },
      onError:(msg)=>{
        message.error(`Error ao registrar paciente - ${msg}`)
      }
    },
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    // setPatientBirthDate(dateString);
  };

  return (
    <>
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
            autoComplete="off"
          >
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Welcome>Cadastro da sessão</Welcome>
            </Form.Item>
            <Form.Item
              label="Nome do paciente"
              name="patientName"
              rules={[
                {
                  required: true,
                  message: 'Nome do paciente',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Data do agendamento"
              name="sessionDate"
              rules={[
                {
                  required: true,
                  message: 'Data de nascimento do paciente',
                },
              ]}
            >
              <DatePicker onChange={onChange}/>
            </Form.Item>

            <Form.Item
              label="Descrição da sessão"
              name="sessionDescription"
              rules={[
                {
                  required: true,
                  message: 'Endereço do paciente',
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Button
                type="default"
                href='/dashboard'
                style={{
                  marginRight: 30,
                }}
              >
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
            }}
          >
            Mente Sã ©2020 Created by Dev4Tech
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default FormSession;