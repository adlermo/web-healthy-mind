import type { BadgeProps } from 'antd';
import { Badge, Calendar, Layout } from 'antd';
import type { Moment } from 'moment';
import React from 'react';
import { NotesMonth, NotesMonthSection, Events } from './PatientCalendarStyles';
import SideMenu from '../SideMenu/SideMenu';

const getListData = (value: Moment) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event。。....' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

// eslint-disable-next-line consistent-return
const getMonthData = (value: Moment) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const PatientCalendar: React.FC = () => {
  const { Content, Footer } = Layout;

  const monthCellRender = (value: Moment) => {
    const num = getMonthData(value);
    return num ? (
      <NotesMonth>
        <NotesMonthSection>{num}</NotesMonthSection>
        <span>Backlog number</span>
      </NotesMonth>
    ) : null;
  };

  const dateCellRender = (value: Moment) => {
    const listData = getListData(value);
    return (
      <Events>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </Events>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout>
        <Content
          style={{
            margin: '25px 20px',
          }}>
          <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          Mente Sã ©2022 Created by Dev4Tech
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PatientCalendar;
