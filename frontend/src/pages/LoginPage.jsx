import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import Driff from '../components/Driff'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email");
    if(!formData.password.trim()) return toast.error("Password is required");
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(!success) return;
    login(formData);
  }

  return (
    <div className='flex min-h-screen bg-base-200'>
      {/* left side */}
      <div className='flex flex-1 flex-col justify-center items-center p-8'>
        <div className='w-full max-w-md space-y-6'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold mb-2 text-primary'>Welcome Back</h2>
            <p className='text-base-content/70 mb-8'>Login to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className='space-y-6'>
            <fieldset className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
              <div className='space-y-4'>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50"/>
                    <input 
                      type="email" 
                      className="input input-bordered w-full pl-10" 
                      placeholder="Enter your email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      className="input input-bordered w-full pr-10" 
                      placeholder="Enter your password" 
                      value={formData.password} 
                      onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                disabled={isLoggingIn} 
                className="btn btn-primary w-full mt-6" 
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </fieldset>
          </form>

          <Link 
            to="/register" 
            className="block text-center text-sm text-base-content/70 hover:text-base-content"
          >
            Don't have an account? <span className="font-medium text-primary hover:text-primary-focus">Register</span>
          </Link>
        </div>
      </div>

      {/* right side */}
      <div className='flex-1 flex justify-center items-center'>
        <Driff />
      </div>
    </div>
  )
}

export default LoginPage