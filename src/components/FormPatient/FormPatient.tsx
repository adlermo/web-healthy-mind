/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { fetchRegisterPatient } from 'src/services/Patient/service';
import SideMenu from '../SideMenu/SideMenu';
import { Welcome } from './FormPatientStyles';

const FormPatient: React.FC = () => {
  const navigate = useNavigate();
  const { Footer } = Layout;
  const [patientBirthDate, setPatientBirthDate] = useState('');

  const { mutate: mutateRegisterPatient } = useMutation(
    (values: any) =>
      fetchRegisterPatient({
        address: {
          postalCode: values.postalCode,
          street: values.street,
          number: values.number,
          details: values.details,
          city: values.city,
          district: values.district,
          state: values.state,
          country: values.country,
        },
        name: values.name,
        email: values.email,
        document: values.document,
        gender: values.gender,
        birthDate: patientBirthDate && patientBirthDate,
        phone: values.phone,
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

  const onFinishFailed = (errorInfo: any) => {
    message.error(`Error ao registrar paciente - ${errorInfo}`);
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
            onFinish={mutateRegisterPatient}
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

            <Divider>Informações de Endereço</Divider>

            <Form.Item
              label="Cep"
              name="postalCode"
              rules={[
                {
                  required: true,
                  message: 'Cep do paciente',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Rua"
              name="street"
              rules={[
                {
                  required: true,
                  message: 'Rua do paciente',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Número"
              name="number"
              rules={[
                {
                  required: true,
                  message: 'Número de residência',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Complemento"
              name="details"
              rules={[
                {
                  required: false,
                  message: 'Complemento de residência',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Bairro"
              name="district"
              rules={[
                {
                  required: true,
                  message: 'Bairro de residência',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Cidade"
              name="city"
              rules={[
                {
                  required: true,
                  message: 'Cidade (Município) de residência',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Estado (UF)"
              name="state"
              rules={[
                {
                  required: true,
                  message: 'Estado (UF) de residência',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="País"
              name="country"
              rules={[
                {
                  required: true,
                  message: 'País de residência',
                },
              ]}>
              <Input />
            </Form.Item>

            <Divider />

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
