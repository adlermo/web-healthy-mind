import { Col, Divider, Row, Table } from 'antd';

import React, { useState, useEffect } from 'react';

import moment from 'moment';
import { IAddressPatient } from '../../services/Patient/dtos/IAddressModel';
import { IPatientParser } from '../../services/Patient/dtos/IPatientParser';
import { ISessionParser } from '../../services/Session/dtos/ISessionParser';

import { useSessionsList } from '../../services/Session/hooks';
import { usePatientsList } from '../../services/Patient/hooks';

interface IPatient {
  id: string;
}

const ViewPatient: React.FC<IPatient> = ({ id }: IPatient) => {
  const [patient, setPatient] = useState<IPatientParser>(Object);
  const { data: patientList } = usePatientsList({ page: 1 });
  const { data: sessionList, isLoading } = useSessionsList({ page: 1 });

  const [sessions, setSessions] = useState<ISessionParser[]>([]);

  useEffect(
    () => patientList && setPatient(patientList?.filter((p) => p.id === id)[0]),
    [id, patientList],
  );

  useEffect(
    () => sessionList && setSessions(sessionList.filter((s) => s.patientId === id)),
    [id, sessionList, sessions],
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

  const formatAddress = (address: IAddressPatient): string => {
    return `${address?.street}, ${address?.number} - ${address?.district} - ${address?.city}, ${address?.state} - ${address?.country}`;
  };

  return (
    <>
      <Row gutter={10}>
        <Col span={12}>
          <p>
            <strong>Email: </strong>
            {patient.email}
          </p>
        </Col>

        <Col span={12}>
          <p>
            <strong>Telefone: </strong>
            {patient.phone}
          </p>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={12}>
          <p>
            <strong>Nascimento: </strong>
            {moment(patient?.birthDate).format('DD MMM YYYY')}
          </p>
        </Col>

        <Col span={12}>
          <p>
            <strong>Gênero: </strong>
            {patient?.gender}
          </p>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={12}>
          <p>
            <strong>Endereço: </strong>
            {formatAddress(patient.address)}
          </p>
        </Col>

        <Col span={12}>
          <p>
            <strong>Details: </strong>
            {patient.address?.details}
          </p>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={12}>
          <p>
            <strong>CEP: </strong>
            {patient.address?.postalCode}
          </p>
        </Col>
      </Row>

      <Divider>Sessões Finalizadas</Divider>

      <Table
        loading={isLoading}
        dataSource={sessions}
        columns={columns}
        style={{
          width: `100%`,
        }}
      />
    </>
  );
};

export default ViewPatient;
