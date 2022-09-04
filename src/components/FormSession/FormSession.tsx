import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SideMenu from '../SideMenu/SideMenu';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Form, Input, message, Layout } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchRegisterPatient } from 'src/services/Patient/service';
import { getCurrentWorkerId, getCurrentSwordfish } from 'src/services/Auth/service';
import { Welcome } from './FormSessionStyles';

const FormSession: React.FC = () => {
  const navigate = useNavigate();
  const currentWorkerId = getCurrentWorkerId();
  const currentSwordfish = getCurrentSwordfish();
  const { Footer } = Layout;
  const { TextArea } = Input;
  const [patientName, setPatientName] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAddress, setPatientAddress] = useState('');

  const onFinish = (values: any) => {
    setPatientName(values.name);
    setPatientPhone(values.phone);
    setPatientEmail(values.email);
    setPatientAddress(values.address);

    // mutateRegisterPatient();
  };

  // const { mutate: mutateRegisterPatient } = useMutation(
  //   () =>
  //   fetchRegisterPatient({
  //     name: patientName,
  //     password: currentSwordfish && JSON.parse(currentSwordfish),
  //     birthDate: patientBirthDate,
  //     phone: patientPhone,
  //     email: patientEmail,
  //     address: patientAddress,
  //     workerId: currentWorkerId && JSON.parse(currentWorkerId)
  //     }),
  //   {
  //     onSuccess: () => {
  //       message.success('Paciente registrado com Sucesso')
  //       navigate('/dashboard')
  //     },
  //     onError:(msg)=>{
  //       message.error(`Error ao registrar paciente - ${msg}`)
  //     }
  //   },
  // );

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setPatientBirthDate(dateString);
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
              <Welcome className='login-title'>Cadastro da sessão</Welcome>
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
              <Input className='input' />
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