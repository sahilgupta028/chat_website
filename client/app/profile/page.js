"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const username = localStorage.getItem('username');

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

  if(!username){
    router.push('/error');
  }

  return (
    <div className='font-mono'>
    <header className="bg-white bg-opacity-10 py-4 border-b border-gray-200">
    <div className="min-w-26 mx-auto px-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white underline">Let's chat</h1>
      <button className="font-medium text-white px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700" onClick={logout}>Logout</button>
    </div>
    </header>
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-md w-96 border border-gray-200">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center underline">Your's Profile</h1>
        {user && (
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <img
                src={user.profilePicture}
                className="h-24 w-24 rounded-full mr-4 bg-white"
                alt="Profile"
              />
              <div>
                <p className="text-lg font-medium">{user.name}</p> 
                <p className="text-gray-400">@{user.username}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-5">
          <Link href={`/edit`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline">
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

export default ProfilePage;
