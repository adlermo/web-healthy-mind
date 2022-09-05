import React, { useEffect, useCallback, useState } from 'react'
import moment from 'moment';
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox } from './SessionsListStyles';
import { getCurrentWorkerId } from 'src/services/Auth/service';
import { useSessionsList } from 'src/services/Session/hooks';

const SessionsList: React.FC = () => {
    const currentWorkerId = getCurrentWorkerId();
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;
    const [dataSource, setDataSource]:any = useState([]);

    const { data } = useSessionsList({
        id: currentWorkerId && JSON.parse(currentWorkerId),
        page: 1,
        perPage: 2
    })

    const dataSourceBuilder = useCallback(() => {
        data?.forEach((session, index) => {
          setDataSource([
              {
                key: index+=1,
                patientName: session.patientName,
                sessionDescription: session.sessionDescription,
                sessionDate: moment(session.createdAt).format('DD-MM-YYYY')
              }
            ])
          }
        )
      }, [data]
    )

    useEffect(() => {
        dataSourceBuilder();
    }, [dataSourceBuilder])

    const columns = [
        {
            title: 'Nome do paciente',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Descrição da sessão',
            dataIndex: 'sessionDescription',
            key: 'sessionDescription',
        },
        {
            title: 'Data do agendamento',
            dataIndex: 'sessionDate',
            key: 'sessionDate',
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