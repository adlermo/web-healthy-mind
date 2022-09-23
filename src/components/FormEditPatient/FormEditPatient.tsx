/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { fetchEditPatient } from 'src/services/Patient/service';

import moment from 'moment';
import { api } from 'src/services/api';
import { IAddressPatient } from 'src/services/Patient/dtos/IAddressModel';
import { IPatientEditModel } from 'src/services/Patient/dtos/IPatientModel';
import { IPatientParser } from 'src/services/Patient/dtos/IPatientParser';
import { Welcome } from './FormEditPatientStyles';

const FormEditPatient: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(true);
  const [address, setAddress] = useState(false);
  const [updatePatient, setUpdatePatient] = useState<IPatientEditModel>({} as any);
  const [saveAddress, setSaveAddress] = useState<IAddressPatient>(Object);
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [data_, setData] = useState<IPatientParser>({} as any);

  async function handlePatientInfo(patientId: string) {
    const url = `/patients/info/${patientId}`;
    try {
      const { data } = await api.get(url);
      setData(data);
      setPatientBirthDate(data.birthDate);
    } catch (error: Error | any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    const patientId = id || '';
    handlePatientInfo(patientId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: mutateRegisterPatient } = useMutation(
    (values: any) =>
      fetchEditPatient(data_.id, {
        address: saveAddress,
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
    console.log(values);
    const composedAddress = {
      postalCode: values.postalCode,
      street: values.street,
      number: values.number,
      details: values.details,
      city: values.city,
      district: values.district,
      state: values.state,
      country: values.country,
    };
    setSaveAddress(composedAddress);
    console.log('a', saveAddress);
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

  const cancelEdit = () => {
    setEdit(false);
    navigate('/patients');
  };

  const onChange: DatePickerProps['onChange'] = (_date, dateString) => {
    setPatientBirthDate(dateString);
  };

  return (
    <Content>
      <Modal
        title={`Editar Paciente: ${data_?.name}`}
        footer={null} // Removing default footer width={700}
        open={edit}
        onCancel={cancelEdit}>
        <Form
          fields={[
            {
              name: ['name'],
              value: data_.name,
            },
            {
              name: ['email'],
              value: data_.email,
            },
            {
              name: ['document'],
              value: data_.document,
            },
            {
              name: ['gender'],
              value: data_.gender,
            },
            {
              name: ['birthDate'],
              value: moment(patientBirthDate),
            },
            {
              name: ['phone'],
              value: data_.phone,
            },
            {
              name: ['postalCode'],
              value: data_.address?.postalCode,
            },
            {
              name: ['street'],
              value: data_.address?.street,
            },
            {
              name: ['number'],
              value: data_.address?.number,
            },
            {
              name: ['details'],
              value: data_.address?.details,
            },
            {
              name: ['district'],
              value: data_.address?.district,
            },
            {
              name: ['city'],
              value: data_.address?.city,
            },
            {
              name: ['state'],
              value: data_.address?.state,
            },
            {
              name: ['country'],
              value: data_.address?.country,
            },
          ]}
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
          {!address ? (
            <>
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
                <Input />
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
                <Input />
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
                <Input />
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
                <Input />
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
                <DatePicker defaultValue={moment()} format="YYYY-MM-DD" onChange={onChange} />
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
                <InputNumber style={{ width: 170 }} />
              </Form.Item>
              <Form.Item valuePropName="checked" wrapperCol={{ offset: 18, span: 10 }}>
                <ArrowRightOutlined onClick={() => setAddress(!address)} />
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
            </>
          ) : (
            <>
              <Form.Item
                label="Cep"
                name="postalCode"
                rules={[
                  {
                    required: false,
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
                    required: false,
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
                    required: false,
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
                    required: false,
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
                    required: false,
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
                    required: false,
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
              <Form.Item valuePropName="checked" wrapperCol={{ offset: 6, span: 10 }}>
                <ArrowLeftOutlined onClick={() => setAddress(!address)} />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Content>
  );
};

export default FormEditPatient;
