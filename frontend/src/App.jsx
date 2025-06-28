import React , {useEffect} from 'react'
import { Routes, Route , Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import CalculatorPage from './pages/CalculatorPage'
import AttendancePage from './pages/AttendancePage'
import SubjectPage from './pages/SubjectPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useTheme.store'

const App = () => {
  const { authUser , checkAuth , isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const {theme} = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log("authUser: ",authUser);

  if(isCheckingAuth && !authUser){  
    return(
    <div className='flex items-center justify-center h-screen bg-base-100'>
      <Loader className="size-10 animate-spin text-primary"/>
    </div>
    )
  }
  return (
      <div className="min-h-screen bg-base-200" data-theme={theme}>
      
      {!isAuthPage && <Navbar />}
      <div className={!isAuthPage ? "lg:pl-64 pt-4 px-2 sm:px-4 min-h-screen mx-auto w-full sm:w-[95%] md:w-[90%] lg:w-full lg:mx-0" : ""}>
        <Routes>
          <Route path='/' element={authUser ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} /> 
          <Route path='/calculator' element={authUser ? <CalculatorPage /> : <Navigate to="/login" />} />
          <Route path='/attendance' element={authUser ? <AttendancePage /> : <Navigate to="/login" />} />
          <Route path='/subjects' element={authUser ? <SubjectPage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/register' element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App