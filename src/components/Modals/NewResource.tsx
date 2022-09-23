/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { SelectHandler } from 'rc-select/lib/Select';
import React, { useState } from 'react';
import { IResourceModel } from 'src/services/Resource/dto/IResourceModel';
import { createResource } from 'src/services/Resource/service';

const NewResourceModal: React.FC<{ callback: () => void }> = ({ callback }) => {
  const [data, setData] = useState<IResourceModel>({
    category: '',
    title: '',
    description: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    message.success('Recurso criado com sucesso');
    callback();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { mutate: mutateCreateResource } = useMutation(
    // ESLint tem regra de não usar mesmo nome de variável que existe em escopo acima
    () => createResource(data),
    {
      onSuccess: handleOk,
      onError: (err: any) => {
        message.error(`Erro ao criar recurso - ${err}`);
      },
    },
  );

  const { Option } = Select;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelect = ({ name, select }: { name: string; select: SelectHandler<string> }) => {
    setData({ ...data, [name]: select });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type="text" style={{ color: 'gray' }} onClick={showModal}>
        Cadastrar novo recurso
      </Button>
      <Modal
        title="Cadastro de novo recurso"
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}>
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
          autoComplete="off"
          onFinish={mutateCreateResource}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Título"
            name="title"
            rules={[{ required: true, message: 'Insira o título do recurso' }]}>
            <Input name="title" style={{ width: 300 }} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Categoria"
            name="category"
            rules={[
              {
                required: true,
                message: 'Selecione uma categoria',
              },
            ]}>
            <Select
              style={{ width: 200 }}
              onSelect={(select: SelectHandler<string>) =>
                handleSelect({ name: 'category', select })
              }>
              <Option value="Ferramenta">Ferramenta</Option>
              <Option value="Metáfora">Metáfora</Option>
              <Option value="Transe">Transe</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Descrição"
            name="description"
            rules={[{ required: true, message: 'Insira a descrição do recurso' }]}>
            <TextArea name="description" rows={7} style={{ width: 300 }} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 12,
            }}>
            <Button
              type="default"
              onClick={handleCancel}
              style={{
                marginRight: 30,
              }}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NewResourceModal;
