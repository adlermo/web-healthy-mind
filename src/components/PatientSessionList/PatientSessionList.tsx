import React from 'react'
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox } from './PatientSessionListStyles';

const PatientSessionList: React.FC = () => {
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Endereço',
            dataIndex: 'address',
            key: 'Address',
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Criado em:',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];

    const onSearch = (value: string) => console.log(value);

    return(
        <Layout>
            <SideMenu />
            <Layout>
                <MainBox>
                    <UpperBox>
                        <Title level={3}>Meus Pacientes</Title>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch} enterButton
                            style={{
                                width: `45%`,
                            }}
                        />
                        <Button type="primary" href='/register-patient' icon={<PlusCircleOutlined />}>
                            Novo paciente
                        </Button>
                    </UpperBox>
                    <BottomBox>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            style={{
                                width: `100%`,
                            }}
                        />
                    </BottomBox>
                </MainBox>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Mente Sã ©2020 Created by Dev4Tech
                </Footer>
            </Layout>
        </Layout>
    )
}

export default PatientSessionList;