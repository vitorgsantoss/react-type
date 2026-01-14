import { Nav } from './styled';
import { FaHome, FaUser, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure } from '../../store/slices/auth'
import { toast } from 'react-toastify';
import history from '../../services/history';
import type { RootState } from '../../store';



export default function Header() {
  const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  function handleLoginButton(event:React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (!isLoggedIn){
      history.push('/login');
    } else {
      dispatch(loginFailure());
      toast.success('User logged out');
    }
  }
  return (
    <Nav>
      <Link to="/">
        <FaHome size={'25px'} />
      </Link>
      <Link to="/register">
        <FaUser size={'20px'} />
      </Link>
      <Link to="/" onClick={handleLoginButton}>
        <FaSignInAlt size={'20px'} />
      </Link>
      <p>{isLoggedIn ? 'logged' : 'sigin'}</p>
    </Nav>
  );
}
