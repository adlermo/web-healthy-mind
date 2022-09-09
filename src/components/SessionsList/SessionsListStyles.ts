import styled from "styled-components";

export const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  padding: 20px;
  margin-top: 40px;
`

export const UpperBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  margin-bottom: 15px;
`

export const BottomBox = styled.div`
  display: flex;
  width: 100%;
`

export const EditDeletePatientButton = styled.button`
  border-radius: 5px;
  background-color: #1890FF;
  padding: 3px 7px;
  color: white;
  :hover {
    cursor: pointer;
  }
`