import styled from 'styled-components';

export const NotesMonth = styled.div`
  font-size: 28px;
  text-align: center;
`;

export const NotesMonthSection = styled.section`
  font-size: 28px;
`;

export const Events = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  &.ant-badge-status {
    width: 100%;
    overflow: hidden;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const Badge = styled.ul`
  width: 100%;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
