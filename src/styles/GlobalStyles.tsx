import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
    // .Toastify__toast--success {
    //     background: ${colors.successColor};
        
    // }
    // .my-custom-progress{
    //     background: #fff;
    // }

    *{
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }

    body{
        font-family: sans-serif;
        background: ${colors.primaryDarkColor};
        color: ${colors.primaryDarkColor};
    }

    html, body, #root {
        height: 100%;
    }

    button{
        cursor: pointer;
        padding: 10px 20px;
        color: #fff;
        background: ${colors.primaryColor};
        border: none;
        border-radius: 4px;
        font-weight: 700;
        transition: all 300ms;

        &:hover{
            filter: brightness(90%);
        }
    }

    a{
        text-decoration: none;
    }

    ul{
        list-style: none;
    }
`;

export const Container = styled.div`
  max-width: 600px;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  text-align: center;
`;
