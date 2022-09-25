/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ArrowLeftOutlined, ArrowRightOutlined, EditOutlined } from '@ant-design/icons';
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

import React, { useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { fetchEditPatient } from 'src/services/Patient/service';

import moment from 'moment';

import { IAddressPatient } from 'src/services/Patient/dtos/IAddressModel';
import { IPatientParser } from 'src/services/Patient/dtos/IPatientParser';
import { queryClient } from 'src/services/queryClient';

const FormEditPatient: React.FC<{ patient: IPatientParser }> = ({ patient }) => {
  const [edit, setEdit] = useState(false);
  const [toggleAddress, setToggleAddress] = useState(false);
  const [saveAddress, setSaveAddress] = useState<IAddressPatient>(Object);
  const [patientBirthDate, setPatientBirthDate] = useState('');
  const [data_, setData] = useState(Object);

  useEffect(() => {
    setData(patient);
    setPatientBirthDate(moment(patient.birthDate).toLocaleString());
  }, [patient]);

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
        queryClient.invalidateQueries(['patientList']);
        setEdit(false);
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao alterar paciente - ${errorMessage}`);
      },
    },
  );

  const onFinish = (values: any) => {
    if (values.postalCode) {
      setSaveAddress({
        postalCode: values.postalCode,
        street: values.street,
        number: values.number,
        details: values.details,
        district: values.district,
        city: values.city,
        state: values.state,
        country: values.country,
      });
    }

    mutateRegisterPatient(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(`Há algum erro no formulário - ${errorInfo}`);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const onChangeDate: DatePickerProps['onChange'] = (_date, dateString) => {
    setPatientBirthDate(dateString);
  };

  return (
    <>
      <Button type="primary" onClick={() => setEdit(true)} icon={<EditOutlined />} />
      <Modal
        title={`Editar Paciente: ${data_?.name}`}
        footer={null} // Removing default footer
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
            span: 8,
          }}
          wrapperCol={{
            span: 12,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          {!toggleAddress ? (
            <>
              <Form.Item
                label="Nome"
                name="name"
                rules={[
                  {
                    required: false,
                    message: 'Nome do paciente',
                  },
                ]}>
                <Input
                  onChange={(e) => {
                    data_.name = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.email = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.document = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.gender = e.target.value;
                  }}
                />
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
                <DatePicker defaultValue={moment()} format="YYYY-MM-DD" onChange={onChangeDate} />
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
                <InputNumber
                  onChange={(value) => {
                    data_.phone = value;
                  }}
                  style={{ width: 170 }}
                />
              </Form.Item>

              <Form.Item valuePropName="checked" wrapperCol={{ offset: 18, span: 10 }}>
                <ArrowRightOutlined onClick={() => setToggleAddress(!toggleAddress)} />
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
                <Input
                  onChange={(e) => {
                    data_.address.postalCode = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.address.street = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.address.number = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.address.details = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.address.district = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.address.city = e.target.value;
                  }}
                />
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
                <Input
                  onChange={(e) => {
                    data_.address.state = e.target.value;
                  }}
                />
              </Form.Item>
              <Form.Item
                label="País"
                name="country"
                rules={[
                  {
                    required: false,
                    message: 'País de residência',
                  },
                ]}>
                <Input
                  onChange={(e) => {
                    data_.address.country = e.target.value;
                  }}
                />
              </Form.Item>

              <Form.Item valuePropName="checked" wrapperCol={{ offset: 6, span: 10 }}>
                <ArrowLeftOutlined onClick={() => setToggleAddress(!toggleAddress)} />
              </Form.Item>
            </>
          )}
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Button type="primary" key="submit" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormEditPatient;
