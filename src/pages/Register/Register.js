import React from 'react';
import { Button, Checkbox, Form, Input, Menu, Layout } from 'antd';
import { CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import './Register.css'
const { Sider, Footer } = Layout;

const Register = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Layout>
        <Sider>
          <h1 className='company'>Mente Sã</h1>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['0']}
            items={[HomeOutlined, UserOutlined, CalendarOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: index === 0 ? 'Dashboard' : index === 1 ? 'Pacientes' : 'Sessões',
              }),
            )}
          />
        </Sider>
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
              <h1 className='register-title'>Cadastro do profissional</h1>
              <div className='register-subtitle'>Crie sua conta e comece a desfrutar de nosso sistema</div>
            </Form.Item>
            <Form.Item
              label="Nome"
              name="nome"
              rules={[
                {
                  required: true,
                  message: 'Insira seu nome!',
                },
              ]}
            >
              <Input className='input' />
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
              label="Confirme sua senha"
              name="confsenha"
              rules={[
                {
                  required: true,
                  message: 'Confirme sua senha!',
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
              <Checkbox>Aceito os <a href='/'>termos</a> e <a href='/'>políticas de privacidade</a></Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="submit">
                Cadastrar
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

export default Register;