
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import AceEditor from 'react-ace';
import debounce from 'lodash.debounce';
import ReactMarkdown from 'react-markdown';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-github_dark';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';

const socket = io('http://localhost:5000');

function CodeEditor({ username }) {
  const { roomId } = useParams();
  const [code, setCode] = useState('');
  const [remoteCode, setRemoteCode] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [loading, setLoading] = useState(false);

  const debouncedCodeChange = useCallback(
    debounce((newCode) => {
      socket.emit('codeChange', { roomId, code: newCode });
    }, 1500),
    [roomId]
  );

  useEffect(() => {
    socket.emit('joinRoom', { roomId, username });

    socket.on('roomData', ({ code: roomCode, users }) => {
      setRemoteCode(roomCode);
      setCode(roomCode);
      setConnectedUsers(users);
    });

    socket.on('codeUpdate', (updatedCode) => {
      setRemoteCode(updatedCode);
      setCode((prevCode) => (prevCode !== updatedCode ? updatedCode : prevCode));
    });

    return () => {
      socket.off('roomData');
      socket.off('codeUpdate');
      socket.disconnect();
    };
  }, [roomId, username]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    debouncedCodeChange(newCode);
  };

  const handleAiPrompt = async () => {
    setLoading(true);  // Set loading state to true when the AI prompt is initiated
    try {
      const response = await fetch('https://generate-text-llm.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // prompt: `${aiPrompt}\n\nCode:\n${code}\nkeep in mind only give code and do not write anything only code you can use comments to explain in short in important area`,

          prompt: `${aiPrompt}`,
        }),
      });
      const data = await response.json();
      setAiResponse(data.text);
      handleCodeChange(data.text);
    } catch (error) {
      console.error('Error querying AI:', error);
    } finally {
      setLoading(false);  // Set loading state to false after the response is received
    }
  };

  return (
    <div className="code-editor-container">
      <div className="editor-section">
        <div className="font-size-selector">
          <label htmlFor="font-size">Font Size: </label>
          <select
            id="font-size"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          >
            {[12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
        <AceEditor
          // mode="javascript"
          mode="c_cpp"
          theme="github_dark"
          onChange={handleCodeChange}
          value={code}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="100vh"
          fontSize={fontSize}
          className='ace-editor'
        />
      </div>
      <div className="sidebar">
        <div className="connected-users">
          <h3>Connected Users:</h3>
          <ul>
            {connectedUsers.map((user, index) => (
              <li key={index}>
                {user} {user === username ? '(You)' : ''}
              </li>
            ))}
          </ul>
        </div>
        <div className="ai-assistant">
          <h3>AI Assistant:</h3>
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask AI about your code"
          />
          <button onClick={handleAiPrompt}>Ask AI</button>
          <div className="ai-response">
            {loading ? "Please wait processing..." : <></>
            // <div className="ai-response">
            // <ReactMarkdown className={"ai-response"}>{aiResponse}</ReactMarkdown>
            // </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
