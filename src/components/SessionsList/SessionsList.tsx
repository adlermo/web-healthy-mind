import React, { useEffect, useCallback, useState } from 'react'
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox } from './SessionsListStyles';
import { useSessionsList } from 'src/services/Session/hooks';

const SessionsList: React.FC = () => {
    const filterParams = { page: 1 };
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;
    const [dataSource, setDataSource]: any[] = useState([]);
    const { data } = useSessionsList(filterParams)

    const dataSourceBuilder = useCallback(() => {
        data?.forEach((session, index) => {
            setDataSource((prevState: []) => {
                if (prevState.length < data.length) {
                    return [
                        ...prevState,
                        {
                            key: index,
                            patientId: session.patientId,
                            status: session.status,
                            subject: session.subject,
                            duration: session.duration,
                            type: session.type,
                            comments: session.comments
                        }
                    ]
                }
                return [
                    {
                        key: index,
                        patientId: session.patientId,
                        status: session.status,
                        subject: session.subject,
                        duration: session.duration,
                        type: session.type,
                        comments: session.comments
                    }
                ]
            })
        })
    }, [data])

    useEffect(() => {
        dataSourceBuilder();
    }, [dataSourceBuilder])

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

export default SessionsList;