import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import SideMenu from '../SideMenu/SideMenu';
import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, message, Layout } from 'antd';
import { fetchLoginUser, fetchRegisterUser } from 'src/services/Auth/service';
import { Welcome, Subtitle } from './FormLoginRegisterStyles';

const FormLoginRegister: React.FC = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const { Footer } = Layout;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFinish = (values: any) => {
    setName(values?.name)
    setEmail(values.email)
    setPassword(values.password)
    setConfirmPassword(values.confirmPassword)

    if(email !=='' && password !==''){
      currentPath === '/register' ? mutateRegister() : mutateLogin();
    }
  };

  const { mutate: mutateLogin } = useMutation(
    () =>
    fetchLoginUser({
      email, password
      }),
    {
      onSuccess: () => {
        message.success('Logado com Sucesso')
        navigate('/dashboard')
      },
      onError:(msg)=>{
        message.error(`Erro ao logar, por favor crie sua conta -  ${msg}`)
        navigate('/register')
      }
    },
  );

  const { mutate: mutateRegister } = useMutation(
    () =>
    fetchRegisterUser({
      name, email, password, confirmPassword
      }),
    {
      onSuccess: () => {
        message.success('Registrado com Sucesso')
        navigate('/dashboard')
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message
        message.error(`Error ao registrar - ${errorMessage}`)
      }
    },
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
              <Welcome>{currentPath === '/register' ? 'Cadastro do profissional' : 'Bem vindo ao sistema'}</Welcome>
              <Subtitle>{currentPath === '/register' ? 'Crie a sua conta' : 'Por favor entre com a sua conta'}</Subtitle>
            </Form.Item>
            {currentPath === '/register' &&  
            <Form.Item
              label="Nome"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Insira seu nome',
                },
              ]}
            >
              <Input />
            </Form.Item>}

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Insira seu melhor email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Insira sua senha',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirme sua senha"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Confirme a senha',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Checkbox>Lembrar usuário</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              {currentPath === '/'&& <a href='/register'>Criar uma conta</a>}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
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

export default FormLoginRegister;