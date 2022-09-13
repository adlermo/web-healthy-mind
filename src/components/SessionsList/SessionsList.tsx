import React from 'react'
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox, EditDeletePatientButton } from './SessionsListStyles';
import { useSessionsList } from 'src/services/Session/hooks';

const SessionsList: React.FC = () => {
    const filterParams = { page: 1 };
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;
    const { data } = useSessionsList(filterParams)

    const columns = [
        {
            title: 'Id do paciente',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: 'Status da sessão',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Título',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Duração da sessão',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Tipo da sessão',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Anotações',
            dataIndex: 'comments',
            key: 'comments',
        },
        {
            title: 'Ações',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                  <EditDeletePatientButton>Editar</EditDeletePatientButton>
                  <EditDeletePatientButton>Arquivar</EditDeletePatientButton>
                </Space>
              ),
        },
    ];

    const onSearch = (value: string) => console.log(value);

    return(
        <Layout>
            <SideMenu />
            <Layout>
                <MainBox>
                    <UpperBox>
                        <Title level={3}>{'Minhas sessões'}</Title>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch} enterButton
                            style={{
                                width: `45%`,
                            }}
                        />
                        <Button type="primary" href={'/register-session'} icon={<PlusCircleOutlined />}>
                            {'Nova sessão'}
                        </Button>
                    </UpperBox>
                    <BottomBox>
                        <Table
                            dataSource={data}
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

export default SessionsList;