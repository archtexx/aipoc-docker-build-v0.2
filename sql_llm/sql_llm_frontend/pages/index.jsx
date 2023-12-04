import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import useArchContext from '@/context/useArchContext';
import Loader from '@/components/Loader';
import Link from 'next/link';
// import cors from 'cors'
// import bodyParser from 'body-parser'

// app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors());
// app.options("*", cors())

const LoginPage = () => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const { user, setUser, userId, setUserId, loading, setLoading } = useArchContext()
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // const [loader, setLoading] = useState(false)
  const sentence1 = Array.from('archtexx');
  const sentence2 = 'Generative AI Studio';

  const sentenceVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.8, ease: 'easeInOut' },
    },
  };

  const letterVariants = {
    hidden: { scale: 0.5, color: '#000000' },
    visible: { scale: 1.5, fontSize: '3rem', color: '#000000' },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    //const response = await axios.post('http://192.168.1.50:5000/login', {
    try {      
      console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {        
        email: email,
        password: password,
      });
      console.log(response.status)
      if (response.status == 200) {
        setUser(email)
        setUserId("12345")
        console.log(response, "called");
        router.push('/home');
        toast.success("User verified")
        // redirect("/home")
      } else {
        alert('Incorrect credentials');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data)
        toast.error(error.response.data);
      } else {
        alert('Wrong credentials',error);
      }
    }
    setLoading(false)
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
      {loading && <Loader />}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.span
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
        >
          {sentence1.map((letter, index) => (
            <motion.span key={index} variants={letterVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          variants={sentenceVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <span style={{ fontSize: '1.2rem', color: '#040404' }}>
            {sentence2}
          </span>
        </motion.span>
      </div>
      <div className="flex-1 px-6 py-8 mx-2 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-600">Sign up</Link>
          </p>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default LoginPage;
