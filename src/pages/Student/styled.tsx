import styled from 'styled-components';
import * as colors from '../../config/colors'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label{
    margin: 15px 0 0 10px;
  }

  input{
    heigth: 40px;
    font-size: 16px;
    border: 1px solid #ddd;
    padding: 5px 10px;
    border-radius: 4px;
    margin-top: 5px;

    &:focus{
      border: 1px solid ${colors.primaryColor};
    }
  }
  
  button{
    margin-top: 20px
  }
`;

export const ProfilePhoto = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  position: relative;
  margin-top: 20px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  a{
    display: flex;
    color: #000;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 30%;
    width: 27px;
    height: 27px;
    background: ${colors.primaryColor};
    border-radius: 5px;
  }
`;
