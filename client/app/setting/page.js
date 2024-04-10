"use client";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = localStorage.getItem('username');
  const router = useRouter();
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!username) {
          throw new Error('Username not found in localStorage');
        }
        
        const userDataResponse = await fetch(`http://localhost:8080/api/v1/profile/${username}`, {
          method: 'GET',
        });

        if (!userDataResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userDataResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, [username]);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  }

  return (
    <div>
      <header className="bg-gray-900 py-4 mb-4 left-0 right-0 top-0 border-b border-gray-200">
        <div className="min-w-26 mx-auto px-4 flex justify-between items-center">
        {user? (
          <div className="md:flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt="User" />
          </div>
          ): (
            <div>...</div>
          )}
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          {/* <button className="font-medium text-white px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700" onClick={logout}>Logout</button> */}
          <FontAwesomeIcon icon={faEllipsisV} className={`text-white text-lg ${ isMenuOpen ? 'text-slate-400' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
          <div className="absolute top-10 right-4 rounded-xl shadow-md w-32 h-1/5 z-10">
          {/* Menu items */}
          <Link href={`/profile2?username=${username}`}>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">View Profile</button>
          </Link>
          <hr/>
          <Link href='/chat'>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">All Chat</button>
          </Link>
          <hr/>
          {/* <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center" onClick={() => logout()}>Logout</button>
          <hr/> */}
          <Link href='/setting'>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex ">Settings</button>
          </Link> 
          </div>
          )}
        </div>
      </header>
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold mb-2">Settings</h1>
            <p className="text-gray-600 mb-6">Manage your account settings here.</p>
            <div className="space-y-4">
              <Link href={"/setting/help"}>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4">
                Help and Support
              </button>
              </Link>
              <Link href={"/setting/changepass"}>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                Change Password
              </button>
              </Link>
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 mb-4"
                onClick={() => logout()}
              >
                Logout
              </button>
              <Link href={'/setting/delete'}>
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-3 rounded-md focus:outline-none focus:ring focus:ring-red-300 mt-4"
              >
                Delete Account
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page