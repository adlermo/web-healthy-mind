import EyeOutlined from '@ant-design/icons/lib/icons/EyeOutlined';
import { Button, Descriptions, Modal } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { ISessionModel } from 'src/services/Session/dtos/ISessionModel';

const ViewSessionModal: React.FC<{ data: ISessionModel }> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" icon={<EyeOutlined />} onClick={showModal} />
      <Modal
        style={{ top: 40 }}
        onCancel={handleCancel}
        open={isModalOpen}
        footer={null}
        width={700}>
        <Descriptions title={data.subject} bordered>
          <Descriptions.Item span={3} label="Nome do paciente">
            {data.patientName}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Status">
            {data.status}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Tipo">
            {data.type}
          </Descriptions.Item>
          <Descriptions.Item span={2} label="Data">
            {moment(data.appointmentDate).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item span={1} label="Duração">
            {data.duration}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Serviço">
            {data.service}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Comentários">
            {data.comments}
          </Descriptions.Item>
        </Descriptions>
        <br />
        <Descriptions title="Recursos" bordered>
          <Descriptions.Item span={3} label="Título">
            {data.resource.title}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Categoria">
            {data.resource.category}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Descrição">
            {data.resource.description}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ViewSessionModal;
