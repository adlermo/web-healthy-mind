import React, { useEffect, useCallback, useState } from 'react'
import moment from 'moment';
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox } from './PatientsListStyles';
import { getCurrentWorkerId } from 'src/services/Auth/service';
import { usePatientsList } from 'src/services/Patient/hooks';

const PatientsList: React.FC = () => {
    const currentWorkerId = getCurrentWorkerId();
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;
    const [dataSource, setDataSource]:any = useState([]);

    const { data } = usePatientsList({
        workerId: currentWorkerId && JSON.parse(currentWorkerId),
        page: 1,
        perPage: 2
    })

    const dataSourceBuilder = useCallback(() => {
        data && data.forEach((patient, index) => {
                    setDataSource([
                        {
                            key: index+=1,
                            name: patient?.name,
                            address: patient?.address,
                            phone: patient?.phone,
                            email: patient?.email,
                            createdAt: moment(patient?.createdAt).format('DD-MM-YYYY')
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Endereço',
            dataIndex: 'address',
            key: 'address',
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
    console.log(dataSource)
    return(
        <Layout>
            <SideMenu />
            <Layout>
                <MainBox>
                    <UpperBox>
                        <Title level={3}>{'Meus pacientes'}</Title>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch} enterButton
                            style={{
                                width: `45%`,
                            }}
                        />
                        <Button type="primary" href={'/register-patient'} icon={<PlusCircleOutlined />}>
                            {'Novo paciente'}
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

export default PatientsList;