import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
  }

  .confirmationWindow{
    z-index: 2;
    display: flex;
    flex-direction: column;
    background: #fff;
    /* width: 100%;
    height: 100%; */
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-radius: 10px;
    
  }
  button {
    font-size: 20px;
  }

  button + button {
    margin-left: 20px;
    
  }
  p{
    margin-bottom: 20px;
  }
  
`;
