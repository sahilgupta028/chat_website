// pages/Profile.js
"use client";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import  Link  from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {

  const [user, setUser] = useState(null);
  const username = localStorage.getItem('username');
  const [ isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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
       

    };

    fetchUserData();
  }, [username]);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  }

  return (
    <div className="min-w-3xl mx-auto font-mono">
      <header className="bg-gray-900 py-4 border-b border-gray-200">
        <div className="min-w-26 mx-auto px-4 flex justify-between items-center">
        {user? (
          <div className="md:flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt="User" />
          </div>
          ): (
            <div>...</div>
          )}
          <h1 className="text-2xl font-bold text-white">TalkSpace</h1>
          {/* <button className="font-medium text-white px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700" onClick={logout}>Logout</button> */}
          <FontAwesomeIcon icon={faEllipsisV} className={`text-white text-lg ${ isMenuOpen ? 'text-slate-400' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
          <div className="absolute top-10 right-4 rounded-xl shadow-md w-32 h-1/5 z-10">
          {/* Menu items */}
          <Link href={`/profile2?username=${username}`}>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">View your Profile</button>
          </Link>
          <hr/>
          <Link href='/edit'>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">Edit Profile</button>
          </Link>
          <hr/>
          <Link href='/chat'>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">Your chat</button>
          </Link>
          <hr/>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center" onClick={() => logout()}>Logout</button>
          </div>
          )}
        </div>
      </header>
      <div className="max-w-2xl mx-auto py-8" onClick={() => setIsMenuOpen(false)}>
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center flex-col">
          {user ? (
            <div>
              <div className="flex items-center justify-center">
                <div className="w-40 h-40 rounded-full overflow-hidden">
                  <img className="h-40 w-40 object-cover rounded-full" src={user.profilePicture} alt="User" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-gray-600">@{user.username}</h2>
                <p className="text-gray-600"><span className="text-lg font-semibold text-gray-700">Name: </span>{user.name}</p>
                <p className="text-gray-600"><span className="text-lg font-semibold text-gray-700">Contact: </span>{user.contact}</p>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Bio:</h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>
              <p className="text-gray-600 mt-4"><span className="text-lg font-semibold text-gray-700">Verification Code: </span>{user.verificationCode} <span className='text-gray-400'>*Don't share with anyone</span></p>
            </div>
          ) : (
            <div>Loading</div>
          )}
          <div className="flex justify-between mt-5">
            <Link href={`/edit`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline mr-5">
                Edit
              </button>
            </Link>
            <Link href={`/chat`}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
                Chat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
