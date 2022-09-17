import styled from 'styled-components';

export const LayoutBackground = styled.div`
  background: rgba(255, 255, 255, 0.104);
  padding: 24px;
  min-height: 360px;
`;

export const PatientGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 14px 18px 23px -11px rgba(0, 0, 0, 0.35);
  width: 100%;
`;

export const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 14px 18px 23px -11px rgba(0, 0, 0, 0.35);
  width: 160px;
`;

export const ItemTitle = styled.span`
  margin-bottom: 10px;
`;

export const ItemNumber = styled.span`
  font-size: 35px;
`;

export const PatientItemTitle = styled.h1`
  margin-top: 10px;
`;
