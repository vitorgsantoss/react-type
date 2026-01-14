import { Form, ProfilePhoto } from './styled';
import { Container, Title } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import { isEmail, isNumeric } from 'validator';
import { isValidName } from '../../validators'
import { useDispatch } from 'react-redux';
import { loginFailure } from '../../store/slices/auth';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

export default function Student({match}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState(null)
  const dispatch = useDispatch();

  

  useEffect(() =>{
    setId(get(match, 'params.id', null));
    if (!id) return;
    setIsLoading(true);
    async function getData() {
      try{
        const { data } = await axios.get(`/alunos/${id}`);
        setPhoto(get(data, 'Fotos[0].url', null));
        setFirstName(data.nome);
        setLastName(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);
      } catch (err){
        const status = get(err, 'response.status', 0)
        const errors = get(err, 'response.data.errors', [])

        errors.map(error => toast.error(error));
        if (status == 400) history.push('/');
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [match, id])


  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;
    if (!isValidName(firstName)){
      formErrors = true;
      toast.error("The first name must be between 3 and 255 characters long.");
    }
    if (!isValidName(lastName)){
      formErrors = true;
      toast.error("The last name must be between 3 and 255 characters long.");
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('This email is invalid!');
    }
    if (!isNumeric(String(age))) {
      formErrors = true;
      toast.error('Age must to be a number!');
    }
    if (!isNumeric(String(weight))) {
      formErrors = true;
      toast.error('Weight must to be a number!');
    }
    if (!isNumeric(String(height))) {
      formErrors = true;
      toast.error('Height must to be a number!');
    }
    if (formErrors) return;

    try{
      setIsLoading(true);
      if (id){
        await axios.put(`/alunos/${id}`, {
          nome:firstName, 
          sobrenome:lastName, 
          email, idade:age, 
          peso: weight, 
          altura:height
        });
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome:firstName, 
          sobrenome:lastName, 
          email, idade:age, 
          peso: weight, 
          altura:height
        });
        history.push(`/student/${data.id}/edit`);
      }
      toast.success(`Student ${id?"changed": "added"} successfully`);
    } catch (err) {
      const status = get(err, 'response.status', 0)
      const errors = get(err, 'response.data.errors', [])

      errors.map(error => toast.error(error));
      if (status === 401) dispatch(loginFailure())
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <Title>Student</Title>
      { id && <ProfilePhoto>
        {photo?<img src={photo} />:
        <FaUserCircle size={180}/>}
        <Link to={`/photos/${id}`}>< FaEdit size={20}/></Link>
      </ ProfilePhoto >}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input 
          type="text"  
          placeholder='Provide your first name' 
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName">Last Name</label>
        <input 
          type="text"  
          placeholder='Provide your last name' 
          value={lastName} 
          onChange={e => setLastName(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email"  
          placeholder='Provide your email' 
          value={email} 
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="age">Age</label>
        <input 
          type="number"  
          placeholder='Provide your age' 
          value={age} 
          onChange={e => setAge(e.target.value)}
        />

        <label htmlFor="weight">Weight</label>
        <input 
          type="number"  
          placeholder='Provide your weight' 
          value={weight} 
          onChange={e => setWeight(e.target.value)}
        />

        <label htmlFor="height">Height</label>
        <input 
          type="number"  
          placeholder='Provide your height' 
          value={height} 
          onChange={e => setHeight(e.target.value)}
        />
        <button>Send</button>
      </Form>
    </Container>
  );
}
