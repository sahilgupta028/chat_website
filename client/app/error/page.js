import React from 'react';
import Link from 'next/link';

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center mb-8">
        <svg className="w-20 h-20 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2m14 3v3m0 0h-2m2 0h2m-2 0v-3m0 0h-2m2 0h2" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Not Authorized</h1>
      <p className="mb-8">You are not authorized to access this page.</p>
      <Link href="/">
        <button className="text-blue-500 underline">Go back to home</button>
      </Link>
    </div>
  );
};

export default page;