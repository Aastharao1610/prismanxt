"use client"
import React, { useEffect, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import axios from 'axios' 
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showpassword, setShowpassword] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [buttonDisabled,setButtonDisabled] =useState(false)
  const [loading,setLoading]=useState(false)
  const router = useRouter()

  const togglePassword = () => {
    setShowpassword(!showpassword)
  }

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [email, password])

  const handleSumbit = async (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in both email and password.");
      return;
    }
    try {
      console.log("first")
      const response = await axios.post("/api/login", { email, password })
      console.log(response, "responseeeee")
      console.log("first first")
      if (response.status === 200) {
        toast.success("login Successfull")
        const { token, redirect } = response.data
        console.log(response.data ,"dataaaaaa",token)

        Cookies.set("token", token, 
          { expires: new Date(Date.now() + 100 *1000)

           });
           console.log(token)
        
        router.push(redirect)

      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    console.log("Form submitted with email:", email, "and password:", password)
  }

  return (
    <div className="Xl:flex lg:flex  h-screen bg-gray-50">
      
      <div className="flex-1 bg-cover bg-center relative hidden md:block">
        <div className="flex justify-center items-center h-full p-8">
          <div className="text-black opacity-100 text-center">
            <h1 className="text-4xl font-semibold">Welcome to BlogSpace</h1>
            <p className="mt-4 text-xl">Your daily dose of thoughts & stories 🌿</p>
          </div>
        </div>
      </div>

      <div className="my-24 border border-gray-200  xl:visible lg:visible"></div>


      <div className="flex-1 flex justify-center items-center px-4 sm:px-8 md:px-16">
        <div className="w-full max-w-lg p-8 text-black rounded-xl shadow-lg bg-white">
          <h2 className="text-2xl  font-semibold text-left mb-6">Login</h2>
          <form onSubmit={handleSumbit}>
            {/* Email Field */}
            <label className='mb-4 text-md'>Email</label>
            <input
              name='new-email'
              type="email"
              className="w-full p-5 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete='off'
              required
            />
            {/* Password Field */}
            <label className='mb-12 text-md'>Password</label>
            <div className='relative mb-8'>
              <input
                name='new-password'
                type={showpassword ? "text" : "password"}
                className="w-full p-5 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete='off'
              />
              <button 
                type='button'
                onClick={togglePassword}
                className="absolute right-3 top-8 transform -translate-y-1/2 text-gray-500"
              >
                {showpassword ? (
                  <EyeOffIcon className='h-5 w-5'/>
                ) : (
                  <EyeIcon className='h-5 w-5'/>
                )}
              </button>
            </div>
            {/* Submit Button */}
            <button
              disabled={!isFormValid}
              type="submit"
              className={`w-full cursor-pointer p-5 font-semibold rounded-lg focus:outline-none 
                ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 cursor-not-allowed text-gray-700'}`}
            >
             {loading? "Logging In":"Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
