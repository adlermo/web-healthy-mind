import { Divider, Space, Table } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import React, { useState, useEffect } from 'react';

import { IPatientParser } from '../../services/Patient/dtos/IPatientParser';
import { ISessionParser } from '../../services/Session/dtos/ISessionParser';

import { usePatientsList } from '../../services/Patient/hooks';
import { PatientData } from './ViewPatientStyles';

interface IPatient {
  id: string;
}

interface ISessionParserWithName extends ISessionParser {
  patientName: string;
}

const ViewPatient: React.FC<IPatient> = ({ id }: IPatient) => {
  const [patient, setPatient] = useState<IPatientParser>();
  const { data: patientList, isLoading } = usePatientsList({ page: 1 });

  const [sessions, setSessions] = useState<ISessionParserWithName[]>([]);

  useEffect(
    () => patientList && setPatient(patientList.filter((p) => p.id === id)[0]),
    [id, patientList],
  );

  const columns = [
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

  return (
    <Content>
      <PatientData>
        <strong>Email:</strong>
        <p>{patient?.email}</p>

        <strong>Endereço:</strong>
        <p>{patient?.document}</p>

        <strong>Telefone:</strong>
        <p>{patient?.phone}</p>
      </PatientData>

      <Divider>Sessões Finalizadas</Divider>

      <Table
        loading={isLoading}
        dataSource={sessions}
        columns={columns}
        style={{
          width: `100%`,
        }}
      />
    </Content>
  );
};

export default ViewPatient;
