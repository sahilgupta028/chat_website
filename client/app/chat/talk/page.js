"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMapPin, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [reciever, setReciever] = useState('');
  const [message, setMessage] = useState('');
  const sender = localStorage.getItem('username');
  const [messages, setMessages] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [pin, setPin] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!sender) {
          throw new Error('Username not found in localStorage');
        }
        
        const userDataResponse = await fetch(`http://localhost:8080/api/v1/profile/${sender}`, {
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
  }, [sender]);

  const toggleHeart = async (id) => {
    setShowHeart(!showHeart);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/likes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          showHeart,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send likes');
      }

      fetchMessages();

      console.log('Likes done successfully'); 
    } catch (error) {
      console.error('Error sending likes:', error);
    }
  };


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const usernameParam = queryParams.get('username');
    if (usernameParam) {
      setReciever(usernameParam);
    }
    
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/allChat');
      if (response.ok) {
        const messagesData = await response.json();
        const filteredMessages = messagesData.filter(msg => msg.sender === sender || msg.reciever === sender);
        setMessages(filteredMessages);
        console.log(filteredMessages)
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const pinMessage = async (id) => {
    setPin(!pin);

    try {
      const response = await fetch(`http://localhost:8080/api/v1/pin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          pin,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send pin');
      }

      fetchMessages();

      console.log('pin done successfully'); 
    } catch (error) {
      console.error('Error sending pin:', error);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/v1/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender,
          reciever,
          message,
          showHeart: false,
          pin: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      console.log('Message sent successfully');
      setMessage('');
      fetchMessages(); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/deleteMessages`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete messages');
      }

      console.log('All messages deleted successfully');
      setMessages(prevMessages => prevMessages.filter(msg => msg._id !== id));
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  const profileViewer = async (e) => {
    try{
    const response = await fetch(`http://localhost:8080/api/v1/profileViewer/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          e,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send profile');
      }

      console.log('Profile sent successfully'); 
    } catch (error) {
      console.error('Error sending profile:', error);
    }
  }

  if(!sender){
    router.push('/error');
  }

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
          <h1 className="text-2xl font-bold text-white">Chat with {reciever}</h1>
          <div>
          <FontAwesomeIcon icon={faEllipsisV} className={`text-white text-lg ${ isMenuOpen ? 'text-slate-400' : 'text-white'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
          <div className="absolute top-10 right-4 rounded-xl shadow-md w-32 h-1/5 z-10">
          <Link href={`/chat/profile?username=${reciever}`}>
          <button className="w-full text-left text-black hover:text-red-600 px-4 py-2 bg-white flex items-center justify-center" onClick={() => profileViewer(user.username)}>View Profile</button>
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

      {
    messages
    .filter(
      msg =>
      ((msg.sender === sender && msg.reciever === reciever) ||
      (msg.sender === reciever && msg.reciever === sender) ) && msg.pin==true
    )
    .map((msg, index) => (
      <header className="bg-gray-500 py-2 font-mono border-b border-gray-200 ease-linear">
        <div className="min-w-26 mx-auto px-4 flex justify-center items-center">
          <h1 className="text-lg font-bold text-white"><FontAwesomeIcon icon={faMapPin} className='text-sm' /> {msg.sender} : {msg.message}</h1>
          {console.log(msg)}
        </div>
      </header>
    ))}
      <main className="min-h-screen pb-16 px-4">
  <div className="flex flex-col-reverse" onClick={() => setIsMenuOpen(false)}>
    {
  messages
    .filter(
      msg =>
        (msg.sender === sender && msg.reciever === reciever) ||
        (msg.sender === reciever && msg.reciever === sender)
    )
    .map((msg, index) => (
      <div key={index} className={`my-2 relative font-mono flex-col flex ${msg.sender === sender ? 'self-end' : 'self-start'}`} onDoubleClick={() => toggleHeart(msg._id)} >
        <p className="text-sm bg-slate-600 text-white flex items-center justify-center rounded-t-lg object-cover">{msg.sender === sender ? 'You' : reciever}</p>  
        <div className={`p-2 rounded-b-lg ${msg.sender === sender ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
          <p>{msg.message}</p>
          <p className="text-xs text-gray-900">{new Date(msg.timestamp).toLocaleString()}</p>
          {msg.showHeart ? (
            <div className='flex items-center appearance-none absolute top-0.5 right-1'>
            <FontAwesomeIcon icon={faHeart}  className={`text-red-600`} />
            </div>
          ): (
            <div>
            </div>
          )
        }
        </div>
          {console.log(msg._id)}
          <div className='flex place-items-start appearance-none justify-end left-2'>
          {msg.sender === sender && ( 
            <div className='flex flex-row items-center justify-center'>
            <Link href={`/chat/talk/editMessage?username=${reciever}&id=${msg._id}`}>
            <button className="bg-red-500 text-white px-1 py-1 rounded-md mr-1 flex items-center justify-center">
            <FontAwesomeIcon icon={faPenToSquare} className='text-sm' />
            </button>
            </Link>
            <button
              className="bg-red-500 text-white px-1 py-1 rounded-md mr-1 flex items-center justify-center" 
              onClick={() => deleteMessage(msg._id)} 
            >
              <FontAwesomeIcon icon={faTrash} className='text-sm' />
            </button>
            <button
              className="bg-red-500 text-white px-1 py-1 rounded-md ml-0.5 flex items-center justify-center" 
              onClick={() => pinMessage(msg._id)} 
            >
              <FontAwesomeIcon icon={faMapPin} className='text-sm' />
            </button>
            </div>
          )}
        </div>
      </div>
    ))
}
  </div>
</main>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900  p-4 border-t border-gray-200 font-mono">
        <div className="max-w-3xl mx-auto flex items-center flex-row">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mr-2 text-black"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
            onClick={sendMessage}
          >
            Send 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
