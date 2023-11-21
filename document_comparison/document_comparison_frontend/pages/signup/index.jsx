import { useState } from 'react'
import logo from '../../public/Algologo.png'
import Image from "next/image"
import Link from "next/link"
import { BiLogoGooglePlus, BiLogoApple, BiLogoMicrosoft } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import msLogo from '../../public/microsoftlogo.jpg'
import axios from 'axios'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

import { Divider, Box, AbsoluteCenter, InputGroup,InputRightElement, Input,Button, Stack, StackDivider  } from '@chakra-ui/react'


const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const router = useRouter();
    




const handleSubmit = async (e) => {
      e.preventDefault();
  
      const signupData = { email, password };
  
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, signupData);
  
        if (response.status === 200) {
          console.log('Sign up successful');
          toast.success("SignupSuccessful")
          router.push('/'); 
        } 
   
         else {
          console.error('Sign up failed');
          toast.error("Signup failed")
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <div className=' h-full min-h-screen w-full flex flex-col bg-gray-100 items-center p-10'>
      
        <div className="flex-1 px-6 py-8 mx-2 bg-white shadow-xl rounded-lg w-2/5">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Create Your Account
        </h2>
        <form onSubmit={handleClick}>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit" onClick={handleSubmit}
            className="w-full bg-blue-500 text-white font-medium py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"

          >
            Sign up
          </button>         
          </form>
        <div className="text-center mt-4 text-xl">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/" className="text-blue-500 hover:text-blue-600">Log in</Link>
          </p>
        </div>
      

      </div>
       
    <Toaster/>

    </div>
  )
}

export default SignupPage
