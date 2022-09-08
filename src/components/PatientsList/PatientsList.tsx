import React, { useEffect, useCallback, useState } from 'react'
import moment from 'moment';
import SideMenu from '../SideMenu/SideMenu';
import { Layout, Typography, Input, Button, Table } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { MainBox, UpperBox, BottomBox } from './PatientsListStyles';
import { usePatientsList } from 'src/services/Patient/hooks';

const PatientsList: React.FC = () => {
    const filterParams = { page: 1 };
    const { Footer } = Layout;
    const { Title } = Typography;
    const { Search } = Input;
    const [dataSource, setDataSource]:any = useState([]);

    const { data } = usePatientsList(filterParams)

    const dataSourceBuilder = useCallback(() => {
        data?.forEach((patient, index) => {
                    setDataSource([
                        {
                            key: index+=1,
                            name: patient.name,
                            email: patient.email,
                            document: patient.document,
                            birthDate: moment(patient.birthDate).format('DD-MM-YYYY'),
                            phone: patient.phone
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
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Documento',
            dataIndex: 'document',
            key: 'document',
        },
        {
            title: 'Data de Nascimento',
            dataIndex: 'birthDate',
            key: 'email',
        },
        {
            title: 'Telefone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Endereço',
            // dataIndex: 'address',
            // key: 'address',
        },
    ];

    const onSearch = (value: string) => console.log(value);

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