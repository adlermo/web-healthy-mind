import styled from 'styled-components';

export const LayoutBackground = styled.div`
  background: rgba(255, 255, 255, 0.104);
  padding: 24px;
  min-height: 360px;
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
