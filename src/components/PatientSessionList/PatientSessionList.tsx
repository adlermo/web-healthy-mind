import React, { useEffect, useCallback, useMemo } from 'react'
import moment from 'moment';
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox } from './PatientSessionListStyles';
import { getCurrentWorkerId } from 'src/services/Auth/service';
import { usePatientList } from 'src/services/Patient/hooks';

const PatientSessionList: React.FC = () => {
    const currentWorkerId = getCurrentWorkerId();
    const currentPath = window.location.pathname;
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;
    const dataSource: any = useMemo(() => { return [] },[]);

    const { data } = usePatientList({
        id: currentWorkerId && JSON.parse(currentWorkerId),
        page: 1,
        perPage: 2
    })

    const dataSourceBuilder = useCallback(() => {
            data?.forEach((patient, index) => {
                    dataSource.push(
                        {
                            key: index+=1,
                            name: patient ? patient.name : '',
                            address: patient ? patient.address : '',
                            phone: patient ? patient.phone : '',
                            email: patient ? patient.email : '',
                            createdAt: patient ? moment(patient.createdAt).format('DD-MM-YYYY') : ''
                        }
                    )
                }
            )
        }, [data, dataSource]
    )

    useEffect(() => {
        dataSourceBuilder();
    }, [dataSourceBuilder])
    
    const patientsColumns = [
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

    const sessionsColumns = [
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
                        <Title level={3}>{currentPath === '/patients' ? 'Meus pacientes' : 'Minhas sessões'}</Title>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch} enterButton
                            style={{
                                width: `45%`,
                            }}
                        />
                        <Button type="primary" href={currentPath === '/patients' ? '/register-patient' : '/register-session'} icon={<PlusCircleOutlined />}>
                            {currentPath === '/patients' ? 'Novo paciente' : 'Nova sessão'}
                        </Button>
                    </UpperBox>
                    <BottomBox>
                        <Table
                            dataSource={dataSource}
                            columns={currentPath === '/patients' ? patientsColumns : sessionsColumns}
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