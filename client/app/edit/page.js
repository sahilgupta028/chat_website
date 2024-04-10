"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Assuming this is the correct import
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link'; // Import Link component from Next.js

const Page = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const username = localStorage.getItem('username');
  const router = useRouter();
  const [ user, setUser ] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/profile/${username}`);
        if (response.ok) {
          const userData = await response.json();
          setName(userData.name);
          setContact(userData.contact);
          setBio(userData.bio);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
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
    fetchUserProfile();
  }, [username]);

  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('contact', contact);
      formData.append('bio', bio);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await fetch(`http://localhost:8080/api/v1/profile/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: formData,
      });

      console.log(response.body);
      console.log(formData);

      if (response.ok) {
        router.push('/profile');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='font-mono'>
      <header className="bg-gray-900  py-4 border-b border-gray-200">
        <div className="min-w-26 mx-auto px-4 flex justify-between items-center">
        {user? (
          <div className="md:flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.profilePicture} alt="User" />
          </div>
          ): (
            <div>...</div>
          )}
          <h1 className="text-2xl font-bold text-white">TalkSpace</h1>
          {/* Menu icon */}
          <FontAwesomeIcon icon={faEllipsisV} className={`text-white text-lg ${isMenuOpen ? 'text-slate-400' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute top-10 right-4 rounded-xl shadow-md w-32 h-1/5 z-10">
              <Link href={`/profile2?username=${username}`}>
                <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">View Profile</button>
              </Link>
              <hr />
              <Link href='/edit'>
                <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">Edit Profile</button>
              </Link>
              <hr />
              <Link href='/chat'>
                <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center">Your chat</button>
              </Link>
              <hr />
              <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center" onClick={() => logout()}>Logout</button>
            </div>
          )}
        </div>
      </header>
      <div className="max-w-2xl mx-auto py-8 flex flex-col">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-black flex items-center justify-center">Edit Profile</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border rounded-md text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="number"
                id="contact"
                className="mt-1 p-2 w-full border rounded-md text-black"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                className="mt-1 p-2 w-full border rounded-md text-black"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                className="mt-1 p-2 w-full border rounded-md text-black"
                onChange={handleProfilePictureChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

