"use client";
import React, { useState , useEffect } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const page = () => {
    const [question, setQuestion] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState('');
    const username = localStorage.getItem('username');
    const [user, setUser] = useState('');

    const [error, setError] = useState(null);

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

  const handleQues = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, question }),
      });

      if (response.ok) {
        console.log('question sending successful');
      } else {
        const data = await response.json();
        console.error('question sending failed:', data.error || 'Unknown error');
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during question sending:', error.message || 'Unknown error');
      setError(error.message || 'Unknown error');
    }
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
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-6 bg-gray-900  border border-gray-200 rounded-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">Help and Support</h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="question" className="block text-lg font-semibold text-white">Write your questions</label>
                <input id="question" name="question" type="text" required value={question} onChange={(e)=>setQuestion(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black" placeholder="Any Support..." />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleQues}>
                Submit Question
              </button>
            </div>
          </form>
          <div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default page