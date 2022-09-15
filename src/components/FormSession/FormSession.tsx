import React, { useState } from "react";
import moment from "moment";
import type { DatePickerProps } from "antd";
import { useNavigate } from "react-router-dom";
import SideMenu from "../SideMenu/SideMenu";
import {
  Button,
  Form,
  Input,
  message,
  Layout,
  DatePicker,
  Select,
  TimePicker,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { fetchCreateSession } from "src/services/Session/service";
import { Welcome } from "./FormSessionStyles";
import { usePatientsList } from "src/services/Patient/hooks";

const FormSession: React.FC = () => {
  const navigate = useNavigate();
  const { Footer } = Layout;
  const { Option } = Select;
  const { TextArea } = Input;
  const [patientId, setPatientId] = useState("");
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");
  const [comments, setComments] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [resources, setResources] = useState(Array<string>);
  const formatDuration = "HH:mm";
  const filterParams = { page: 1 };

  const { data } = usePatientsList(filterParams);

  const onFinish = (values: any) => {
    setSubject(values.subject);
    setDuration(values.duration);
    setComments(values.comments);

    if (subject || duration || comments) {
      mutateRegisterSession();
    }
  };

  const { mutate: mutateRegisterSession } = useMutation(
    () =>
      fetchCreateSession({
        patientId: patientId,
        status: status,
        subject: subject,
        duration: duration,
        type: type,
        comments: comments,
        appointmentDate: appointmentDate,
      }),
    {
      onSuccess: () => {
        message.success("Sessão registrada com Sucesso");
        navigate("/sessions");
      },
      onError: (e: any) => {
        const errorMessage = e.response.data.message;
        message.error(`Error ao registrar sessão - ${errorMessage}`);
      },
    }
  );

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setAppointmentDate(dateString);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handlePatientChange = (value: string) => {
    setPatientId(value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleResourcesChange = (value: string) => {
    setResources([...resources, value]);
  };

  return (
    <>
      <Layout>
        <SideMenu />
        <Layout>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 12,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Welcome>Cadastro da sessão</Welcome>
            </Form.Item>

            <Form.Item
              label="Título"
              name="subject"
              rules={[
                {
                  required: true,
                  message: "Insira o título da sessão",
                },
              ]}
            >
              <Input style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Selecione o paciente"
              name="patientId"
              rules={[
                {
                  required: true,
                  message: "Selecione o paciente",
                },
              ]}
            >
              <Select
                defaultValue=""
                style={{ width: 300 }}
                onChange={handlePatientChange}
              >
                {data?.map((patient) => (
                  <Option key={patient.id}>{patient.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Data da Sessão"
              name="appointmentDate"
              rules={[
                {
                  required: true,
                  message: "Data da sessão",
                },
              ]}
            >
              <DatePicker onChange={onChange} style={{ width: 200 }} />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Insira o status da sessão",
                },
              ]}
            >
              <Select
                defaultValue="Agendada"
                style={{ width: 200 }}
                onChange={handleStatusChange}
              >
                <Option value="agendada">Agendada</Option>
                <Option value="finalizada">Finalizada</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Duração"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Insira a duração da sessão",
                },
              ]}
            >
              <TimePicker
                defaultValue={moment("00:00", formatDuration)}
                format={formatDuration}
                style={{ width: 200 }}
              />
            </Form.Item>

            <Form.Item
              label="Tipo"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Insira o tipo da sessão",
                },
              ]}
            >
              <Select
                defaultValue="Individual"
                style={{ width: 200 }}
                onChange={handleTypeChange}
              >
                <Option value="individual">Individual</Option>
                <Option value="casal">Casal</Option>
                <Option value="grupo">Grupo</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Anotações"
              name="comments"
              rules={[
                {
                  required: true,
                  message: "Anotações extras",
                },
              ]}
            >
              <TextArea rows={7} style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
              label="Recursos"
              name="resources"
              rules={[
                {
                  required: true,
                  message: "Selecione os recursos",
                },
              ]}
            >
              <Select
                mode="tags"
                defaultValue="nenhum"
                style={{ width: 200 }}
                onChange={handleResourcesChange}
              >
                <Option value="nenhum">Nenhum</Option>
                {/* TODO: map resources from db */}
              </Select>
              <Button type="text" style={{ color: "gray" }}>
                Cadastrar novo recurso
              </Button>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 12,
              }}
            >
              <Button
                type="default"
                href="/sessions"
                style={{
                  marginRight: 30,
                }}
              >
                Cancelar
              </Button>

              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
          </Form>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Mente Sã ©2020 Created by Dev4Tech
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default FormSession;
