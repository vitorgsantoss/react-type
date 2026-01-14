
import React, {useState} from 'react';
import { Form } from './styled';
import { useLocation } from 'react-router-dom';
import { Container } from '../../styles/GlobalStyles';
import { toast } from 'react-toastify';
// import { get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/slices/auth';
import Loading from '../../components/Loading';
import { type RootState } from '../../store';
import { isEmail } from 'validator';


interface LocationState {
  prevPath?: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as LocationState;
  const prevPath = state?.prevPath || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector((state:RootState) => state.auth.isLoading)


  async function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    let formErrors = false;
    
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('The password must be between 6 and 50 characters long.')
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('This email is invalid!')
    }

    if (formErrors) return;

    dispatch(loginRequest({
      email, password, prevPath
    }))

  }
  
  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:
          <input 
            type="email"  
            placeholder='Provide your email' 
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">Password:
          <input 
            type="password"  
            placeholder='Provide your password' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Login</button>
      </Form>
    </Container>
  );
}
