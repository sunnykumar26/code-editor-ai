// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
    <div className="logo">codeTime</div>
    <div className="home-container">
      
      <h1>Share Code in Real-time with Developers</h1>
      <p>An online code editor for interviews, troubleshooting, teaching & more…
      </p>
      <p>To get started, join a room by entering a room ID and your name.</p>
      <Link to="/join">
        <button>Join a Room</button>
      </Link>

      <div className="features">
        <div className='f-items'>
        
            <h1>Teach people to program</h1>
            <img src="https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
            <p>Share your code with students and peers then educate them. Universities and colleges around the world use Codeshare every day.</p>
        </div>
        <div className='f-items'>
            
            <h1>Study DSA using AI</h1>
            <img src="https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <p>Open a editor,start your journey with your friends brainstorming on a DSA problem.</p>
        </div>
        <div className='f-items'>
            <h1>Interview developers</h1>
            <img src="https://images.pexels.com/photos/4344878/pexels-photo-4344878.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            <p>Set coding tasks and observe in real-time when interviewing remotely or in person. Nobody likes writing code on a whiteboard.</p>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Home;
