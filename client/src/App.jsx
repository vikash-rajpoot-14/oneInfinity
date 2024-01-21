import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Upload from './components/Upload';
import Todo from './pages/Todo';
import UpdateTodo from './pages/UpdateTodo';


export default function App() {
 
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path='/signin' element={<SignIn />} /> */}
        {/* <Route path='/signup' element={<SignUp />} /> */}
        {/* <Route element={<PrivateRoute/>}> */}
        <Route path='/' element={<Home/>} />
        <Route path='/addtodo' element={<Upload/>} />
        <Route path='/todo' element={<Todo/>} />
        <Route path='/updatetodo/:id' element={<UpdateTodo/>} />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
   
  );
}
