"use client";
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react"

const page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      });

      console.log(response);

      if (response.ok) {
        console.log('Login successful');
        localStorage.setItem('username', username);
        router.push('/profile2');
      } else {
        const data = await response.json();
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error.message || 'Unknown error');
      setError('Unknown error occurred');
    }
  };

  return (
    <div className='font-mono'>
  <header className="bg-gray-900 py-4 border-b border-gray-200">
    <div className="min-w-md mx-auto px-4 flex justify-center items-center">
      <h1 className="text-xl font-bold text-white">TalkSpace</h1>
    </div>
  </header>
  <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 border p-6 rounded-lg border-gray-200 bg-gray-900">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
      </div>
      <form className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="block text-lg font-semibold text-white">Username</label>
            <input id="username" name="username" type="text" required value={username} onChange={(e)=>setUsername(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black" placeholder="Enter the username..." />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-semibold mt-5 text-white" >Password</label>
            <input id="password" name="password" type="password" required value={password} onChange={(e) =>setPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black" placeholder="Enter the password..." />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="remember_me" className="ml-2 block text-sm ">
              Terms and Condition
            </label>
          </div>
          <div className="text-sm">
            <Link href='/changepassword'>
            <button className="font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </button>
            </Link>
          </div>
        </div>
        <div className="m-4">
          <button type="submit" className=" group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 " onClick={handleLogin}>
            Sign in
          </button>
        </div>
        {error && <p className="text-red-500 text-sm flex justify-center items-center">{error}</p>}
      </form>
      <div>
        <p className="mt-2 text-center text-sm text-white ">
          Not have an account ?...{' '}
          <Link href='/register'>
            <button className="font-medium text-blue-600 hover:text-blue-500">
              Create a new account
            </button>
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
  )
}

export default page;
