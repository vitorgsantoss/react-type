import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/Login';
// import Student from '../pages/Student';
// import Register from '../pages/Register';
// import Photos from '../pages/Photos';
import Students from '../pages/Students';
import Page404 from '../pages/Page404';
import Login from '../pages/Login';
// import PrivateRoute from './PrivateRoute';

export default function myRoutes() {
  return (
    <Routes>
      {/* <Route
        path="/" 
        element={
          <PrivateRoute>
            <Students/>
          </PrivateRoute>
        }
      /> */}

      <Route path="/" element={<Students/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<Page404/>} />
    </Routes>
  );
}



