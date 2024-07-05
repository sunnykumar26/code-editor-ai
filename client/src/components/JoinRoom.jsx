
// // components/JoinRoom.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function JoinRoom({ setUsername }) {
//   const [roomId, setRoomId] = useState('');
//   const [name, setName] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setUsername(name);
//     navigate(`/room/${roomId}`);
//   };

//   return (
//     <>
    
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Enter room ID"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Enter your name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <button type="submit">Join Room</button>
//     </form>
//     </>

//   );
// }

// export default JoinRoom;



// components/JoinRoom.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinRoom({ setUsername }) {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(name);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="join-room-container">
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Join a Room</h2>
        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Join Room</button>
      </form>
      </div>
      
    </div>


  );
}

export default JoinRoom;
