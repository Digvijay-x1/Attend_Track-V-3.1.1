import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/calculator' element={<CalculatorPage />} />
        <Route path='/analytics' element={<AnalyticsPage />} />
        <Route path='/attendance' element={<AttendancePage />} />
        <Route path='/subjects' element={<SubjectPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

      </Routes>
    </div>
  )
}

export default App