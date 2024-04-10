"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditMessage = () => {
  const router = useRouter();
  const [ id , setId] = useState('')
  const [ username , setUsername] = useState('')
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [user, setUser ] = useState('');
  const usern = localStorage.getItem('username');

  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const idParam = queryParams.get('id');
    const usernameParam = queryParams.get('username');
    if (idParam) {
      setId(idParam);
    }
    if (usernameParam) {
        setUsername(usernameParam);
    }

    const fetchUserData = async () => {
      try {
        if (!usern) {
          throw new Error('Username not found in localStorage');
        }
        
        const userDataResponse = await fetch(`http://localhost:8080/api/v1/profile/${usern}`, {
          method: 'GET',
        });

        if (!userDataResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userDataResponse.json();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
       

    };

    fetchUserData();
  }, [usern]);

  const handleEditMessage = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/allChat`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id , message })
        });
    
        console.log(response);

        if (response.ok) {
          console.log('done');
          setMessage('');
          router.push(`/chat/talk?username=${username}`);
        } else {
          console.error('Failed to update message');
        }
      } catch (error) {
        console.error('Error updating message:', error);
      }
  };

  return (
    <div className='font-mono'>
      <header className="bg-gray-900  py-4 font-mono border-b border-gray-200">
        <div className="min-w-26 mx-auto px-4 flex justify-between items-center">
        {user? (
          <div className="md:flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt="User" />
          </div>
          ): (
            <div>...</div>
          )}
          <h1 className="text-2xl font-bold text-white">Edit your message</h1>
          <div>
          <FontAwesomeIcon icon={faEllipsisV} className={`text-white text-lg ${ isMenuOpen ? 'text-slate-400' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
          <div className="absolute top-10 right-4 rounded-xl shadow-md w-32 h-1/5 z-10">
          <Link href={`/chat/profile?username=${username}`}>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">View Profile</button>
          </Link>
          <hr/>
          <Link href='/chat'>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">Show All Chat</button>
          </Link>
          </div>
          )}
          </div>
        </div>
      </header>
    
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg flex flex-col items-center justify-center">
        {/* {console.log(id)} */}
      <h1 className="text-2xl font-semibold mb-4 text-black">New Message</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded-md resize-none shadow-md text-black border-black"
        rows="6"
      ></textarea>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleEditMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
    </div>
  );
};

export default EditMessage;
