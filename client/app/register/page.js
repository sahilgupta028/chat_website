"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('contact', contact);
      formData.append('password', password);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        console.log('Registration successful');
        localStorage.setItem('username', username);
        router.push('/profile2');
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during registration:', error.message || 'Unknown error');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
        <h2 className="mt-6 text-center text-3xl font-extrabold ">Register</h2>
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="ppearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black"
              placeholder="Enter your Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-lg font-semibold text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="ppearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-lg font-semibold text-white">
              Contact
            </label>
            <input
              type="number"
              id="contact"
              className="ppearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black"
              placeholder="Enter your Contact..."
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-semibold text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-black"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-lg font-semibold text-white">
              Profile Image
            </label>
            <input
              type="file"
              id="image"
              className="ppearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-white"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-white">Already have an account?</p>
          <Link href="/login">
            <button className="ml-2 text-blue-500 hover:underline">Login Now</button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
