import Link from "next/link";
import react from "react";

const Home = () => {
  return (
    <div className='font-mono max-h-screen  bg-black'>
      <header className=" bg-gray-900 py-4 border-b border-gray-200">
    <div className=" mx-auto px-4 flex justify-between items-center">
      <img src="https://media.istockphoto.com/id/1135930743/photo/one-message-social-media-notification-with-letter-icon.webp?b=1&s=170667a&w=0&k=20&c=0bOkULUxRwPP4udBf9eQ5EaZxhk1ZnIEuZ6QizkURq0=" alt="chat" className="w-10 h-10 rounded-full" />
      <h1 className="text-xl font-bold text-white">TalkSpace</h1>
      <div>
        <p className="mt-2 text-center text-sm text-white ">
          <Link href='/register'>
            <button className="bg-green-500 text-white py-4 px-4 rounded-xl shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition duration-300 ease-in-out">
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </div>
   </header>
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg mx-auto px-8 py-12 lg:py-24 flex items-center justify-between rounded-lg shadow-xl bg-gray-900 backdrop-blur-lg border border-gray-200">
        <div className="text-white mr-12">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">Welcome to Live Chat</h1>
          <p className="text-gray-200 text-lg lg:text-xl mb-8">"Speak from the heart, and watch conversations bloom."</p>
          <Link href="/login">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out">Login</button>
          </Link> 
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute -top-12 -right-12">
            <img src="https://plus.unsplash.com/premium_photo-1682310471470-464462ac3705?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNoYXQlMjBidWJibGVzfGVufDB8fDB8fHww" alt="Chat Bubbles" width={150} height={150} className="rounded-lg shadow-xl" />
          </div>
          <img src="https://media.istockphoto.com/id/1210806740/photo/social-media-megaphone-concept.webp?b=1&s=170667a&w=0&k=20&c=7y3IJhBubyMkePqAtWIi405u9faYt_MgJR117YeSb_Q=" alt="Chat App Image" width={500} height={400} className="rounded-lg shadow-xl" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

