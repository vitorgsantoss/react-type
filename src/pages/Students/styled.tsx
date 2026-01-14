import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors'

export const StudentsContainer = styled.div`
  margin-top: 20px;
  
  div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  div + div{
    border-top: 1px solid #eee;
    
  }
  .email{
    width: 250px;
  }
  .name{

    width:100px;
    text-align: center;
  }
`;

export const ProfilePicture = styled.div`
  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const NewStudentLink = styled(Link)`
  display: flex;
  justify-content: end;
  color: ${colors.primaryColor}
`;