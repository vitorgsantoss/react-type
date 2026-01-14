import { Form } from './styled';
import { Container, Title } from '../../styles/GlobalStyles';
import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import history from '../../services/history';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { useDispatch } from 'react-redux';
import { loginFailure } from '../../store/slices/auth';


export default function Photos({match}) {
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const id = get(match, 'params.id', null);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const getData = async () =>{
        try{
          setIsLoading(true);
          const { data } = await axios.get(`/alunos/${id}`);
          setPhoto(get(data, 'Fotos[0].url'));
        }
        catch{
          toast.error("Photo not found!");
          history.push('/');
        } finally{
          setIsLoading(false);
        }
      };
    
    getData();
  }, [id])
  async function handleChange(e){
    const newPhoto = e.target.files[0];
    const photoURL = URL.createObjectURL(newPhoto);
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newPhoto);
    try{
      setIsLoading(true);
      await axios.post(`/fotos/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPhoto(photoURL);
      toast.success('Photo updated successfully!');
    } catch(err){
      const status = get(err, 'response.status');
      if (status===401) dispatch(loginFailure);
      if (status===400) toast.error('Invalid file');
    } finally{
      setIsLoading(false);
    } 
  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <Title>Photos</Title>
      <Form>
      <label htmlFor="photo">

        <input type="file" id='photo' onChange={handleChange}/>
        { photo ? <img src={photo} alt="" /> : <p>Selecionar</p> }
      </label>
      </Form>
    </Container>
  );
}
