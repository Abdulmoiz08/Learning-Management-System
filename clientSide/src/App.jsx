import './App.css'
import Signup from './pages/SignUpForm.jsx'
import LoginPage from './pages/LoginPage.jsx'
import StudentRegister from './pages/StudentRegistration.jsx'
import StudentsList from './pages/Dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDashboard from './pages/StudentDashboard.jsx'
import Home from './pages/Home.jsx'
import Display from './pages/display.jsx'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}>
      <Route path='/' default={true} element={<Display/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/StudentRegister' element={<StudentRegister/>}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Studentlist" element={<StudentsList />} />
      <Route path="/StudentDashboard" element={<StudentDashboard />} />
      </Route>
      
    </Routes>
    </BrowserRouter>
    

  )
}

export default App
