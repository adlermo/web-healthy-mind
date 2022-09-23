/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { fetchEditPatient } from 'src/services/Patient/service';
import { TOKEN_KEY, USER_ROLE } from 'src/services/Auth/service';
import { Welcome } from './UpdatePasswordStyles';
import SideMenu from '../SideMenu/SideMenu';

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const { Footer } = Layout;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(location.state.newToken));

  const { mutate: mutateUpdatePassword } = useMutation(
    (value: any) =>
      fetchEditPatient('default', {
        password: location.state.builtPassword,
        newPassword: value.newPassword,
        confirmPassword: value.confirmPassword,
      }),
    {
      onSuccess: () => {
        localStorage.setItem(USER_ROLE, JSON.stringify(3));
        message.success('Senha alterada com sucesso');
        navigate('/Dashboard');
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao alterar a senha - ${errorMessage}`);
      },
    },
  );

  const onFinish = (values: any) => {
    if (values.newPassword !== '' && values.confirmPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      mutateUpdatePassword(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ height: '100vh' }}>
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
              <Welcome>Cadastre uma nova senha</Welcome>
            </Form.Item>

            <Form.Item
              label="Senha"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Insira sua senha',
                },
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirme sua senha"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Confirme sua senha',
                },
              ]}>
              <Input.Password />
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

export default UpdatePassword;
