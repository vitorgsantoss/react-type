import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  label{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    margin: 30px auto;
    border: 5px dashed ${colors.primaryColor};
    border-radius: 50%;
    overflow: hidden;
    background: #eee;
  }
  input{
    display: none;
  }
  img{
    width: 150px;
    height: 150px;
  }
  p{
    font-size: 18px;
  }
`;
