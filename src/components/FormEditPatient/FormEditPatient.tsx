/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { DatePickerProps, Button, DatePicker, Form, Input, message, InputNumber } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { useMutation } from '@tanstack/react-query';

import { fetchEditPatient } from 'src/services/Patient/service';

// import { IPatientParser } from 'src/services/Patient/dtos/IPatientParser';
import { Welcome } from './FormEditPatientStyles';

interface IPatient {
  id: string;
}

// name,
// email,
// document,
// gender,
// birthDate,
// phone,
// }:
// IPatientParser

// TODO: Verificar pq ao passar os outros dados por props o Componente não atualiza os dados de

const FormEditPatient: React.FC</* IPatientParser */ IPatient> = ({ id }: IPatient) => {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientDocument, setPatientDocument] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const { mutate: mutateRegisterPatient } = useMutation(
    (values: any) =>
      fetchEditPatient(id, {
        name: values.name,
        email: values.email,
        document: values.document,
        gender: values.gender,
        birthDate: patientBirthDate !== '' ? patientBirthDate : undefined,
        phone: values.phone,
      }),
    {
      onSuccess: () => {
        message.success('Paciente alterado com Sucesso');
        navigate('/patients');
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao alterar paciente - ${errorMessage}`);
      },
    },
  );

  const onFinish = (values: any) => {
    if (
      values.name ||
      values.email ||
      values.document ||
      values.gender ||
      values.birthDate ||
      values.phone
    ) {
      mutateRegisterPatient(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setPatientBirthDate(moment(dateString).format('DD MMM YYYY'));
  };

  return (
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
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 12,
          }}>
          <Welcome>Edição de Paciente</Welcome>
        </Form.Item>

        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: false,
              message: 'Nome do paciente',
            },
          ]}>
          <Input defaultValue={patientName} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: false,
              message: 'Email do paciente',
            },
          ]}>
          <Input defaultValue={patientEmail} />
        </Form.Item>

        <Form.Item
          label="Documento"
          name="document"
          rules={[
            {
              required: false,
              message: 'Documento do paciente',
            },
          ]}>
          <Input defaultValue={patientDocument} />
        </Form.Item>

        <Form.Item
          label="Gênero"
          name="gender"
          rules={[
            {
              required: false,
              message: 'Gênero do paciente',
            },
          ]}>
          <Input defaultValue={patientGender} />
        </Form.Item>

        <Form.Item
          label="Data de nascimento"
          name="birthDate"
          rules={[
            {
              required: false,
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
              required: false,
              message: 'Telefone do paciente',
            },
          ]}>
          <InputNumber defaultValue={patientPhone} style={{ width: 170 }} />
        </Form.Item>
        {/* 
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
              required: true,
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

        <Divider /> */}

        {/* ? ENDEREÇO DEVE PODER SER ALTERADO POR ALTERAR USUÀRIO ? */}

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
    </Content>
  );
};

export default FormEditPatient;
