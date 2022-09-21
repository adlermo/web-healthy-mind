/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Form, Input, message, Layout, InputNumber } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { fetchRegisterPatient } from 'src/services/Patient/service';
import { Content } from 'antd/lib/layout/layout';
import SideMenu from '../SideMenu/SideMenu';
import { Welcome } from './FormPatientStyles';

const FormPatient: React.FC = () => {
  const navigate = useNavigate();
  const { Footer } = Layout;
  const [address, setAddress] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientDocument, setPatientDocument] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientPhone, setPatientPhone] = useState(0);

  const { mutate: mutateRegisterPatient } = useMutation(
    () =>
      fetchRegisterPatient({
        addressId: 1,
        address: address && address,
        name: patientName && patientName,
        email: patientEmail && patientEmail,
        document: patientDocument && patientDocument,
        gender: patientGender && patientGender,
        birthDate: patientBirthDate && patientBirthDate,
        phone: patientPhone && patientPhone,
      }),
    {
      onSuccess: () => {
        message.success('Paciente registrado com Sucesso');
        navigate('/patients');
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao registrar paciente - ${errorMessage}`);
      },
    },
  );

  const onFinish = (values: any) => {
    setAddress(values.address);
    setPatientName(values.name);
    setPatientEmail(values.email);
    setPatientDocument(values.document);
    setPatientGender(values.gender);
    setPatientPhone(values.phone);

    if (
      patientName &&
      patientEmail &&
      patientDocument &&
      patientGender &&
      patientBirthDate &&
      patientPhone
    ) {
      mutateRegisterPatient();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setPatientBirthDate(dateString);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <Content>
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
              <Welcome>Cadastro do Paciente</Welcome>
            </Form.Item>

            <Form.Item
              label="Nome"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Nome do paciente',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email do paciente',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Endereço"
              name="address"
              rules={[
                {
                  required: false,
                  message: 'Endereço do paciente',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Documento"
              name="document"
              rules={[
                {
                  required: true,
                  message: 'Documento do paciente',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Gênero"
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'Gênero do paciente',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Data de nascimento"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: 'Data de nascimento do paciente',
                },
              ]}>
              <DatePicker onChange={onChange} />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Telefone do paciente',
                },
              ]}>
              <InputNumber style={{ width: 170 }} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}>
              <Link to="/patients">
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

export default FormPatient;
