// // App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import JoinRoom from './components/JoinRoom';
// import CodeEditor from './components/CodeEditor';
// import './App.css'
// function App() {
//   const [username, setUsername] = useState('');

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<JoinRoom setUsername={setUsername} />} />
//         <Route path="/room/:roomId" element={<CodeEditor username={username} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import JoinRoom from './components/JoinRoom';
import CodeEditor from './components/CodeEditor';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinRoom setUsername={setUsername} />} />
        <Route path="/room/:roomId" element={<CodeEditor username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;
