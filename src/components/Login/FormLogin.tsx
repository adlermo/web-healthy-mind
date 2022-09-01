import { Button, Checkbox, Form, Input, message, Layout } from 'antd';
import {useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchUserLogin } from 'src/services/Auth/service';
import SideMenu from '../SideMenu';
import { Welcome, Subtitle } from './FormLogin.styles';
//import { LoginProps } from 'src/services/Auth/service';

const FormLogin: React.FC = () => {
  const navigate = useNavigate();
  const { Footer } = Layout;
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

  const onFinish = (values: any) => {
    setEmail(values.email)
    setPassword(values.senha)

    if(email !=='' && password !==''){
      mutate()
    }
    
  };

  const { mutate } = useMutation(
    () =>
    fetchUserLogin({
      email, password
      }),
    {
      onSuccess: () => {
        message.success('Logado com Sucesso')
        navigate('/dashboard')
      },
      onError:(msg)=>{
        message.error(`Error ao logar  ${msg}`)
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
              <Welcome className='login-title'>Bem vindo ao sistema</Welcome>
              <Subtitle className='login-subtitle'>Por favor entre com a sua conta</Subtitle>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Insira seu melhor email!',
                },
              ]}
            >
              <Input className='input' />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[
                {
                  required: true,
                  message: 'Insira sua senha!',
                },
              ]}
            >
              <Input.Password className='input' />
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
              <div className='login-subtitle'>Criar conta</div>
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

export default FormLogin;