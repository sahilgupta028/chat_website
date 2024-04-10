"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../talk/components/SearchBar';

const Page = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const router = useRouter();
  const username = localStorage.getItem('username');
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await fetch(`http://localhost:8080/api/v1/profileViewer/${username}`, {
          method: 'GET',
        });

        console.log(userDataResponse);

        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          console.log(userData);
          setUsers(userData);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

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
    fetchData();
  }, [username]);

  if(!username){
    router.push('/error');
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='font-mono flex flex-col relative'>
      <header className="bg-gray-900 py-4 mb-4 left-0 right-0 top-0 border-b border-gray-200">
        <div className="min-w-26 mx-auto px-4 flex justify-between items-center">
        {user? (
          <div className="md:flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt="User" />
          </div>
          ): (
            <div>...</div>
          )}
          <h1 className="text-2xl font-bold text-white underline">Who has viewed your profile?</h1>
          {/* <button className="font-medium text-white px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700" onClick={logout}>Logout</button> */}
          <FontAwesomeIcon icon={faEllipsisV} className={`text-white text-lg ${ isMenuOpen ? 'text-slate-400' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
          <div className="absolute top-10 right-4 rounded-xl shadow-md w-32 h-1/5 z-10">
          {/* Menu items */}
          <Link href={`/profile2?username=${username}`}>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">View Profile</button>
          </Link>
          <hr/>
          <Link href='/chat/profileViewer'>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">Profile Viewer</button>
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
      <div className="container mx-auto bg-gray-900 border rounded-md" onClick={() => setIsMenuOpen(false)}>
        {console.log(users)}
        {users.filter(user => user.username === username && (user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()))).map(user => (
    <div key={user._id} className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-md m-4 flex">
        <div className="md:flex flex-row items-center justify-between w-full">
            <div className="p-8">
                <div className="text-sm text-indigo-500 font-semibold mb-2">@{user.e} has viewed your profile</div>
                <div className="text-sm text-gray-500">on {user.timestamp}</div>
            </div>
            <Link href={`/chat/talk?username=${user.username}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded mr-2">
                    Start Chat
                </button>
            </Link>
        </div>
    </div>
))}
      </div>
    </div>
  );
};

export default Page;
