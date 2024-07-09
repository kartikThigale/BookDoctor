import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link,Route,Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/login';
import {Register} from './components/register'
import {Appointments} from './components/appointments'
import {Invalid} from './components/invalid'
import { NotFound } from './components/notfound';
import { AddTask } from './components/add-task';
import { AboutUs } from './components/aboutus';
function App() {
  return (
   <BrowserRouter>
    <div className='container-fluid'>
      <section>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/appointments' element={<Appointments></Appointments>}></Route>
          <Route path='invalid' element={<Invalid></Invalid>}></Route>
          <Route path='/add-appointment' element={<AddTask/>}></Route>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </section>
    </div>
    </BrowserRouter>
  )
}

export default App;
