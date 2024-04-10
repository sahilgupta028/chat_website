"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    const [error, setError] = useState(null);

  const forgetPass = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/v1/forgetPass`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username , verificationCode, newPassword }),
      });
      console.log({ password })
      console.log(response);

      if (response.ok) {
        console.log('Password changed successful');
        localStorage.setItem('username', username);
        router.push('/profile');
      } else {
        const data = await response.json();
        console.error('Password changing failed:', data.error || 'Unknown error');
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during Account deleted:', error.message || 'Unknown error');
      setError(error.message || 'Unknown error');
    }
}

  return (
    <div className='font-mono'>
      <header className="bg-gray-900 py-4 border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 flex justify-center items-center">
          <h1 className="text-xl font-bold text-white">TalkSpace</h1>
        </div>
      </header>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 border p-6 bg-gray-900 rounded-lg border-gray-200">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold underline">Change Password</h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="block text-lg font-semibold text-white">Username</label>
                <input id="username" name="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black" placeholder="Enter the username..." />
              </div>
              <div>
                <label htmlFor="verificationCode" className="block text-lg font-semibold mt-5 text-white">Verification Code</label>
                <input id="verificationCode" name="verificationCode" type="number" required value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black" placeholder="Enter the verification code..." />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-semibold mt-5 text-white">New Password</label>
                <input id="password" name="password" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black" placeholder="Enter the password..." />
              </div>
              </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={forgetPass}>
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page