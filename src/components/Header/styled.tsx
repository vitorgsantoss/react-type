import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;

  a {
    color: #fff;
    font-weight: bold;
    margin: 0 20px 0 0;
  }
`;
