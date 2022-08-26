import React from 'react';
import { Button, Checkbox, Form, Input, Menu, Layout } from 'antd';
import { CalendarOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import './index.css'
const { Sider, Footer } = Layout;

const LogIn = () => {
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
            defaultSelectedKeys={['1']}
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
            className='login-box'
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your best email!',
                },
              ]}
            >
              <Input className='login-item' />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password className='login-item' />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
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

export default LogIn;