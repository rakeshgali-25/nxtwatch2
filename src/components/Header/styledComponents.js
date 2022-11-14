import styled from 'styled-components'

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
`
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 10%;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  border: 0px;
  box-sizing: border-box;

  background-color: ${props => props.color};
`

export const CompanyImage = styled.img`
  height: 35px;
`
export const Profile = styled.img`
  height: 35px;
`
export const Icon = styled.div`
  background-color: transparent;
`
