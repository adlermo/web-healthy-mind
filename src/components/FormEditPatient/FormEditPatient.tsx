/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    () =>
      fetchEditPatient({
        patientId: id && id,
        name: patientName && patientName,
        email: patientEmail && patientEmail,
        document: patientDocument && patientDocument,
        gender: patientGender && patientGender,
        birthDate: patientBirthDate && patientBirthDate,
        phone: patientPhone && patientPhone,
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
    // const composedAddress = {
    //   postalCode: values.postalCode,
    //   street: values.street,
    //   number: values.number,
    //   details: values.details,
    //   city: values.city,
    //   district: values.district,
    //   state: values.state,
    //   country: values.coutry,
    // };

    // setAddress(composedAddress);
    // setAddress(values.address);
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
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
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
