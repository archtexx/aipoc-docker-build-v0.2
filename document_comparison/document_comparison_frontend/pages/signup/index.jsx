import { useState } from 'react'
import logo from '../../public/Algologo.png'
import Image from "next/image"
import Link from "next/link"
import { BiLogoGooglePlus, BiLogoApple, BiLogoMicrosoft } from "react-icons/bi"
import { FcGoogle } from "react-icons/fc"
import msLogo from '../../public/microsoftlogo.jpg'


import { Divider, Box, AbsoluteCenter, InputGroup,InputRightElement, Input,Button, Stack, StackDivider  } from '@chakra-ui/react'


const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

  return (
    <div className=' h-full min-h-screen w-full flex flex-col bg-gray-100 items-center p-10'>
       <div className='mb-2'> 
       <Image src={logo} width={80} height={80} alt='Synapse Logo'/> 
       </div>
        <div className="flex-1 px-6 py-8 mx-2 bg-white shadow-xl rounded-lg w-2/5">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
        Create Your Account
        </h2>
        <form onSubmit={handleClick}>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
            type="submit"
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
        <Box position='relative' padding='20'>
        <Divider height="1px" backgroundColor="gray"/>  
        <AbsoluteCenter bg='white' px='8'>
           <p className='font-bold'>Or</p>
        </AbsoluteCenter>
        </Box>
        <div className='w-full flex flex-col items-center'>
            <div className='flex flex-row justify-start items-center hover:bg-green-200 border border-gray-500 my-4 p-4 w-3/5 '>
                <FcGoogle size="2em"/><span className='text-xl ml-2'>Continue with Google</span>
                </div>
            <div className='flex flex-row justify-start items-center hover:bg-green-200 border border-gray-500 my-4 p-4 w-3/5'>
                <Image src={msLogo} width={25} height={25}/><span className='text-xl ml-2'>Continue with Microsoft Account</span>
                </div>
            <div className='flex flex-row justify-start items-center hover:bg-green-200 border border-gray-500 my-4 p-4 w-3/5'>
                <BiLogoApple size="2em"/><span className='text-xl font-normal ml-2'>Continue with Apple</span>
                </div>
        </div>

      </div>
       
       

    </div>
  )
}

export default SignupPage
