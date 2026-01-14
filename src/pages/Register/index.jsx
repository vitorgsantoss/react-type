import React, {useState} from 'react';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../store/slices/auth';

export default function Register() {
  const {
    id, 
    nome:userName, 
    email:userEmail,
  } = useSelector(state => state.auth.user);
  const [name, setName] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [password, setPassword] = useState('');

  const isLoading = useSelector(state => state.auth.isLoading)
  console.log(isLoading);
  const dispatch = useDispatch();
  
  async function handleSubmit(event){
    event.preventDefault();
    let formErrors = false;
    
    if (name.length < 3 || name.length > 255) {
      formErrors = true;
      toast.error('The name must be between 3 and 255 characters long.')
    }
    
    if ( !id && password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('The password must be between 6 and 50 characters long.')
    }
    
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('This email is invalid!')
    }
    
    if (formErrors) return;
    
    dispatch(registerRequest({ id, name, email, password }))    
    console.log(isLoading);
  }
  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
      <label htmlFor="name" >Name:
        <input 
          type="text"  
          placeholder='Provide your name' 
          value={name} 
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label htmlFor="email" >E-mail:
        <input 
          type="email"  
          placeholder='Provide your email' 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password" >Password:
        <input 
          type="password"  
          placeholder='Provide your password' 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button type='submit'>{id?"Update my account" : "Create my account"}</button>
      </Form>
    </Container>
  );
}
